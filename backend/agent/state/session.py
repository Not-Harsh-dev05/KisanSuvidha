"""
Phase 2: Session management.

This module manages AgentState across multiple farmer interactions.

The session manager is intentionally independent of Django ORM/database
implementation. An in-memory store is provided for Phase 2, while the
persistence interface can later be implemented using PostgreSQL/Supabase.
"""

from __future__ import annotations

from abc import ABC, abstractmethod
from copy import deepcopy
from datetime import datetime, timezone
from threading import RLock
from typing import Dict, Optional

from .schemas import AgentState, AgentStatus


class SessionError(Exception):
    """Base exception for session-related errors."""


class SessionNotFoundError(SessionError):
    """Raised when a requested session does not exist."""


class SessionClosedError(SessionError):
    """Raised when an operation is attempted on a closed session."""


class SessionStore(ABC):
    """
    Persistence abstraction for AgentState.

    A database-backed implementation can later implement this interface
    without changing SessionManager.
    """

    @abstractmethod
    def create(self, state: AgentState) -> AgentState:
        """Persist a new session state."""
        raise NotImplementedError

    @abstractmethod
    def get(self, session_id: str) -> Optional[AgentState]:
        """Retrieve state for a session."""
        raise NotImplementedError

    @abstractmethod
    def save(self, state: AgentState) -> AgentState:
        """Persist an updated state."""
        raise NotImplementedError

    @abstractmethod
    def delete(self, session_id: str) -> None:
        """Delete a session."""
        raise NotImplementedError

    @abstractmethod
    def exists(self, session_id: str) -> bool:
        """Check whether a session exists."""
        raise NotImplementedError


class InMemorySessionStore(SessionStore):
    """
    Thread-safe in-memory session store.

    This is intended for Phase 2 development and testing.

    It should NOT be treated as production persistence because all state
    disappears when the process terminates.
    """

    def __init__(self) -> None:
        self._sessions: Dict[str, AgentState] = {}
        self._lock = RLock()

    def create(self, state: AgentState) -> AgentState:
        with self._lock:
            if state.session_id in self._sessions:
                raise SessionError(
                    f"Session '{state.session_id}' already exists."
                )

            stored_state = deepcopy(state)
            self._sessions[state.session_id] = stored_state

            return deepcopy(stored_state)

    def get(self, session_id: str) -> Optional[AgentState]:
        with self._lock:
            state = self._sessions.get(session_id)

            if state is None:
                return None

            return deepcopy(state)

    def save(self, state: AgentState) -> AgentState:
        with self._lock:
            if state.session_id not in self._sessions:
                raise SessionNotFoundError(
                    f"Session '{state.session_id}' does not exist."
                )

            stored_state = deepcopy(state)
            self._sessions[state.session_id] = stored_state

            return deepcopy(stored_state)

    def delete(self, session_id: str) -> None:
        with self._lock:
            if session_id not in self._sessions:
                raise SessionNotFoundError(
                    f"Session '{session_id}' does not exist."
                )

            del self._sessions[session_id]

    def exists(self, session_id: str) -> bool:
        with self._lock:
            return session_id in self._sessions


class SessionManager:
    """
    Coordinates the lifecycle of AgentState sessions.

    Responsibilities:
    - create sessions
    - load sessions
    - retrieve state
    - update state
    - save state
    - reset/restart sessions
    - close/end sessions

    SessionManager contains no Django-specific logic.
    """

    def __init__(self, store: SessionStore) -> None:
        self._store = store

    def create_session(
        self,
        session_id: str,
        user_id: Optional[str] = None,
        district: Optional[str] = None,
        language: Optional[str] = None,
        script: Optional[str] = None,
    ) -> AgentState:
        """
        Create a new AgentState session.
        """

        self._validate_session_id(session_id)

        if self._store.exists(session_id):
            raise SessionError(
                f"Session '{session_id}' already exists."
            )

        state = AgentState(
            session_id=session_id,
            user_id=user_id,
            district=district,
            language=language,
            script=script,
            status=AgentStatus.IDLE,
        )

        return self._store.create(state)

    def load_session(self, session_id: str) -> AgentState:
        """
        Load an existing session.
        """

        self._validate_session_id(session_id)

        state = self._store.get(session_id)

        if state is None:
            raise SessionNotFoundError(
                f"Session '{session_id}' does not exist."
            )

        return state

    def get_state(self, session_id: str) -> AgentState:
        """
        Get the current structured AgentState.
        """

        return self.load_session(session_id)

    def update_state(
        self,
        session_id: str,
        **updates,
    ) -> AgentState:
        """
        Update selected AgentState fields.

        Example:

            manager.update_state(
                "session-1",
                current_goal="sell_crop",
                current_step="collect_quantity",
            )
        """

        state = self.load_session(session_id)

        if state.status == AgentStatus.COMPLETED:
            raise SessionClosedError(
                f"Session '{session_id}' is already completed."
            )

        if state.status == AgentStatus.CANCELLED:
            raise SessionClosedError(
                f"Session '{session_id}' is cancelled."
            )

        self._validate_updates(updates)

        for field_name, value in updates.items():
            setattr(state, field_name, value)

        return self._store.save(state)

    def save_state(self, state: AgentState) -> AgentState:
        """
        Explicitly persist an AgentState.
        """

        self._validate_session_id(state.session_id)

        return self._store.save(state)

    def reset_session(self, session_id: str) -> AgentState:
        """
        Restart an existing session.

        User/session identity information is preserved while task-related
        state is cleared.
        """

        state = self.load_session(session_id)

        state.current_goal = None
        state.intent = None
        state.current_step = None
        state.collected_information = {}
        state.missing_information = []
        state.pending_action = None
        state.conversation_context = []
        state.tool_results = {}
        state.status = AgentStatus.IDLE

        return self._store.save(state)

    def close_session(
        self,
        session_id: str,
        status: AgentStatus = AgentStatus.COMPLETED,
    ) -> AgentState:
        """
        End a session by changing its lifecycle status.

        The state remains persisted so the session can be audited or
        inspected later.
        """

        if status not in (
            AgentStatus.COMPLETED,
            AgentStatus.CANCELLED,
        ):
            raise ValueError(
                "A session can only be closed as COMPLETED or CANCELLED."
            )

        state = self.load_session(session_id)

        state.status = status

        return self._store.save(state)

    def end_session(self, session_id: str) -> AgentState:
        """
        Convenience method for completing a session.
        """

        return self.close_session(
            session_id,
            AgentStatus.COMPLETED,
        )

    def cancel_session(self, session_id: str) -> AgentState:
        """
        Convenience method for cancelling a session.
        """

        return self.close_session(
            session_id,
            AgentStatus.CANCELLED,
        )

    def delete_session(self, session_id: str) -> None:
        """
        Permanently remove a session from the configured store.

        This is different from close_session().
        """

        self._validate_session_id(session_id)

        if not self._store.exists(session_id):
            raise SessionNotFoundError(
                f"Session '{session_id}' does not exist."
            )

        self._store.delete(session_id)

    @staticmethod
    def _validate_session_id(session_id: str) -> None:
        if not isinstance(session_id, str):
            raise ValueError("session_id must be a string.")

        if not session_id.strip():
            raise ValueError("session_id cannot be empty.")

    @staticmethod
    def _validate_updates(updates: dict) -> None:
        """
        Prevent accidental modification of the session identity.
        """

        protected_fields = {
            "session_id",
        }

        invalid_fields = protected_fields.intersection(updates.keys())

        if invalid_fields:
            raise ValueError(
                f"These fields cannot be changed: "
                f"{', '.join(sorted(invalid_fields))}"
            )
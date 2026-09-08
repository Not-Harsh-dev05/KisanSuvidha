from __future__ import annotations

from abc import ABC, abstractmethod
from typing import Any


class LLMProvider(ABC):
    """
    Provider-independent interface for language models.

    The Agent should depend on this abstraction rather than
    directly depending on a specific LLM SDK.
    """

    @abstractmethod
    def generate(
        self,
        *,
        system_prompt: str,
        user_input: str,
        context: dict[str, Any] | None = None,
    ) -> dict[str, Any]:
        """
        Generate a structured model response.
        """
        raise NotImplementedError

from agent.state.schemas import AgentState


class Agent(ABC):
    """
    Provider-independent interface for the agent.
    """

    @abstractmethod
    def process(
        self,
        state: AgentState,
        user_input: str,
    ) -> AgentState:
        """
        Process one user interaction and return updated state.
        """
        raise NotImplementedError
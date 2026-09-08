from __future__ import annotations

from enum import Enum
from typing import Any

from pydantic import BaseModel, Field


class AgentStatus(str, Enum):
    """
    Represents the current lifecycle state of the agent.
    """

    IDLE = "idle"
    UNDERSTANDING = "understanding"
    COLLECTING_INFORMATION = "collecting_information"
    EXECUTING_TOOL = "executing_tool"
    WAITING_FOR_CONFIRMATION = "waiting_for_confirmation"
    COMPLETED = "completed"
    CANCELLED = "cancelled"
    ERROR = "error"


class AgentState(BaseModel):
    """
    Structured state of a single farmer-agent session.

    This is deliberately independent of Django models.
    """

    session_id: str
    user_id: str | None = None

    district: str | None = None

    language: str = "en"
    script: str = "Latin"

    current_goal: str | None = None
    intent: str | None = None
    current_step: str | None = None

    collected_information: dict[str, Any] = Field(default_factory=dict)
    missing_information: list[str] = Field(default_factory=list)

    pending_action: str | None = None

    conversation_context: list[str] = Field(default_factory=list)

    tool_results: dict[str, Any] = Field(default_factory=dict)

    status: AgentStatus = AgentStatus.IDLE
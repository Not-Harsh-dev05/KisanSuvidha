from enum import Enum
from typing import Any, Dict, List, Optional

from pydantic import BaseModel, Field


class AgentStatus(str, Enum):
    IDLE = "idle"
    UNDERSTANDING = "understanding"
    COLLECTING_INFORMATION = "collecting_information"
    EXECUTING_TOOL = "executing_tool"
    WAITING_FOR_CONFIRMATION = "waiting_for_confirmation"
    COMPLETED = "completed"
    CANCELLED = "cancelled"
    ERROR = "error"


class AgentState(BaseModel):
    session_id: str

    user_id: Optional[str] = None

    district: Optional[str] = None

    language: Optional[str] = None

    script: Optional[str] = None

    current_goal: Optional[str] = None

    intent: Optional[str] = None

    current_step: Optional[str] = None

    collected_information: Dict[str, Any] = Field(
        default_factory=dict
    )

    missing_information: List[str] = Field(
        default_factory=list
    )

    pending_action: Optional[Dict[str, Any]] = None

    conversation_context: List[Dict[str, Any]] = Field(
        default_factory=list
    )

    tool_results: Dict[str, Any] = Field(
        default_factory=dict
    )

    status: AgentStatus = AgentStatus.IDLE
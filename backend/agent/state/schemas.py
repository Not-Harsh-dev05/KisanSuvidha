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
    # ==========================================================
    # SESSION
    # ==========================================================
    session_id: str
    # ==========================================================
    # USER
    # ==========================================================
    user_id: Optional[str] = None
    # ==========================================================
    # LOCATION
    # ==========================================================
    district: Optional[str] = None
    # ==========================================================
    # LANGUAGE / SCRIPT
    # PHASE 3
    # ==========================================================
    language: Optional[str] = "en"
    script: Optional[str] = "Latin"
    # ==========================================================
    # AGENT CONTEXT
    # ==========================================================
    current_goal: Optional[str] = None
    intent: Optional[str] = None
    current_step: Optional[str] = None
    # ==========================================================
    # INFORMATION
    # ==========================================================
    collected_information: Dict[str, Any] = Field(
        default_factory=dict
    )
    missing_information: List[str] = Field(
        default_factory=list
    )
    # ==========================================================
    # ACTION
    # ==========================================================
    pending_action: Optional[Dict[str, Any]] = None
    # ==========================================================
    # CONVERSATION
    # ==========================================================
    conversation_context: List[Dict[str, Any]] = Field(
        default_factory=list
    )
    # ==========================================================
    # TOOL RESULTS
    # ==========================================================
    tool_results: Dict[str, Any] = Field(
        default_factory=dict
    )
    # ==========================================================
    # STATUS
    # ==========================================================
    status: AgentStatus = AgentStatus.IDLE
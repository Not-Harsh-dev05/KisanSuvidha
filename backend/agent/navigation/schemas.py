from __future__ import annotations

from enum import Enum
from typing import Any

from pydantic import BaseModel, Field


class ActionType(str, Enum):
    SHOW_OPTIONS = "show_options"
    REQUEST_INPUT = "request_input"
    SHOW_INFORMATION = "show_information"
    NAVIGATE = "navigation"
    CONFIRM_ACTION = "confirm_action"
    TASK_COMPLETED = "task_completed"
    ERROR = "error"


class NavigationAction(BaseModel):
    """
    Structured action sent from the backend to the frontend.

    The agent does not know frontend URLs.
    It only emits semantic destinations.
    """

    type: ActionType = ActionType.NAVIGATE
    destination: str
    parameters: dict[str, Any] = Field(default_factory=dict)
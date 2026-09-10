from datetime import datetime, timezone
from enum import Enum

from pydantic import BaseModel, Field

from agent.language.schemas import Language


class InputType(str, Enum):
    """
    Type of input received from the farmer.
    """

    TEXT = "text"
    VOICE = "voice"


class UserMessage(BaseModel):
    """
    Represents one farmer message.

    The text is preserved exactly as received.
    """

    text: str

    language: Language

    input_type: InputType

    timestamp: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc)
    )
from abc import ABC, abstractmethod
from typing import Any

from agent.language.schemas import Language


class SpeechToTextProvider(ABC):
    """
    Converts speech/audio into text.

    This is only an interface in Phase 3.
    """

    @abstractmethod
    def transcribe(
        self,
        audio: Any,
        language: Language,
    ) -> str:
        """
        Convert audio into text.
        """

        raise NotImplementedError


class TextToSpeechProvider(ABC):
    """
    Converts text into speech/audio.

    This is only an interface in Phase 3.
    """

    @abstractmethod
    def synthesize(
        self,
        text: str,
        language: Language,
    ) -> Any:
        """
        Convert text into audio.
        """

        raise NotImplementedError
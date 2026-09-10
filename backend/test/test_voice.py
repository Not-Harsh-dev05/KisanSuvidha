import pytest

from agent.voice.interfaces import (
    SpeechToTextProvider,
    TextToSpeechProvider,
)


def test_speech_to_text_interface_exists():

    assert hasattr(
        SpeechToTextProvider,
        "transcribe",
    )


def test_text_to_speech_interface_exists():

    assert hasattr(
        TextToSpeechProvider,
        "synthesize",
    )


def test_speech_to_text_is_abstract():

    with pytest.raises(TypeError):
        SpeechToTextProvider()


def test_text_to_speech_is_abstract():

    with pytest.raises(TypeError):
        TextToSpeechProvider()
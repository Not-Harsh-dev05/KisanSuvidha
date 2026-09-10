from agent.conversation.schemas import (
    InputType,
    UserMessage,
)

from agent.language.schemas import Language


def test_text_message():

    text = "I need information about wheat."

    message = UserMessage(
        text=text,
        language=Language.ENGLISH,
        input_type=InputType.TEXT,
    )

    assert message.text == text
    assert message.language == Language.ENGLISH
    assert message.input_type == InputType.TEXT
    assert message.timestamp is not None


def test_voice_message():

    text = "ਮੈਨੂੰ ਕਣਕ ਬਾਰੇ ਜਾਣਕਾਰੀ ਚਾਹੀਦੀ ਹੈ"

    message = UserMessage(
        text=text,
        language=Language.PUNJABI,
        input_type=InputType.VOICE,
    )

    assert message.text == text
    assert message.language == Language.PUNJABI
    assert message.input_type == InputType.VOICE


def test_hindi_native_script():

    text = "मुझे गेहूं की फसल के बारे में जानकारी चाहिए"

    message = UserMessage(
        text=text,
        language=Language.HINDI,
        input_type=InputType.TEXT,
    )

    assert message.text == text


def test_punjabi_native_script():

    text = "ਮੈਨੂੰ ਕਣਕ ਦੀ ਫ਼ਸਲ ਬਾਰੇ ਜਾਣਕਾਰੀ ਚਾਹੀਦੀ ਹੈ"

    message = UserMessage(
        text=text,
        language=Language.PUNJABI,
        input_type=InputType.TEXT,
    )

    assert message.text == text


def test_tamil_native_script():

    text = "எனக்கு கோதுமை பற்றிய தகவல் வேண்டும்"

    message = UserMessage(
        text=text,
        language=Language.TAMIL,
        input_type=InputType.TEXT,
    )

    assert message.text == text


def test_telugu_native_script():

    text = "నాకు గోధుమ పంట గురించి సమాచారం కావాలి"

    message = UserMessage(
        text=text,
        language=Language.TELUGU,
        input_type=InputType.TEXT,
    )

    assert message.text == text
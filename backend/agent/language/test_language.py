import pytest

from .schemas import (
    Language,
    Script,
    LanguageInfo,
    get_script,
)

from .selection import parse_language


def test_all_supported_languages():
    assert Language.ENGLISH.value == "en"
    assert Language.HINDI.value == "hi"
    assert Language.PUNJABI.value == "pa"
    assert Language.TAMIL.value == "ta"
    assert Language.TELUGU.value == "te"
    assert Language.MALAYALAM.value == "ml"
    assert Language.ASSAMESE.value == "as"
    assert Language.KANNADA.value == "kn"
    assert Language.BENGALI.value == "bn"
    assert Language.MARATHI.value == "mr"


def test_invalid_language_rejected():
    with pytest.raises(ValueError):
        Language("xyz")


def test_invalid_language_code_rejected():
    with pytest.raises(ValueError):
        parse_language("xyz")


def test_language_code_parsing():
    assert parse_language("en") == Language.ENGLISH
    assert parse_language("hi") == Language.HINDI
    assert parse_language("pa") == Language.PUNJABI
    assert parse_language("ta") == Language.TAMIL
    assert parse_language("te") == Language.TELUGU
    assert parse_language("ml") == Language.MALAYALAM
    assert parse_language("as") == Language.ASSAMESE
    assert parse_language("kn") == Language.KANNADA
    assert parse_language("bn") == Language.BENGALI
    assert parse_language("mr") == Language.MARATHI


def test_language_code_is_case_insensitive():
    assert parse_language("EN") == Language.ENGLISH
    assert parse_language("Hi") == Language.HINDI
    assert parse_language("PA") == Language.PUNJABI
    assert parse_language("Ta") == Language.TAMIL


def test_language_code_with_spaces():
    assert parse_language(" en ") == Language.ENGLISH
    assert parse_language(" hi ") == Language.HINDI
    assert parse_language(" pa ") == Language.PUNJABI


@pytest.mark.parametrize(
    "language, expected_script",
    [
        (Language.ENGLISH, Script.LATIN),
        (Language.HINDI, Script.DEVANAGARI),
        (Language.PUNJABI, Script.GURMUKHI),
        (Language.TAMIL, Script.TAMIL),
        (Language.TELUGU, Script.TELUGU),
        (Language.MALAYALAM, Script.MALAYALAM),
        (Language.ASSAMESE, Script.ASSAMESE),
        (Language.KANNADA, Script.KANNADA),
        (Language.BENGALI, Script.BENGALI),
        (Language.MARATHI, Script.DEVANAGARI),
    ],
)
def test_language_script_mapping(language, expected_script):
    assert get_script(language) == expected_script


def test_language_info():
    info = LanguageInfo.from_language(Language.PUNJABI)

    assert info.language == Language.PUNJABI
    assert info.script == Script.GURMUKHI


def test_hindi_script():
    info = LanguageInfo.from_language(Language.HINDI)

    assert info.language == Language.HINDI
    assert info.script == Script.DEVANAGARI


def test_marathi_script():
    info = LanguageInfo.from_language(Language.MARATHI)

    assert info.language == Language.MARATHI
    assert info.script == Script.DEVANAGARI
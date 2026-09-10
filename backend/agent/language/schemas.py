from enum import Enum


class Language(str, Enum):
    """
    Supported languages for KisanSuvidha.
    """

    ENGLISH = "en"
    HINDI = "hi"
    PUNJABI = "pa"
    TAMIL = "ta"
    TELUGU = "te"
    MALAYALAM = "ml"
    ASSAMESE = "as"
    KANNADA = "kn"
    BENGALI = "bn"
    MARATHI = "mr"


class Script(str, Enum):
    """
    Scripts used by supported languages.
    """

    LATIN = "Latin"
    DEVANAGARI = "Devanagari"
    GURMUKHI = "Gurmukhi"
    TAMIL = "Tamil"
    TELUGU = "Telugu"
    MALAYALAM = "Malayalam"
    ASSAMESE = "Assamese"
    KANNADA = "Kannada"
    BENGALI = "Bengali"


LANGUAGE_TO_SCRIPT = {
    Language.ENGLISH: Script.LATIN,
    Language.HINDI: Script.DEVANAGARI,
    Language.PUNJABI: Script.GURMUKHI,
    Language.TAMIL: Script.TAMIL,
    Language.TELUGU: Script.TELUGU,
    Language.MALAYALAM: Script.MALAYALAM,
    Language.ASSAMESE: Script.ASSAMESE,
    Language.KANNADA: Script.KANNADA,
    Language.BENGALI: Script.BENGALI,
    Language.MARATHI: Script.DEVANAGARI,
}


class LanguageInfo:
    """
    Stores a language and its associated script.
    """

    def __init__(
        self,
        language: Language,
        script: Script,
    ):
        self.language = language
        self.script = script

    @classmethod
    def from_language(
        cls,
        language: Language,
    ) -> "LanguageInfo":

        return cls(
            language=language,
            script=LANGUAGE_TO_SCRIPT[language],
        )


def get_script(language: Language) -> Script:
    """
    Return the script associated with a language.
    """

    return LANGUAGE_TO_SCRIPT[language]
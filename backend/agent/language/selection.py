from .schemas import Language


def parse_language(language_code: str) -> Language:
    """
    Convert a language code into a supported Language.
    """

    try:
        return Language(
            language_code.strip().lower()
        )

    except ValueError:
        raise ValueError(
            f"Unsupported language: {language_code}"
        )
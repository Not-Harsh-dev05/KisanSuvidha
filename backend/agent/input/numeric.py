import unicodedata
from typing import Optional


class NumericInputError(ValueError):
    """Raised when input cannot be interpreted as numeric input."""


def _normalize_digits(text: str) -> str:
    """
    Convert Unicode decimal digits into ASCII digits.

    Examples:
        "१२३" -> "123"
        "١٢٣" -> "123"
        "۱۲۳" -> "123"
        "123" -> "123"
    """
    normalized = []

    for char in text:
        try:
            digit = unicodedata.digit(char)
            normalized.append(str(digit))
        except (TypeError, ValueError):
            normalized.append(char)

    return "".join(normalized)


def normalize_numeric_input(value: str) -> int | float:
    """
    Normalize a farmer's numeric/keypad input.

    Supported examples:

        "1"       -> 1
        " 1 "     -> 1
        "01"      -> 1
        "१२"      -> 12
        "١٢"      -> 12
        "۱۲"      -> 12
        "2.5"     -> 2.5
        " 2.5 "   -> 2.5

    Raises:
        NumericInputError:
            If the input is empty or is not a valid number.
    """

    if not isinstance(value, str):
        raise NumericInputError("Numeric input must be a string.")

    text = value.strip()

    if not text:
        raise NumericInputError("Numeric input cannot be empty.")

    text = _normalize_digits(text)

    # Only numeric representations are accepted here.
    try:
        if "." in text:
            number = float(text)
        else:
            number = int(text)
    except ValueError as exc:
        raise NumericInputError(
            f"Invalid numeric input: {value!r}"
        ) from exc

    return number


def try_normalize_numeric_input(value: str) -> Optional[int | float]:
    """
    Safe version of normalize_numeric_input().

    Returns:
        normalized number if valid
        None if invalid
    """

    try:
        return normalize_numeric_input(value)
    except NumericInputError:
        return None
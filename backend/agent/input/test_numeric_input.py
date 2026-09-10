import pytest

from agent.input.numeric import (
    NumericInputError,
    normalize_numeric_input,
    try_normalize_numeric_input,
)


def test_normal_integer():
    assert normalize_numeric_input("2") == 2


def test_integer_with_spaces():
    assert normalize_numeric_input(" 2 ") == 2


def test_integer_with_leading_zero():
    assert normalize_numeric_input("02") == 2


def test_multiple_digit_integer():
    assert normalize_numeric_input("25") == 25


def test_decimal_number():
    assert normalize_numeric_input("2.5") == 2.5


def test_decimal_with_spaces():
    assert normalize_numeric_input(" 2.5 ") == 2.5


def test_hindi_digits():
    assert normalize_numeric_input("१२") == 12


def test_arabic_indic_digits():
    assert normalize_numeric_input("١٢") == 12


def test_eastern_arabic_digits():
    assert normalize_numeric_input("۱۲") == 12


def test_mixed_unicode_digits():
    assert normalize_numeric_input("1२") == 12


def test_empty_input_rejected():
    with pytest.raises(NumericInputError):
        normalize_numeric_input("")


def test_spaces_only_rejected():
    with pytest.raises(NumericInputError):
        normalize_numeric_input("   ")


def test_text_rejected():
    with pytest.raises(NumericInputError):
        normalize_numeric_input("hello")


def test_mixed_text_and_number_rejected():
    with pytest.raises(NumericInputError):
        normalize_numeric_input("2abc")


def test_safe_normalization_valid_input():
    assert try_normalize_numeric_input("5") == 5


def test_safe_normalization_invalid_input():
    assert try_normalize_numeric_input("hello") is None
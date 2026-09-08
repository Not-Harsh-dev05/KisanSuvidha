from __future__ import annotations

from abc import ABC, abstractmethod
from typing import Any


class ToolExecutionError(Exception):
    """Raised when a tool cannot complete its operation."""


class Tool(ABC):
    """
    Base interface for every agent tool.

    The agent interacts with tools through this interface.
    Tools themselves are responsible for communicating with
    Django services or external systems.
    """

    name: str
    description: str

    @abstractmethod
    def validate_input(self, arguments: dict[str, Any]) -> None:
        """
        Validate tool arguments before execution.
        """

    @abstractmethod
    def execute(self, arguments: dict[str, Any]) -> dict[str, Any]:
        """
        Execute the tool and return a structured result.
        """

    @property
    def is_write_operation(self) -> bool:
        """
        Whether the tool changes application state.

        Read tools return False.
        Write tools should override this property.
        """
        return False
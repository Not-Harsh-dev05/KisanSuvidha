from __future__ import annotations

from typing import Any

from agent.tools.base import Tool


class ToolNotFoundError(Exception):
    """Raised when a requested tool does not exist."""


class ToolRegistry:
    """
    Central registry for agent tools.

    The agent can only execute tools registered here.
    """

    def __init__(self) -> None:
        self._tools: dict[str, Tool] = {}

    def register(self, tool: Tool) -> None:
        if tool.name in self._tools:
            raise ValueError(
                f"Tool '{tool.name}' is already registered."
            )

        self._tools[tool.name] = tool

    def get(self, name: str) -> Tool:
        try:
            return self._tools[name]
        except KeyError as exc:
            raise ToolNotFoundError(
                f"Tool '{name}' is not registered."
            ) from exc

    def list_tools(self) -> list[str]:
        return list(self._tools.keys())

    def execute(
        self,
        name: str,
        arguments: dict[str, Any],
    ) -> dict[str, Any]:
        tool = self.get(name)

        tool.validate_input(arguments)

        return tool.execute(arguments)
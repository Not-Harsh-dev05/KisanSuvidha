import pytest

from agent.navigation.schemas import (
    ActionType,
    NavigationAction,
)
from agent.state.schemas import AgentState, AgentStatus
from agent.tools.base import Tool
from agent.tools.registry import (
    ToolNotFoundError,
    ToolRegistry,
)


def test_agent_state_creation():
    state = AgentState(
        session_id="session-1",
        user_id="farmer-1",
        district="Ludhiana",
        language="pa",
        script="Gurmukhi",
        intent="SELL_CROP",
    )

    assert state.session_id == "session-1"
    assert state.language == "pa"
    assert state.script == "Gurmukhi"
    assert state.intent == "SELL_CROP"
    assert state.status == AgentStatus.IDLE


def test_navigation_action():
    action = NavigationAction(
        type=ActionType.NAVIGATE,
        destination="crop_registration",
        parameters={
            "crop": "wheat",
        },
    )

    assert action.type == ActionType.NAVIGATE
    assert action.destination == "crop_registration"
    assert action.parameters["crop"] == "wheat"


class FakeTool(Tool):
    name = "fake_tool"
    description = "Tool used for testing."

    def validate_input(self, arguments):
        if "value" not in arguments:
            raise ValueError("value is required")

    def execute(self, arguments):
        return {
            "result": arguments["value"],
        }


def test_tool_registry():
    registry = ToolRegistry()

    tool = FakeTool()

    registry.register(tool)

    assert registry.list_tools() == ["fake_tool"]

    result = registry.execute(
        "fake_tool",
        {"value": "hello"},
    )

    assert result == {
        "result": "hello",
    }


def test_unknown_tool():
    registry = ToolRegistry()

    with pytest.raises(ToolNotFoundError):
        registry.get("does_not_exist")


def test_tool_input_validation():
    registry = ToolRegistry()

    registry.register(FakeTool())

    with pytest.raises(ValueError):
        registry.execute(
            "fake_tool",
            {},
        )
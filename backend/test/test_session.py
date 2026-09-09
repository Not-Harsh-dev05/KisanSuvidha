import pytest

from agent.state.schemas import AgentStatus
from agent.state.session import (
    InMemorySessionStore,
    SessionClosedError,
    SessionManager,
    SessionNotFoundError,
)


@pytest.fixture
def manager():
    store = InMemorySessionStore()
    return SessionManager(store)


def test_create_session(manager):
    state = manager.create_session(
        session_id="session-001",
        user_id="farmer-001",
        district="Ludhiana",
        language="Punjabi",
        script="Gurmukhi",
    )

    assert state.session_id == "session-001"
    assert state.user_id == "farmer-001"
    assert state.district == "Ludhiana"
    assert state.language == "Punjabi"
    assert state.script == "Gurmukhi"
    assert state.status == AgentStatus.IDLE


def test_load_session(manager):
    manager.create_session(
        session_id="session-001",
        user_id="farmer-001",
    )

    state = manager.load_session("session-001")

    assert state.session_id == "session-001"
    assert state.user_id == "farmer-001"


def test_invalid_session_id(manager):
    with pytest.raises(SessionNotFoundError):
        manager.load_session("does-not-exist")


def test_create_duplicate_session(manager):
    manager.create_session("session-001")

    with pytest.raises(Exception):
        manager.create_session("session-001")


def test_update_state(manager):
    manager.create_session("session-001")

    updated = manager.update_state(
        "session-001",
        current_goal="sell_crop",
        intent="SELL_CROP",
        current_step="collect_quantity",
    )

    assert updated.current_goal == "sell_crop"
    assert updated.intent == "SELL_CROP"
    assert updated.current_step == "collect_quantity"


def test_state_persists_between_interactions(manager):
    """
    Simulates two farmer interactions using the same session.
    """

    # Interaction 1
    manager.create_session(
        session_id="session-001",
        user_id="farmer-001",
    )

    manager.update_state(
        "session-001",
        intent="SELL_CROP",
        current_goal="sell_crop",
        current_step="collect_quantity",
    )

    # Interaction 2
    manager.update_state(
        "session-001",
        collected_information={
            "crop": "wheat",
            "quantity": 40,
            "unit": "quintal",
        },
        current_step="next_step",
    )

    state = manager.get_state("session-001")

    assert state.intent == "SELL_CROP"
    assert state.current_goal == "sell_crop"
    assert state.collected_information["crop"] == "wheat"
    assert state.collected_information["quantity"] == 40
    assert state.collected_information["unit"] == "quintal"
    assert state.current_step == "next_step"


def test_update_does_not_change_session_id(manager):
    manager.create_session("session-001")

    with pytest.raises(TypeError):
        manager.update_state(
            "session-001",
            session_id="session-002",
        )

def test_reset_session(manager):
    manager.create_session(
        session_id="session-001",
        user_id="farmer-001",
        district="Ludhiana",
    )

    manager.update_state(
        "session-001",
        intent="SELL_CROP",
        current_goal="sell_crop",
        current_step="collect_quantity",
        collected_information={
            "crop": "wheat",
            "quantity": 40,
        },
        missing_information=["market"],
    )

    state = manager.reset_session("session-001")

    assert state.session_id == "session-001"
    assert state.user_id == "farmer-001"
    assert state.district == "Ludhiana"

    assert state.intent is None
    assert state.current_goal is None
    assert state.current_step is None
    assert state.collected_information == {}
    assert state.missing_information == []
    assert state.status == AgentStatus.IDLE


def test_end_session(manager):
    manager.create_session("session-001")

    state = manager.end_session("session-001")

    assert state.status == AgentStatus.COMPLETED


def test_cancel_session(manager):
    manager.create_session("session-001")

    state = manager.cancel_session("session-001")

    assert state.status == AgentStatus.CANCELLED


def test_closed_session_cannot_be_updated(manager):
    manager.create_session("session-001")

    manager.end_session("session-001")

    with pytest.raises(SessionClosedError):
        manager.update_state(
            "session-001",
            current_goal="sell_crop",
        )


def test_cancelled_session_cannot_be_updated(manager):
    manager.create_session("session-001")

    manager.cancel_session("session-001")

    with pytest.raises(SessionClosedError):
        manager.update_state(
            "session-001",
            current_goal="sell_crop",
        )


def test_save_state(manager):
    state = manager.create_session("session-001")

    state.current_goal = "sell_crop"

    saved = manager.save_state(state)

    assert saved.current_goal == "sell_crop"

    loaded = manager.get_state("session-001")

    assert loaded.current_goal == "sell_crop"


def test_delete_session(manager):
    manager.create_session("session-001")

    manager.delete_session("session-001")

    with pytest.raises(SessionNotFoundError):
        manager.load_session("session-001")


def test_reset_preserves_user_information(manager):
    manager.create_session(
        session_id="session-001",
        user_id="farmer-123",
        district="Amritsar",
        language="Punjabi",
        script="Gurmukhi",
    )

    manager.update_state(
        "session-001",
        current_goal="sell_crop",
        intent="SELL_CROP",
    )

    state = manager.reset_session("session-001")

    assert state.user_id == "farmer-123"
    assert state.district == "Amritsar"
    assert state.language == "Punjabi"
    assert state.script == "Gurmukhi"

    assert state.current_goal is None
    assert state.intent is None
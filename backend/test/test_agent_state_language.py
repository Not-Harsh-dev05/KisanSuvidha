from agent.state.schemas import AgentState


def test_agent_state_has_language():

    state = AgentState(
        session_id="test-session"
    )

    assert state.language == "en"
    assert state.script == "Latin"


def test_agent_state_can_store_hindi():

    state = AgentState(
        session_id="test-session",
        language="hi",
        script="Devanagari",
    )

    assert state.language == "hi"
    assert state.script == "Devanagari"


def test_agent_state_can_store_punjabi():

    state = AgentState(
        session_id="test-session",
        language="pa",
        script="Gurmukhi",
    )

    assert state.language == "pa"
    assert state.script == "Gurmukhi"
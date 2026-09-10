from __future__ import annotations

from agent.language.schemas import Language, LanguageInfo


class LanguageService:
    """
    Handles language selection.

    Session persistence is delegated to the existing SessionManager.
    """

    def __init__(self, session_manager):
        self.session_manager = session_manager

    def set_language(
        self,
        session_id: str,
        language: Language,
    ):
        """
        Update the language preference in the existing AgentState.
        """

        state = self.session_manager.get_session(session_id)

        language_info = LanguageInfo.from_language(language)

        state.language = language_info.language.value
        state.script = language_info.script.value

        self.session_manager.save_session(
            session_id,
            state,
        )

        return state

    def get_language(
        self,
        session_id: str,
    ) -> LanguageInfo:

        state = self.session_manager.get_session(session_id)

        language = Language(state.language)

        return LanguageInfo.from_language(language)
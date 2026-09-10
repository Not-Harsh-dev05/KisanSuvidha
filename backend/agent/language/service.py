from .schemas import (
    Language,
    LanguageInfo,
)


class LanguageService:
    """
    Handles farmer language selection.

    The existing SessionManager remains the source
    of truth for AgentState.
    """

    def __init__(self, session_manager):
        self.session_manager = session_manager

    def set_language(
        self,
        session_id: str,
        language: Language,
    ):
        """
        Set the farmer's preferred language.
        """

        state = self.session_manager.get_session(
            session_id
        )

        language_info = LanguageInfo.from_language(
            language
        )

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
        """
        Get the farmer's current language.
        """

        state = self.session_manager.get_session(
            session_id
        )

        if not state.language:
            return LanguageInfo.from_language(
                Language.ENGLISH
            )

        language = Language(state.language)

        return LanguageInfo.from_language(
            language
        )
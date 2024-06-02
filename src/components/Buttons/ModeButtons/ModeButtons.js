import React from "react";
import "./ModeButtons.scss";
import { useApplicationContext } from "../../../context/ApplicationContext";
import { ButtonPomodoro } from "../ButtonPomodro/ButtonPomodoro";
import { useTranslation } from "react-i18next";

function ModeButtons() {
	const { activeMode, handleActiveModeChange} = useApplicationContext();

  const { t } = useTranslation();

	return (
		<div className="buttons-row">
			<ButtonPomodoro
				text={t('short_pause')}
				onClick={() => handleActiveModeChange("SHORT_BREAK")}
				active={activeMode === 'SHORT_BREAK'}
			/>
			<ButtonPomodoro
					text={t('focus')}
				onClick={() => handleActiveModeChange("POMODORO")}
				active={activeMode === 'POMODORO'}
			/>
			<ButtonPomodoro
				text={t('long_pause')}
				onClick={() => handleActiveModeChange("LONG_BREAK")}
				active={activeMode === 'LONG_BREAK'}
			/>
		</div>
	);
}

export default ModeButtons;

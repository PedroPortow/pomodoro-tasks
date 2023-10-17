import React from "react";
import "./ModeButtons.scss";
import { useApplicationContext } from "../../../context/ApplicationContext";
import { ButtonPomodoro } from "../ButtonPomodro/ButtonPomodoro";

function ModeButtons() {
	const { activeMode, handleActiveModeChange} = useApplicationContext();

	return (
		<div className="buttons-row">
			<ButtonPomodoro
				text={"SHORT PAUSE"}
				onClick={() => handleActiveModeChange("SHORT_BREAK")}
				active={activeMode === 'SHORT_BREAK'}
			/>
			<ButtonPomodoro
				text={"POMODORO"}
				onClick={() => handleActiveModeChange("POMODORO")}
				active={activeMode === 'POMODORO'}
			/>
			<ButtonPomodoro
				text={"LONG BREAK"}
				onClick={() => handleActiveModeChange("LONG_BREAK")}
				active={activeMode === 'LONG_BREAK'}
			/>
		</div>
	);
}

export default ModeButtons;

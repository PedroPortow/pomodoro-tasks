import React from "react";
import { ButtonPomodoro } from "../Buttons/ButtonPomodoro";
import "./ModeButtons.scss";
import { useApplicationContext } from "../../context/ApplicationContext";

function ModeButtons() {
	const { activeMode, handleActiveModeChange} = useApplicationContext();

	console.log({activeMode})
	return (
		<div className="buttons-row">
			<ButtonPomodoro
				text={"PAUSA CURTA"}
				onClick={() => handleActiveModeChange("SHORT_BREAK")}
			/>
			<ButtonPomodoro
				text={"POMODORO"}
				onClick={() => handleActiveModeChange("POMODORO")}
			/>
			<ButtonPomodoro
				text={"PAUSA LONGA"}
				onClick={() => handleActiveModeChange("LONG_BREAK")}
			/>
			<button className={`${activeMode}-btn button-background`} />
		</div>
	);
}

export default ModeButtons;

import React from "react";
import { createContext, useState, useContext } from "react";

const ApplicationContext = createContext();

export const ApplicationContextProvider = ({ children }) => {
  const modeMapping = {
    "POMODORO": {
      "minutes": 25,
      "seconds": 0,
    },
    "SHORT_BREAK": {
      "minutes": 5,
      "seconds": 0,
    },
    "LONG_BREAK": {
      "minutes": 15,
      "seconds": 0,
    }
  }

  const [activeMode, setActiveMode] = useState('POMODORO')
  const [isPaused, setIsPaused] = useState(false)
  const [minutes, setMinutes] = useState(modeMapping[activeMode].minutes)
  const [totalMinutes, setTotalMinutes] = useState(modeMapping[activeMode].minutes)
  const [seconds, setSeconds] = useState(0)

  const handleActiveModeChange = (mode) => {
    setActiveMode(mode)
    setTotalMinutes(modeMapping[mode].minutes)
    setMinutes(modeMapping[mode].minutes)
    setSeconds(0)
  }

  return (
    <ApplicationContext.Provider
      value={{
        activeMode,
        setActiveMode,
        isPaused,
        setIsPaused,
        modeMapping,
        minutes,
        setMinutes,
        seconds,
        setSeconds,
        totalMinutes,
        setTotalMinutes,
        handleActiveModeChange
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export function useApplicationContext() {
  return useContext(ApplicationContext);
}

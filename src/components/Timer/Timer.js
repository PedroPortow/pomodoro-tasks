import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion";
import { useThemeContext } from '../../context/ThemeContext'
import './Timer.scss'
import { useApplicationContext } from '../../context/ApplicationContext';

export const Timer = ({
  handleTimeFinished,
  pomodoroMinutes,
  shortBreakMinutes,
  longBreakMinutes,
  workedTime,
  setMinutesWorked,
  minutesWorked,
  setSecondsWorked,
  secondsWorked,
  setPausedTime,
  pausedTime,
  timeCounterActive
}) => {
  const { isPaused, setIsPaused, activeMode, setActiveMode, activeModeMinutes, modeMapping, setTotalMinutes, setMinutes, minutes, seconds, setSeconds,  } = useApplicationContext()
  const { isThemeDark } = useThemeContext()


  useEffect(() => {
    let interval;

    console.log({ secondsWorked })
    if (!isPaused) {
      interval = setInterval(() => {
        clearInterval(interval)

        //Lógica Timer
        if (seconds === 0) {
          if (minutes !== 0) {
            setSeconds(59)
            setMinutes(minutes - 1)
          } else {
            handleTimeFinished()
            clearTimeout(interval)
          }
        } else {
          setSeconds(seconds - 1)
        }
      }, 50)
    }

    return () => {
      clearInterval(interval)
    }
  }, [seconds, isPaused])

  let minutesFormatted = minutes < 10 ? `0${minutes}` : minutes
  let secondsFormatted = seconds < 10 ? `0${seconds}` : seconds

  useEffect(() => {
    if (!isPaused) {
      switch (activeMode) {
        case 'POMODORO':
          document.title = `Pomodoro! - ${minutesFormatted}:${secondsFormatted} `
          break;
        case 'SHORT_BREAK':
          document.title = `Pausinha! - ${minutesFormatted}:${secondsFormatted} `
          break;
        case 'LONG_BREAK':
          document.title = `Pausão! - ${minutesFormatted}:${secondsFormatted} `
          break;
        default:
          return null;
      }
    } else {
      document.title = 'Pomodoro!'
    }
  }, [isPaused, minutesFormatted, secondsFormatted])

  return (
    <p className={isThemeDark ? 'time-text dark-text ' : 'time-text light-text'}>
      {minutesFormatted}:{secondsFormatted}
    </p>
  )
}

import React, { useEffect } from 'react'
import { useThemeContext } from '../../context/ThemeContext'
import './Timer.scss'
import { useApplicationContext } from '../../context/ApplicationContext';

export const Timer = ({
  handleTimeFinished
}) => {
  const { isPaused, activeMode, setMinutes, minutes, seconds, setSeconds  } = useApplicationContext()
  const { isThemeDark } = useThemeContext()

  useEffect(() => {
    let interval;

    if (!isPaused) {
      interval = setInterval(() => {
        clearInterval(interval)

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
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [seconds, isPaused])
  
  let minutesFormatted = minutes < 10 ? `0${minutes}` : minutes
  let secondsFormatted = seconds < 10 ? `0${seconds}` : seconds

  useEffect(() => {
    if (!isPaused) {
      if(activeMode == "POMODORO"){
        document.title = `Pomodoro! - ${minutesFormatted}:${secondsFormatted} `
      } else {
        document.title = `Break! - ${minutesFormatted}:${secondsFormatted} `
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

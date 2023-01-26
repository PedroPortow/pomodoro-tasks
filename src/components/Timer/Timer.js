import React, { useEffect, useState } from 'react'
import { useThemeContext } from '../../context/ThemeContext'
import './Timer.scss'

export const Timer = ({
  isPaused, 
  setIsPaused, 
  activeMode, 
  handleTimeFinished, 
  pomodoroMinutes,
  shortBreakMinutes,
  longBreakMinutes
}) => {

  console.log({pomodoroMinutes})

  const {isThemeDark} = useThemeContext()
  
  const [minutes, setMinutes] = useState()
  const [seconds, setSeconds] = useState()

  useEffect(() => {
    switch(activeMode){
      case 'POMODORO':
        setMinutes(pomodoroMinutes)
        setSeconds(0)
        break;
      case 'SHORT_BREAK':
        setMinutes(shortBreakMinutes)
        setSeconds(0)
        break;
      case 'LONG_BREAK':
        setMinutes(longBreakMinutes)
        setSeconds(0)
        break;
      default:
        return null;
    }
  }, [activeMode])




  useEffect(() => {
    let interval;

    if(!isPaused){
      interval = setInterval(() => {
        clearInterval(interval)
        if (seconds === 0) {
          if (minutes !== 0) {
            setSeconds(59)
            setMinutes(minutes - 1)
          } else{
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
    if(!isPaused){
      switch(activeMode){
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

  console.log({isPaused})


  return (
    <p className={isThemeDark ? 'time-text dark-text ' : 'time-text light-text'}>{minutesFormatted} : {secondsFormatted} </p>
  )
}

import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion";
import { useThemeContext } from '../../context/ThemeContext'
import './Timer.scss'

export const Timer = ({
  isPaused,
  setIsPaused,
  activeMode,
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

  console.log({ pomodoroMinutes })

  const { isThemeDark } = useThemeContext()

  const [minutes, setMinutes] = useState(0)
  const [totalMinutes, setTotalMinutes] = useState()
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    switch (activeMode) {
      case 'POMODORO':
        setMinutes(pomodoroMinutes)
        setTotalMinutes(pomodoroMinutes)
        setSeconds(0)
        // setSeconds(5)
        break;
      case 'SHORT_BREAK':
        setMinutes(shortBreakMinutes)
        setTotalMinutes(shortBreakMinutes)
        // setSeconds(0)
        // setSeconds(5)
        break;
      case 'LONG_BREAK':
        setMinutes(longBreakMinutes)
        setTotalMinutes(longBreakMinutes)
        // setSeconds(0)
        // setSeconds(5)
        break;
      default:
        return null;
    }
  }, [activeMode])




  useEffect(() => {
    let interval;

    console.log({ secondsWorked })
    if (!isPaused) {
      interval = setInterval(() => {
        clearInterval(interval)

        console.log({ secondsWorked })

        //Lógica contar tempo passado

        if (secondsWorked === undefined) {
          console.log("a")
          console.log("oioi")
          setSecondsWorked(1)
        } else if (secondsWorked > 59 && secondsWorked !== undefined) {
          console.log("oioi")
          setSecondsWorked(secondsWorked + 1)
        }


        // if (secondsWorked !== 0) {
        //   if (minutesWorked !== 0) {
        //     setSecondsWorked(0)
        //     setMinutesWorked(minutesWorked + 1)
        //   } else {
        //     clearTimeout(interval)
        //   }
        // } else {
        //   setSecondsWorked(parseInt(secondsWorked) + 1)
        // }

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



      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [seconds, isPaused])

  console.log({ activeMode })
  let minutesFormatted = minutes < 10 ? `0${minutes}` : minutes
  let secondsFormatted = seconds < 10 ? `0${seconds}` : seconds

  // let favicon = document.querySelector("link[rel~='icon']");


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
    <p className={isThemeDark ? 'time-text dark-text ' : 'time-text light-text'}>{minutesFormatted} : {secondsFormatted} </p>
  )
}

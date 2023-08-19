import React, { useContext, useEffect, useMemo, useState } from 'react'
import { motion } from "framer-motion";
import './Pomodoro.scss'
import { useThemeContext } from '../../context/ThemeContext'
import { Timer } from '../../components/Timer/Timer'
import { ButtonPlay } from '../../components/Buttons/ButtonPlay'
import { ButtonPomodoro } from '../../components/Buttons/ButtonPomodoro'
import { ConfigMenu } from '../../components/ConfigMenu/ConfigMenu'
import { Tasks } from '../../components/Tasks/Tasks'
import { useTaskContext } from '../../context/TaskContext'
import { Switch } from '../../components/Switcher/Switch/Switch';
import ModeButtons from '../../components/ModeButtons/ModeButtons';
import { useApplicationContext } from '../../context/ApplicationContext';
import ProgressBarTimer from '../../components/ProgressBarTimer/ProgressBarTimer';

export const Pomodoro = () => {
  const { theme, setTheme, isThemeDark } = useThemeContext()
  const { tasks, selectedTask } = useTaskContext()
  const {activeMode, setActiveMode} = useApplicationContext()

  const [pomodoroMinutes, setPomodoroMinutes] = useState(25)
  // const [pomodoroMinutes, setPomodoroMinutes] = useState(25)
  const [shortBreakMinutes, setShortBreakMinutes] = useState(5)
  const [longBreakMinutes, setLongBreakMinutes] = useState(15)
  const [showTasks, setShowTasks] = useState(false)

  const [isPaused, setIsPaused] = useState(true)
  const [minutesWorked, setMinutesWorked] = useState(0)
  const [secondsWorked, setSecondsWorked] = useState(undefined)
  const [pausedTime, setPausedTime] = useState(0)

  const [timeCounterActive, setTimeCounterActive] = useState(true)

  const [buttonsPomodoro, setButtonsPomodoro] = useState([
    {
      id: 'SHORT_BREAK',
      text: 'pausinha'
    },
    {
      id: 'POMODORO',
      text: 'pomodoro'
    },
    {
      id: 'LONG_BREAK',
      text: 'pausão'
    }
  ])



  const onThemeChange = () => {
    setTheme(isThemeDark ? 'dark' : 'light')
  }

  const handleActiveMode = (value) => {
    setIsPaused(true)
    setActiveMode(value)
  }

  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission()
        .then((response) => {
          if (response === "granted") {
            const notify = new Notification("OIOIO")
          } else {
            console.log("Notificação foi rejeitada")
          }
        })
    }
  }, [])

  const handleTimeFinished = () => {
    if (activeMode === 'POMODORO') {
      sendNotification(activeMode)
      setActiveMode('SHORT_BREAK')
    } else if (activeMode === ('SHORT_BREAK' || 'LONG_BREAK')) {
      sendNotification(activeMode)
      setActiveMode('POMODORO')
    }
  }


  const sendNotification = (activeMode) => {
    const notification = new Notification(activeMode === 'POMODORO' ? "Hora de descansar! :)" : "Hora de focar!",
      {
        body: "Pomodoro",
        icon: "https://i.pinimg.com/originals/df/4f/93/df4f93b0dea14af81d5dc44eb6ce4c77.jpg",
        vibrate: true
      }
    )
    setTimeout(() => notification.close(), 5000)
  }

  const handleShowTasks = () => {
    setShowTasks(!showTasks)
  }

  return (
    <div className={isThemeDark ? 'pomodoro-container light' : 'pomodoro-container dark'}>
      <div className='row-buttons'>
        <ModeButtons />
      </div>
      <div className='timer-wrapper'>
        <ProgressBarTimer />
        <ButtonPlay />
      </div>
    </div>
  )
}

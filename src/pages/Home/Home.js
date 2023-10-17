import React, { useContext, useEffect, useMemo, useState } from 'react'
import { motion } from "framer-motion";
import './Home.scss'
import { useThemeContext } from '../../context/ThemeContext'
import { Timer } from '../../components/Timer/Timer'
import { ConfigMenu } from '../../components/ConfigMenu/ConfigMenu'
import { TaskList, Tasks } from '../../components/Tasks/TaskList'
import { useTaskContext } from '../../context/TaskContext'
import { Switch } from '../../components/Switcher/Switch/Switch';
import ModeButtons from '../../components/Buttons/ModeButtons/ModeButtons';
import { useApplicationContext } from '../../context/ApplicationContext';
import ProgressBarTimer from '../../components/ProgressBarTimer/ProgressBarTimer';
import { TaskCard } from '../../components/Tasks/components/TaskCard';
import { ButtonPlay } from '../../components/Buttons/ButtonPlay/ButtonPlay';

export const Home = () => {
  const { isThemeDark } = useThemeContext()
  const { activeMode, setActiveMode, isPaused, setIsPaused, handleActiveModeChange } = useApplicationContext()

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
    console.log("chegou")
    if (activeMode === 'POMODORO') {
      sendNotification(activeMode)
      handleActiveModeChange("SHORT_BREAK")
    } else if (activeMode === ('SHORT_BREAK' || 'LONG_BREAK')) {
      sendNotification(activeMode)
      handleActiveModeChange("POMODORO")
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

  return (
    <div className={isThemeDark ? 'pomodoro-container light' : 'pomodoro-container dark'}>
      <div className='row-buttons'>
        <ModeButtons />
      </div>
      <div className='timer-wrapper'>
        <ProgressBarTimer handleTimeFinished={handleTimeFinished} />
        <ButtonPlay />
      </div>
      <div className='tasks-wrapper'>
        <TaskList />
      </div>
    </div>
  )
}

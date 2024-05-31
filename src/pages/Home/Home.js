import React, { useEffect } from 'react'
import './Home.scss'
import { useThemeContext } from '../../context/ThemeContext'
import { TaskList } from '../../components/Tasks/TaskList'
import ModeButtons from '../../components/Buttons/ModeButtons/ModeButtons';
import { useApplicationContext } from '../../context/ApplicationContext';
import ProgressBarTimer from '../../components/ProgressBarTimer/ProgressBarTimer';
import { ButtonPlay } from '../../components/Buttons/ButtonPlay/ButtonPlay';

export const Home = () => {
  const { isThemeDark } = useThemeContext()
  const { activeMode, handleActiveModeChange } = useApplicationContext()

  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission()
        .then((response) => {
          if (response === "granted") {
            const notify = new Notification("Alertaa")
          } else {
            console.log("Notificação foi rejeitada")
          }
        })
    }
  }, [])

  const handleTimeFinished = () => {
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

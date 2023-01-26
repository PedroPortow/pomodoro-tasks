import React, { useContext, useEffect, useMemo, useState } from 'react'
import './Pomodoro.scss'
import { useThemeContext } from '../../context/ThemeContext'
import { Switch } from '../../components/Switcher/Switch'
import { Timer } from '../../components/Timer/Timer'
import { ButtonPlay } from '../../components/Buttons/ButtonPlay'
import { ButtonPomodoro } from '../../components/Buttons/ButtonPomodoro'
import { ConfigMenu } from '../../components/ConfigMenu/ConfigMenu'
import { Tasks } from '../../components/Tasks/Tasks'

export const Pomodoro = () => {
  const { theme, setTheme, isThemeDark } = useThemeContext()

  const [pomodoroMinutes, setPomodoroMinutes] = useState(25)
  const [shortBreakMinutes, setShortBreakMinutes] = useState(5)
  const [longBreakMinutes, setLongBreakMinutes] = useState(15)

  const [isPaused, setIsPaused] = useState(true)
  const [activeMode, setActiveMode] = useState('POMODORO')
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
    if(Notification.permission !== "granted"){
      Notification.requestPermission()
      .then((response) => {
        if(response === "granted"){
          const notify = new Notification("OIOIO")
        } else {
          console.log("Notificação foi rejeitada")
        }
      })
    }
  }, [])

  const handleTimeFinished = () => {
    if(activeMode === 'POMODORO'){
      sendNotification(activeMode)
      setActiveMode('SHORT_BREAK')
    } else if(activeMode === ('SHORT_BREAK' || 'LONG_BREAK')){
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

  return (
    <div className={isThemeDark ? 'timer-wrapper light' : 'timer-wrapper dark'}>
      <ConfigMenu 
        shortBreakMinutes={pomodoroMinutes}
        longBreakMinutes={pomodoroMinutes}
        pomodoroMinutes={setPomodoroMinutes}
        setPomodoroMinutes={setPomodoroMinutes}
        setShortBreakMinutes={setShortBreakMinutes}
        setLongBreakMinutes={setLongBreakMinutes}
      />
      <Switch  />
      <div className='pomodoro-wrapper'>
        <div className='time-progressbar-wrapper'>
          <Timer 
            isPaused={isPaused} 
            pomodoroMinutes={pomodoroMinutes}
            shortBreakMinutes={shortBreakMinutes}
            longBreakMinutes={longBreakMinutes}
            setIsPaused={setIsPaused} 
            activeMode={activeMode}  
            handleTimeFinished={handleTimeFinished} 
          />
          <ButtonPlay isPaused={isPaused} setIsPaused={setIsPaused} />
          <div className='pomodoro-buttons'>
            {buttonsPomodoro.map((button) => {
              return (
                <ButtonPomodoro 
                  onChange={handleActiveMode} 
                  active={activeMode} 
                  text={button.text} 
                  key={button.id} 
                  id={button.id} 
                />
              )
            })}
          </div>
          <div className='tasks-wrapper'>
            <div className='horizontal-divider' />
            <Tasks />
          </div>
        </div>

      </div>
    </div>
  )
}

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

export const Pomodoro = () => {
  const { theme, setTheme, isThemeDark } = useThemeContext()
  const { tasks, selectedTask } = useTaskContext()

  const [pomodoroMinutes, setPomodoroMinutes] = useState(25)
  // const [pomodoroMinutes, setPomodoroMinutes] = useState(25)
  const [shortBreakMinutes, setShortBreakMinutes] = useState(5)
  const [longBreakMinutes, setLongBreakMinutes] = useState(15)
  const [showTasks, setShowTasks] = useState(false)

  const [isPaused, setIsPaused] = useState(true)
  const [activeMode, setActiveMode] = useState('POMODORO')
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

  console.log(selectedTask)


  return (
    <div className={isThemeDark ? 'timer-wrapper light' : 'timer-wrapper dark'}>
      <div className='top-left-wrapper'>
        {/* <div className="flex-row switch-text">
          <Switch
            normalSwitch
            onSwitch={onThemeChange}
          />
          <p className={isThemeDark ? 'dark-text' : 'light-text'}> Contar tempo</p>
        </div> */}
        <div className='worked-time-wrapper'>
          <div className='flex-row center'>
            <i className="fa-regular fa-clock"></i>
            <p
              className={isThemeDark ? 'dark-text' : 'light-text'}
              style={{ fontWeight: '600', marginLeft: '8PX' }}
            >Tempo trabalhado</p>
          </div>
          <div className='horizontal-divider' />
          <div className='time-worked-texts flex-collumn'>
            <p className={isThemeDark ? 'dark-text' : 'light-text'}>Tempo trabalhado: {minutesWorked}:{secondsWorked}</p>
            <p className={isThemeDark ? 'dark-text' : 'light-text'}>Tempo pausa: 20</p>
            <p className={isThemeDark ? 'dark-text' : 'light-text'}>Total: 20</p>
          </div>
        </div>
      </div>
      <div className="top-right-wrapper">
        <Switch
          withIcons
          themeSwitch
          onSwitch={onThemeChange}
          offIcon={"fa-regular fa-sun"}
          onIcon={"fa-regular fa-moon"}
        />
        {/* <i className={isThemeDark ? 'dark-text fa-solid fa-gear' : 'light-text fa-solid fa-gear'}></i> */}

      </div>

      <div className='pomodoro-wrapper'>

        <div className='time-progressbar-wrapper'>
          <div className='task-active-wrapper'>
            <p>{selectedTask && selectedTask.title}</p>
          </div>
          <Timer
            isPaused={isPaused}
            pomodoroMinutes={pomodoroMinutes}
            shortBreakMinutes={shortBreakMinutes}
            longBreakMinutes={longBreakMinutes}
            setIsPaused={setIsPaused}
            activeMode={activeMode}
            handleTimeFinished={handleTimeFinished}
            // workedTime={workedTime}
            setMinutesWorked={setMinutesWorked}
            minutesWorked={minutesWorked}
            secondsWorked={secondsWorked}
            setSecondsWorked={setSecondsWorked}
            // setWorkedTime={setWorkedTime}
            setPausedTime={setPausedTime}
            pausedTime={pausedTime}
            timeCounterActive={timeCounterActive}
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
          <p className={`light-text show-tasks-text mt-150 ${showTasks ? 'mt-25 hidden' : 'mt-150'}`}>
            Tarefas
          </p>
          <i className={`fa-solid ${showTasks ? "fa-chevron-up" : "fa-chevron-down"} light-text`} onClick={handleShowTasks} />
          {showTasks &&
            <div className={`tasks-wrapper`}>
              <Tasks />
            </div>
          }
        </div>
      </div>
    </div>
  )
}

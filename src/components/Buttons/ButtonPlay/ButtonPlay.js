import React from 'react'
import { useThemeContext } from '../../../context/ThemeContext'
import './ButtonPlay.scss'
import { useApplicationContext } from '../../../context/ApplicationContext'

export const ButtonPlay = () => {
  const { theme, setTheme, isThemeDark } = useThemeContext()
  const { isPaused, setIsPaused } = useApplicationContext()

  return (
    <i className={`${isThemeDark ? "dark-text" : "light-text"} fa-solid ${isPaused ? "fa-play" : "fa-pause"} play-btn`} onClick={() => setIsPaused(!isPaused)} />
  )
}

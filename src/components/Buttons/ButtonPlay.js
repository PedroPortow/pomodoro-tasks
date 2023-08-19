import React from 'react'
import { useThemeContext } from '../../context/ThemeContext'
import './ButtonPlay.scss'
import { useApplicationContext } from '../../context/ApplicationContext'

export const ButtonPlay = () => {
  const { theme, setTheme, isThemeDark } = useThemeContext()
  const { isPaused, setIsPaused } = useApplicationContext()

  return (
    <>
      {isPaused
        ? <i className={isThemeDark
          ? " dark-text fa-solid fa-play"
          : "light-text fa-solid fa-play"} onClick={() => setIsPaused(!isPaused)} />
        : <i className={isThemeDark
          ? " dark-text fa-solid fa-pause"
          : "light-text fa-solid fa-pause"} onClick={() => setIsPaused(!isPaused)} />
      }
    </>

  )
}

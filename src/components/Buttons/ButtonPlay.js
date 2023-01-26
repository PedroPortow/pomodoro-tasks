import React from 'react'
import { useThemeContext } from '../../context/ThemeContext'
import './ButtonPlay.scss'

export const ButtonPlay = ({isPaused, setIsPaused}) => {
  const { theme, setTheme, isThemeDark } = useThemeContext()

  return (
    <>
    {isPaused 
      ?  <i className={isThemeDark ? " dark-text fa-solid fa-play" : "light-text fa-solid fa-play" } onClick={() => setIsPaused(!isPaused)} ></i> 
      :  <i className={isThemeDark ? " dark-text fa-solid fa-pause" : "light-text fa-solid fa-pause" } onClick={() => setIsPaused(!isPaused)} ></i>
    }
    </>
  
  )
}

import React from 'react'
import { useThemeContext } from '../../context/ThemeContext'
import './ButtonPomodoro.scss'

export const ButtonPomodoro = ({text, active, onChange, id} ) => {
  const { theme, setTheme, isThemeDark } = useThemeContext()

  

  
  return (
      <p 
        id={id}
        className={active === id  
          ? `active btn ${isThemeDark ? 'dark-text' : 'light-text'}` 
          : `inactive btn ${isThemeDark ? 'dark-text' : 'light-text'}`} 
        onClick={() => onChange(id)}>
      {text}
      </p>
  )
}


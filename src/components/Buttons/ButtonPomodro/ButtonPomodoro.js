import React, { useCallback } from 'react'
import { useThemeContext } from '../../../context/ThemeContext'
import './ButtonPomodoro.scss'

export const ButtonPomodoro = ({ text, active, onClick, id }) => {
  const { isThemeDark } = useThemeContext()

  return (
    <a
      id={id}
      className={`${active ? 'active' : 'inactive'} btn ${isThemeDark ? 'dark-text' : 'light-text'}`}
      onClick={onClick}
    >
      {text}
    </a>
  )
}


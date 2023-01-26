import React, { useContext } from 'react'
import { useThemeContext } from '../../context/ThemeContext'
import './Switch.scss'

export const Switch = ({onThemeChange}) => {
  const { theme, setTheme } = useThemeContext()

  let isThemeDark = theme === 'dark'

  const handleClick = () => {
    setTheme(isThemeDark ? 'light' : 'dark')
  }

  return (
    <>
      <input type="checkbox" hidden="hidden" id="input" />
      <label className="switch" htmlFor="input" onClick={handleClick} ></label>
    </>
  )
}

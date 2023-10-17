import React from 'react'
import './Button.scss'

function Button({theme, text, className, onClick}) {
  // themes: dark-oultine regular(azul)
  return (
    <button className={`btn ${theme} ${className}`} onClick={onClick}>{text}</button>
  )
}

export default Button

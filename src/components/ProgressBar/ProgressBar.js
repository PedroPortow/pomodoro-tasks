import React, { useCallback } from 'react'
import './ProgressBar.scss'
import { useApplicationContext } from '../../context/ApplicationContext'

function ProgressBar() {
  const { minutes, totalMinutes, activeMode, seconds } = useApplicationContext()

  const elapsedTime = useCallback(() => {
    const totalSeconds = (totalMinutes * 60);
    return (totalSeconds > 0) ? 100 - ((minutes * 60 + seconds) / totalSeconds) * 100 : 100;
  }, [minutes, seconds, totalMinutes]);

  return (
    <div className='progressbar-wrapper'>
      <div className='progressbar-load' style={{width: `${elapsedTime()}%`}} />
      <div className='progressbar-background' />
    </div>
  )
}

export default ProgressBar

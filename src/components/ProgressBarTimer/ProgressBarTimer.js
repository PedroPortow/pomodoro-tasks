import React from 'react'
import './ProgressBarTimer.scss'
import { Timer } from '../Timer/Timer'
import ProgressBar from '../ProgressBar/ProgressBar'

function ProgressBarTimer() {

  return (
    <div className='progressbar-timer-wrapper'>
      <Timer />
      <ProgressBar  />
    </div>
  )
}

export default ProgressBarTimer

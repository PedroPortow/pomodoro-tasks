import React from 'react'
import './ProgressBarTimer.scss'
import { Timer } from '../Timer/Timer'
import ProgressBar from '../ProgressBar/ProgressBar'

function ProgressBarTimer({handleTimeFinished}) {

  return (
    <div className='progressbar-timer-wrapper'>
      <Timer handleTimeFinished={handleTimeFinished}/>
      <ProgressBar  />
    </div>
  )
}

export default ProgressBarTimer

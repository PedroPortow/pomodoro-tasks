import React, { useState } from 'react'
import './ConfigMenu.scss'

export const ConfigMenu = ({setShortBreakMinutes,  setLongBreakMinutes, }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const [pomodoroMinutes, setPomodoroMinutes] = useState(25)
  const handleClick = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleChange = (e) => {
    setPomodoroMinutes(e.target.value)
  }

  const MenuOptions = () => {
    return (
      <form>
        <div className='time-config flex-collumn'>
          <div className="flex-row title-row">
            <i className="fa-regular fa-clock"></i>
            <h2 className='text-title'>TEMPO</h2>
          </div>
          <div className='divider' />
          <div className='time-inputs-wrapper flex-row'>
            <div className='flex-collumn input-group'>
              <label className='label'>pomodoro</label>
              <input className='input' onChange={handleChange} value={pomodoroMinutes} placeholder='25'/>
            </div>
            <div className='flex-collumn input-group'>
              <label className='label'>pausinha</label>
              <input type={"number"} className='input' placeholder='5'/>
            </div>
            <div className='flex-collumn input-group'>
              <label className='label'>pausão</label>
              <input type={"number"} className='input' placeholder='15'/>
            </div>
          </div>
        </div>
      </form>
    )
  }
  
  return (
    <div className="menu-wrapper">
      <i className={isMenuOpen ? "fa-solid fa-x light-text" : "fa-solid fa-bars light-text"} onClick={handleClick}></i>
      {isMenuOpen &&
       <div className='options-wrapper flex-collumn light-text'>
         <MenuOptions />
       </div>}


    </div>
  )
}

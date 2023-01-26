import React from 'react'
import './TaskCard.scss'

export const TaskCard = ({addTask}) => {

  const handleChangeTaskTitle = () => {
    
  }

  return (
    <div className='card-wrapper'> 
      <div className="form-group field">
        <input 
          type="input" 
          className="form-field" 
          placeholder='Tarefa'
          id='name' 
          onChange={handleChangeTaskTitle}
        />
        <label htmlFor="name" className="form-label">tarefa</label>
      </div>
      <div className='estimated-time-wrapper'>
        <div className='flex-collumn'>
          <label className='time-label'>Tempo estimado</label>
          <div className='flex-row unit-input'>
            <i class="fa-solid fa-caret-up arrow-up"></i>
            <i class="fa-solid fa-caret-down arrow-down"></i>
            <input type="number" className='input-number' min="0" max="999"/>
            <p>Pomodoros</p>
          </div>
        </div>
      </div>
      <div className='card-footer'>
        <button className='btn-cancel'>Cancelar</button>
        <button className='btn-save'>Salvar</button>
      </div>
    </div>
  )
}

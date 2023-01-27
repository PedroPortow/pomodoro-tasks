import React, { useState } from 'react'
import './TaskCard.scss'

export const TaskCard = ({addTask}) => {
  const [addDescription, setAddDescription] = useState(false)
  const [taskTitle, setTaskTitle] = useState()
  const [estimatedTime, setEstimatedTime] = useState()


  return (
    <div className='card-wrapper'>
      <div className="padding">
      <div className="form-group field">
        <input 
          type="input" 
          className="form-field" 
          placeholder='Tarefa'
          id='name' 
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
        <label htmlFor="name" className="form-label">tarefa</label>
      </div>
      <div className='estimated-time-wrapper'>
        <div className='flex-collumn'>
          <label className='time-label'>Tempo estimado</label>
          <div className='flex-row unit-input'>
            <i class="fa-solid fa-caret-up arrow-up" onClick={() => setEstimatedTime(estimatedTime ? parseInt(estimatedTime) + 1 : 1)} />
            <i class="fa-solid fa-caret-down arrow-down" onClick={() => setEstimatedTime(estimatedTime ? parseInt(estimatedTime) - 1 : 0)} />
            <input type="number" className='input-number' min="0" max="999" value={estimatedTime} onChange={(e) => setEstimatedTime(e.target.value)}/>
            <p className='subtitle'>Pomodoros</p>
          </div>
        </div>
        <button className="btn-add-obs time-label" onClick={() => setAddDescription(!addDescription)}><i class="fa-solid fa-pencil"/>Adicionar Descrição</button>
      </div>
      {addDescription && 
        <div className='flex-collumn'>
          <label className='time-label'>Descrição</label>
          <textarea className='text-area'/>
        </div>
      }
      </div>
      <div className='card-footer'>
        <button className='btn-cancel'>Cancelar</button>
        <button className='btn-save'>Salvar</button>
      </div>
    </div>
  )
}

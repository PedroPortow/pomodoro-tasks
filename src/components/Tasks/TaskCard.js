import React, { useState } from 'react'
import { useTaskContext } from '../../context/TaskContext'
import './TaskCard.scss'

export const TaskCard = ({
  newTask,
  id,
  handleAddNewTask,
  saved,
  checked,
  handleCheckTask,
  handleEditTask,
  handleDeleteTask,
  handleSaveTask,
  editable,
  title,
  description,
  estimatedTime,
  selected,
  draggableIcon,
  handleSelectTask
}) => {
  const { setSelectedTask, selectedTask } = useTaskContext()

  const [addDescription, setAddDescription] = useState(false)
  const [taskTitle, setTaskTitle] = useState(title ? title : undefined)
  const [taskEstimatedTime, setTaskEstimatedTime] = useState(estimatedTime ? estimatedTime : undefined)
  const [taskDescription, setTaskDescription] = useState(description ? description : undefined)




  const handleSubmit = (e) => {
    console.log("submit feito")
    e.preventDefault()
    handleSaveTask(id, taskTitle, taskEstimatedTime, taskDescription)
  }

  console.log({ editable })

  if (!saved || editable) {
    return (
      <form className='card-wrapper' onSubmit={handleSubmit} >
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
                <i class="fa-solid fa-caret-up arrow-up" onClick={() => setTaskEstimatedTime(taskEstimatedTime ? parseInt(taskEstimatedTime) + 1 : 1)} />
                <i class="fa-solid fa-caret-down arrow-down" onClick={() => setTaskEstimatedTime(taskEstimatedTime ? parseInt(taskEstimatedTime) - 1 : 0)} />
                <input type="number" className='input-number' min="0" max="999" value={taskEstimatedTime} onChange={(e) => setTaskEstimatedTime(e.target.value)} />
                <p className='subtitle'>Pomodoros</p>
              </div>
            </div>
            {!addDescription && <button className="btn-add-obs" type='button' onClick={() => setAddDescription(true)}><i class="fa-solid fa-pencil" />Adicionar Descrição</button>}
          </div>
          {addDescription
            ?
            <div className='flex-collumn'>
              <label className='time-label'>Descrição </label>
              <textarea className='text-area' onChange={(e) => setTaskDescription(e.target.value)} />
            </div>
            : ''
          }
        </div>
        <div className={`card-footer ${editable ? 'space-between' : 'flex-end'}`}>
          {editable &&
            <button className='btn-cancel' type='button' onClick={() => handleDeleteTask(id)}>Deletar</button>
          }
          <div className="end-row">
            <button className='btn-cancel' type='button' onClick={() => handleDeleteTask(id)}>Cancelar</button>
            <button className='btn-save' type='submit'>Salvar</button>
          </div>
        </div>
      </form>
    )
  } else {
    return (
      <div
        className={`card-saved ${selectedTask?.id === id && 'card-selected'}`}
        onClick={() => setSelectedTask({ title, id })}
      >
        {draggableIcon}
        {/* <div className={`color-bg ${selected.id === id && !checked ? 'blue' : checked ? 'green' : 'grey'}`} /> */}
        <div className="text-saved-wrapper flex-collumn">
          <p className={`${checked && 'line-through'} title-saved`}>{title}</p>
          <p className={`${checked && 'line-through'} subtitle-saved`}>{description}</p>
        </div>
        <div className="estimated-time-card-wrapper">
          <p className="title-estimated-time">{estimatedTime} Pomodoros</p>
        </div>
        <div className='icons-wrapper'>
          <i className={`fa-solid fa-circle-check ${checked ? 'green-checked' : 'not-checked'}`}
            onClick={() => handleCheckTask(id)} />
          <i className="fa-solid fa-pen-to-square ellipsis" onClick={() => handleEditTask(id)} />
        </div>
      </div>
    )
  }
}

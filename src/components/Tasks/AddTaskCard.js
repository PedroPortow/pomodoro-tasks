import React from 'react'

export const AddTaskCard = ({handleAddNewTask}) => {
  
  return (
    <div className="new-task-wrapper">
      <button onClick={handleAddNewTask} className="btn-add-new-task">
        <i className="fa-solid fa-plus"/>
        adicionar nova tarefa
      </button>
    </div>
  )
}

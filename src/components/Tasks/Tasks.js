import React from 'react'
import { useState } from 'react'
import { TaskCard } from './TaskCard'
import './Tasks.scss'
export const Tasks = () => {

  let id = 1

  const [tasks, setTasks] = useState([
    {
      id: 1
    },
    {
      id: 2
    }
  ])


  return (
    <div className='task-cards-wrapper'>
      {tasks.map((card) => {
        return <TaskCard key={card.id} />
      })}
    </div>
  )
}

import React, { useState } from 'react'
import { useTaskContext } from '../../../context/TaskContext'
import './TaskCard.scss'

export const TaskCard = ({

}) => {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const mock = [
    {
    link: "https://www.figma.com/file/HXAONeyeRMcsjoKopAH7Og/Untitled?type=design&node-id=119-86&mode=design&t=0j6ETT73f1x2W5XL-0",
  },
    {
    link: "https://www.youtube.com/brksedu",
  }
]

  const handleEdit = () => {
    console.log("#TODO")
  }

  const handleDelete = () => {
    console.log('#TODO')
  }

  return (
    <div className='task-container'>
      <div className={`task-card-wrapper ${isCollapsed ? "collapsed" : "opened"}`}>
        <input type='checkbox' className='task-checkbox' />
        <div className='task-content'>
          <div className='task-content-top-col'>
            <h3 className='task-title'>Titulo bem foda da tarefa 1</h3>
            <h3 className={`task-subtitle ${isCollapsed ? "text-ellipsis" : "opened-subtitle"}`}>asdaasdasadasdasdsadasdsdads lorem lorem lorem loasdasadasdasdsadasdsdads lorem lorem lorem losadasdasdsadasdsdads lorem lorem lorem lol</h3>
          </div>
          <div className='task-content-bottom-row'>
            <i className="fa fa-link color-w" />
            <h3 className='attachment-text'>{mock.length} Attachments</h3>
          </div>
          {!isCollapsed &&
            <div className='attachments-wrapper'>
              {mock.map((attachment, index) => {
                return (
                  <a href="www.google.com" className='redirect-link' target='_blank' key={index}>
                    {attachment.link}
                  </a>
                )

              })}
            </div>
          }
        </div>
        <i className={`fa fa-chevron-${isCollapsed ? "down" : "up"} color-w chevron`}
            onClick={() => setIsCollapsed(!isCollapsed)}
        />
      </div>
      <div className='edit-buttons-col'>
          <i className='fa fa-pencil' onClick={handleEdit} />
          <i className='fa fa-trash-can' onClick={handleDelete} />
      </div>
    </div>

  )
}

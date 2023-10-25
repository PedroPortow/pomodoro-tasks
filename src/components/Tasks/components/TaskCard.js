import React, { useRef, useState } from 'react'
import { useTaskContext } from '../../../context/TaskContext'
import './TaskCard.scss'
import EditTaskModal from '../../Modals/EditTaskModal/EditTaskModal'

export const TaskCard = ({taskId, title, estimatedTime, description, attachments, draggableIcon, taskChecked}) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [checked, setChecked] = useState(taskChecked);
  
  console.log({taskChecked})
  
  const { dispatch } = useTaskContext()
  
  const editTaskModalRef = useRef(null)
  

  const mock = [
    {
    link: "https://www.figma.com/file/HXAONeyeRMcsjoKopAH7Og/Untitled?type=design&node-id=119-86&mode=design&t=0j6ETT73f1x2W5XL-0",
  },
    {
    link: "https://www.youtube.com/brksedu",
  }
]
  const handleDeleteTask = () => {
    dispatch({ type: 'DELETE_UNIQUE', payload: { id: taskId } })
  }
  
  const handleCheckTask = (e) => {
    const checkEvent = e.target.checked
    setChecked(checkEvent)
    dispatch({ type: 'CHECK', payload: { id: taskId, check: checkEvent } })
    
    if(checkEvent){
      setTimeout(() => {
        dispatch({ type: 'REORDER_TO_LAST', payload: { id: taskId } });
      }, 1000); 
    }
  
    
  }
  
  return (
    <div className='task-container'>
      <EditTaskModal
        ref={editTaskModalRef} 
        taskId={taskId}
        taskTitle={title}
        taskEstimatedTime={estimatedTime || null}
        taskDescription={description}
        taskAttachments={attachments}
      />
      {draggableIcon}
      <div className={`task-card-wrapper ${isCollapsed ? 'collapsed' : 'opened'}`}>
        <input type='checkbox' checked={checked} className='check-box' onChange={handleCheckTask} />
        <div className='task-content'>
          <div className='task-content-top-col'>
            <h3 className={`${checked ? "text-line-trough" : ""} task-title`}>{title}</h3>
            <h3 className={`${checked ? "text-line-trough" : ""} task-subtitle ${isCollapsed ? 'text-ellipsis' : 'opened-subtitle'}`}>
              {description}
            </h3>
          </div>
          {attachments?.length > 0 && (
            <div className='task-content-bottom-row'>
              <i className='fa fa-link color-w' />
              <h3 className='attachment-text'>{attachments.length} Attachments</h3>
              {!isCollapsed && (
                <div className='attachments-wrapper'>
                  {attachments.map((attachment, index) => (
                    <a href={attachment.link} className='redirect-link' target='_blank' key={index}>
                      {attachment.link}
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        {description?.length > 33 || attachments?.length 
          ? <i className={`fa fa-chevron-${isCollapsed ? 'down' : 'up'} color-w chevron`}
              onClick={() => setIsCollapsed(!isCollapsed)}
            />
          : null
        }
      </div>
      <div className='edit-buttons-col'>
        <i className='fa fa-pencil' onClick={() => editTaskModalRef.current.showModal()} />
        <i className='fa fa-trash-can' onClick={handleDeleteTask} />
      </div>
    </div>
  )
}

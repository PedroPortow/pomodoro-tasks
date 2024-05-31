import React, { forwardRef, useImperativeHandle, useState } from 'react'
import './EditTaskModal.scss'
import Button from '../../Buttons/Button'
import { useTaskContext } from '../../../context/TaskContext'
import Modal from '../Modal'

const EditTaskModal =  forwardRef(({ taskId, taskEstimatedTime, taskTitle, taskDescription, taskAttachments }, ref) => {
  const [estimatedTime, setEstimatedTime] = useState(taskEstimatedTime || 0)
  const [isVisible, setIsVisible] = useState(false)
  const [title, setTitle] = useState(taskTitle)
  const [description, setDescription] = useState(taskDescription)
  const [attachments, setAttachments] = useState(taskAttachments || [])
  const [error, setError] = useState('')

  const { tasks, dispatch } = useTaskContext()

  useImperativeHandle(ref, () => ({
    hideModal: () => setIsVisible(false),
    showModal: () => setIsVisible(true)
  }))
  
  const validateFields = () => {
    if(!title){
      setError("This field is required.")
      return false
    }
    
    return true
  }
  
  const handleUpdateTask = () => {
    if(!validateFields()){
      return
    }
    
    dispatch({ type: 'SAVE', payload: { taskId, title, estimated_time: estimatedTime, edit: true, description } })
    setIsVisible(false)
  }
  
  if(isVisible){
    return (
      <Modal title="Edit task" onCloseButtonClick={() => setIsVisible(false)}>
        <div className='add-new-task-wrapper'>
          <div className='input-fields-wrapper'>
            {error && <label className='error-label'>{error}</label>}
            <input placeholder='Task Title' className='input-field' value={title} onChange={e => {setTitle(e.target.value); setError('')}} />
            <textarea placeholder='Enter the task description here' className='text-area' value={description} onChange={e => setDescription(e.target.value)}/>
            {/* <div className='d-flex f-row gap-4 al-center mt-12'>
              <label className='input-label'>Estimated Pomodoros</label>
              <input type="number" className='input-number' min="0" max="999" value={estimatedTime} onChange={(e) => setEstimatedTime(e.target.value)}/>
            </div> */}
          </div>
          <button className='btn-blue mt-16 submit-btn' onClick={handleUpdateTask}>Save</button>
        </div>
      </Modal>
    )
  }
  
  return null
})

export default EditTaskModal

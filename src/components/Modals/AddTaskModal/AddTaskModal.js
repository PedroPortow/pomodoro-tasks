import React, { forwardRef, useImperativeHandle, useState } from 'react'
import './AddTaskModal.scss'
import Button from '../../Buttons/Button'
import { useTaskContext } from '../../../context/TaskContext'
import { v4 as uuidv4, validate } from 'uuid';
import Modal from '../Modal';

const AddTaskModal =  forwardRef(({ onSave }, ref) => {
  const [estimatedTime, setEstimatedTime] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [title, setTitle] = useState()
  const [description, setDescription] = useState()
  const [attachments, setAttachments] = useState([])
  const [error, setError] = useState('')

  const { tasks, dispatch } = useTaskContext()

  const handleAddNewTask = () => {
    if(!validateFields()){
      return 
    }
    
    dispatch({
      type: 'ADD', payload: {
        title: title,
        description: description,
        attachments: attachments,
        edit: false,
        id: uuidv4(),
        checked: false
      }
    })
    
    clearFields()
    setIsVisible(false)
  }
  
  const validateFields = () => {
    if(!title){
      setError("This field is required.")
      return false
    }
    
    return true
  }
  
  const clearFields = () => {
    setTitle()
    setDescription()
    setAttachments([])
    setEstimatedTime(0)
    setError('')
  }
  
  useImperativeHandle(ref, () => ({
    hideModal: () => setIsVisible(false),
    showModal: () => setIsVisible(true)
  }))
  
  const handleCloseModal = () => {
    clearFields()
    setIsVisible(false)
  }

  if(isVisible){
    return (
      <Modal title="Add new task" onCloseButtonClick={handleCloseModal}>
        <div className='add-new-task-wrapper'>
          <div className='input-fields-wrapper'>
           {error && <label className='error-label'>{error}</label>}
           <input placeholder='Task Title' className='input-field' value={title} onChange={e => {setTitle(e.target.value); setError('')}} />
            <textarea placeholder='Enter the task description here' className='text-area' value={description} onChange={e => setDescription(e.target.value)}/>
            <div className='d-flex f-row gap-4 al-center mt-12'>
              <label className='input-label'>Esimated Pomodoros</label>
              <input type="number" className='input-number' min="0" max="999" value={estimatedTime} onChange={(e) => setEstimatedTime(e.target.value)}/>
            </div>
          </div>
          <button className='btn-blue mt-16 submit-btn' onClick={handleAddNewTask}>Save</button>
        </div>
      </Modal>
    )
  }
  
  return null
})

export default AddTaskModal

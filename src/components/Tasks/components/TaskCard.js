import React, { useRef, useState } from 'react';
import { useTaskContext } from '../../../context/TaskContext';
import { v4 as uuidv4 } from 'uuid';
import './TaskCard.scss';
import EditTaskModal from '../../Modals/EditTaskModal/EditTaskModal';
import { useEffect } from 'react';

export const TaskCard = ({ taskId, title, estimatedTime, description, attachments, draggableIcon, taskChecked, focus, onAddTask }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [checked, setChecked] = useState(taskChecked);
  const [taskTitle, setTaskTitle] = useState(title); // Estado para gerenciar o título

  const { dispatch } = useTaskContext();
  const editTaskModalRef = useRef(null);

  const inputRef = useRef(null)

  const handleDeleteTask = () => {
    dispatch({ type: 'DELETE_UNIQUE', payload: { id: taskId } });
  };

  useEffect(() => {
    if (focus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [focus]);


  const handleCheckTask = (e) => {
    const checkEvent = e.target.checked;
    setChecked(checkEvent);
    dispatch({ type: 'CHECK', payload: { id: taskId, check: checkEvent } });

    if (checkEvent) {
      setTimeout(() => {
        dispatch({ type: 'REORDER_TO_LAST', payload: { id: taskId } });
      }, 1000);
    }
  };

  const handleUpdateTask = (e) => {
    const newTitle = e.target.value;
    setTaskTitle(newTitle);
  };


  const handleKeyPress = (e) => {
    const newTaskUuid = uuidv4()
    if (e.key === 'Enter') {
      dispatch({ type: 'SAVE', payload: { taskId, title: taskTitle } });
      dispatch({
        type: 'ADD', payload: {
          id: newTaskUuid ,
          checked: false
        }
      })

      onAddTask(newTaskUuid)
      e.preventDefault();
    }
  };


  return (
    <div className='task-container'>
      {draggableIcon}
      <div className={`task-card-wrapper ${isCollapsed ? 'collapsed' : 'opened'}`}>
        <input type='checkbox' checked={checked} className='check-box' onChange={handleCheckTask} />
        <div className='task-content'>
           <input className='input' onChange={handleUpdateTask} value={taskTitle}  onKeyPress={handleKeyPress} ref={inputRef} />
        </div>
      </div>
      <i className='fa fa-trash-can' onClick={handleDeleteTask} />
    </div>
  );
};

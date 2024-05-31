import React, { useRef, useState } from 'react';
import { useTaskContext } from '../../../context/TaskContext';
import { v4 as uuidv4 } from 'uuid';
import './TaskCard.scss';
import EditTaskModal from '../../Modals/EditTaskModal/EditTaskModal';
import { useEffect } from 'react';

export const TaskCard = ({ taskId, title, draggableIcon, taskChecked, focus, onAddTask, index }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [checked, setChecked] = useState(taskChecked);
  const [taskTitle, setTaskTitle] = useState(title); // Estado para gerenciar o título
  const [isHovered, setIsHovered] = useState(false)

  const { dispatch } = useTaskContext();
  const editTaskModalRef = useRef(null);

  const inputRef = useRef(null)

  const handleDeleteTask = () => {
    dispatch({ type: 'DELETE_UNIQUE', payload: { id: taskId } });
  };

  useEffect(() => {
    if (focus && inputRef.current) {
      inputRef.current.focus();
      setIsHovered(true);
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
          task: {
            id: newTaskUuid,
            checked: false,
          },
          index
        }
      })

      onAddTask(newTaskUuid)
      e.preventDefault();
    }
  };

  const handleFocus = () => {
    setIsHovered(true);
  };

  const handleBlur = () => {
    setIsHovered(false);
  };

  return (
    <div className='task-container' onMouseOver={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
    <div className={`task-card-wrapper ${isCollapsed ? 'collapsed' : 'opened'} ${isHovered ? 'hover' : ''}`}>
      {draggableIcon}
      <input type='checkbox' checked={checked} className='check-box' onChange={handleCheckTask} />
      <div className='task-content'>
        <input
          className='input'
          onChange={handleUpdateTask}
          value={taskTitle}
          onKeyPress={handleKeyPress}
          ref={inputRef}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>
      <i className='fa fa-trash-can' onClick={handleDeleteTask} />
    </div>
  </div>
  );
};

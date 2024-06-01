import React, { useRef, useState } from 'react';
import { ACTIONS, useTaskContext } from '../../../context/TaskContext';
import { v4 as uuidv4 } from 'uuid';
import './TaskCard.scss';
import EditTaskModal from '../../Modals/EditTaskModal/EditTaskModal';
import { useEffect } from 'react';

export const TaskCard = ({ task, draggableIcon, taskChecked, focus, onAddTask, index }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [checked, setChecked] = useState(taskChecked);
  const [isHovered, setIsHovered] = useState(false)

  const { dispatch } = useTaskContext();

  const inputRef = useRef(null)

  const handleDeleteTask = () => {
    console.log({task})
    dispatch({
      type: ACTIONS.REMOVE_TASK,
      payload: {
        id: task.id
      }
    });
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

    dispatch({
      type: ACTIONS.CHECK,
      payload: {
        id: task.id,
        check: checkEvent
      }
    });

    if (checkEvent) {
      setTimeout(() => {
        dispatch({
          type: ACTIONS.REORDER,
          payload: {
            id: task.id
          }
        });
      }, 1000);
    }
  };

  const handleUpdateTask = (e) => {
    const { value } = e.target;

    dispatch({
      type: ACTIONS.UPDATE_TASK,
      payload: {
        id: task.id,
        updates: {
          title: value
        }
      }
    })
  };


  const handleKeyPress = (e) => {
    const newTaskUuid = uuidv4()

    if (e.key === 'Enter') {
      dispatch({
        type: ACTIONS.ADD_TASK,
        payload: {
          id: newTaskUuid,
          index: index + 1
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
          value={task?.title}
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

import React, { useRef, useState, useEffect } from 'react';
import { ACTIONS, useTaskContext } from '../../../context/TaskContext';
import { v4 as uuidv4 } from 'uuid';
import './TaskCard.scss';
import EditTaskModal from '../../Modals/EditTaskModal/EditTaskModal';
import { useTranslation } from 'react-i18next';

export const TaskCard = ({ task, draggableIcon, taskChecked, focus, setFocusedTaskId, index }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [checked, setChecked] = useState(taskChecked);
  const [isHovered, setIsHovered] = useState(false);

  const { tasks, dispatch } = useTaskContext();
  const { t, i18n } = useTranslation();

  const inputRef = useRef(null);

  const handleDeleteTask = () => {
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
    });
  };

  const handleKeyPress = (e) => {
    const newTaskUuid = uuidv4();

    if (e.key === 'Enter') {
      dispatch({
        type: ACTIONS.ADD_TASK,
        payload: {
          id: newTaskUuid,
          index: index + 1
        }
      });

      setFocusedTaskId(newTaskUuid);
      e.preventDefault();
    }
  };

  const handleKeyDown = ({ key }) => {
    const nextIndex = index + 1;
    const prevIndex = index - 1;


    if (key === 'ArrowDown' && nextIndex < tasks.length) {
      setFocusedTaskId(tasks[nextIndex].id);
    } else if (key === 'ArrowUp' && prevIndex >= 0) {
      setFocusedTaskId(tasks[prevIndex].id);
    } else if (key === 'Backspace' && !task.title) {
      dispatch({
        type: ACTIONS.REMOVE_TASK,
        payload: {
          id: task.id
        }
      });

      if (prevIndex >= 0) {
        setFocusedTaskId(tasks[prevIndex].id);
      } else if (nextIndex <= tasks.length) {
        setFocusedTaskId(tasks[nextIndex].id);
      }
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
            className={`input ${checked ? 'checked' : ''}`}
            onChange={handleUpdateTask}
            value={task?.title}
            onKeyPress={handleKeyPress}
            onKeyDown={handleKeyDown}
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

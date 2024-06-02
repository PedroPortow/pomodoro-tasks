import React, { useRef } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { ACTIONS, useTaskContext } from '../../context/TaskContext';
import { TaskCard } from './components/TaskCard';
import './TaskList.scss';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useTranslation } from 'react-i18next';

export const TaskList = () => {
  const { tasks, dispatch } = useTaskContext();
  const [focusedTaskId, setFocusedTaskId] = useState();

  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    dispatch({ type: ACTIONS.REORDER, payload: { data: items } });
  };

  const handleAddTask = () => {
    const newTaskUuid = uuidv4();

    dispatch({
      type: ACTIONS.ADD_TASK,
      payload: {
        index: tasks.length + 1
      }
    });
    setFocusedTaskId(newTaskUuid);
  };

  return (
    <>
      <div className='task-list'>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="list">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className='task-cards-wrapper'
              >
                {tasks.length ? tasks.map((task, index) => {
                  return (
                    <Draggable
                      key={index}
                      draggableId={index.toString()}
                      index={index}
                    >
                      {(provided) => {
                        return (
                          <div {...provided.draggableProps}
                            ref={provided.innerRef}
                          >
                            <TaskCard
                              key={task?.id || uuidv4()}
                              index={index}
                              task={task}
                              draggableIcon={
                                <i className="fa-solid fa-grip-vertical color-bg"
                                  {...provided.dragHandleProps} />
                              }
                              focus={task?.id == focusedTaskId}
                              setFocusedTaskId={(id) => setFocusedTaskId(id)}
                            />
                          </div>
                        )
                      }}
                    </Draggable>
                  )
                }) : null}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      <div className='buttons-row'>
        <button className='add-task-btn' onClick={handleAddTask}>
          {t('add_task')}
        </button>
      </div>
    </>
  )
}

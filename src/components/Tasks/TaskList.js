import React, { useRef } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { useTaskContext } from '../../context/TaskContext'
import { TaskCard } from './components/TaskCard'
import './TaskList.scss'
import AddTaskModal from '../Modals/AddTaskModal/AddTaskModal'
import { useState } from 'react'

export const TaskList = () => {
  const { tasks, dispatch } = useTaskContext()
  const [focusedTaskId, setFocusedTaskId] = useState()

  const addTaskModalRef = useRef(null)

  const onDragEnd = (result) => {
    const items = Array.from(tasks);
    items[result.source.index].position = result.destination.index;
    items[result.destination.index].position = result.source.index;
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    dispatch({ type: 'REORDER', payload: { data: items } })
  };

  console.log({focusedTaskId})

  return (
    <>
      <AddTaskModal ref={addTaskModalRef} />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="list" >
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className='task-cards-wrapper'
            >
              {tasks.map((task, index) => {
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
                            onAddTask={(id) => setFocusedTaskId(id)}
                            key={task.id}
                            taskId={task.id}
                            title={task?.title}
                            estimatedTime={task?.estimated_time}
                            description={task?.description}
                            index={index}
                            draggableIcon={
                              <i className="fa-solid fa-grip-vertical color-bg"
                                {...provided.dragHandleProps} />
                            }
                            attachments={task.attachments}
                            taskChecked={task.checked}
                            focus={task.id == focusedTaskId}
                          />
                        </div>
                      )
                    }}
                  </Draggable>
                )
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <button className='add-task-btn' onClick={() => addTaskModalRef.current.showModal()}>
        Add Task
      </button>
    </>
  )
}

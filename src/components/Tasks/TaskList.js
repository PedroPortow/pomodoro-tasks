import React, { useRef, useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { useTaskContext } from '../../context/TaskContext'
import { TaskCard } from './components/TaskCard'
import './TaskList.scss'
import AddTaskModal from '../Modals/AddTaskModal/AddTaskModal'

export const TaskList = () => {
  const { tasks, dispatch } = useTaskContext()
  const [taskToEdit, setTaskToEdit] = useState({})
  
  const addTaskModalRef = useRef(null)

  const handleDeleteTask = (id) => {
    dispatch({ type: 'DELETE_UNIQUE', payload: { id: id } })
  }

  const handleCheckTask = (id) => {
    dispatch({ type: 'CHECK', payload: { id: id, check: true } })
  }

  // const handleSaveTask = (id, taskTitle, estimatedTime, taskDescription) => {
  //   dispatch({
  //     type: 'SAVE', payload: {
  //       id: id,
  //       save: true,
  //       title: taskTitle,
  //       estimated_time: estimatedTime,
  //       description: taskDescription,
  //       editable: false,
  //     }
  //   })
  // }

 

  const onDragEnd = (result) => {
    const items = Array.from(tasks);
    items[result.source.index].position = result.destination.index;
    items[result.destination.index].position = result.source.index;
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    dispatch({ type: 'REORDER', payload: { data: items } })
  };
  
  console.log({tasks})
  
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
                            key={task.id}
                            taskId={task.id}
                            title={task?.title}
                            estimatedTime={task?.estimated_time}
                            description={task?.description}
                            draggableIcon={
                              <i className="fa-solid fa-grip-vertical color-bg"
                                {...provided.dragHandleProps} />
                            }
                            attachments={task.attachments}
                            taskChecked={task.checked}
                          // setSelected={setTaskSelected}
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
      <button className='add-task-btn' onClick={() => addTaskModalRef.current.showModal()}>Adicionar Tarefa</button>
    </>
  )
}

import React from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { useTaskContext } from '../../context/TaskContext'
import { AddTaskCard } from './AddTaskCard'
import { TaskCard } from './TaskCard'
import './Tasks.scss'

export const Tasks = () => {
  const { tasks, dispatch } = useTaskContext()

  const handleAddNewTask = () => {
    dispatch({
      type: 'ADD', payload: {
        id: Date.now(),
        saved: false,
        checked: false,
        editable: false,
        title: null,
        selected: false,
        estimated_time: null,
      }
    })
  }

  const handleDeleteTask = (id) => {
    dispatch({ type: 'DELETE_UNIQUE', payload: { id: id } })
  }

  const handleCheckTask = (id) => {
    dispatch({ type: 'CHECK', payload: { id: id, check: true } })
  }

  const handleSaveTask = (id, taskTitle, estimatedTime, taskDescription) => {
    dispatch({
      type: 'SAVE', payload: {
        id: id,
        save: true,
        title: taskTitle,
        estimated_time: estimatedTime,
        description: taskDescription,
        editable: false,
      }
    })
  }

  const handleEditTask = (id) => {
    dispatch({ type: 'EDIT', payload: { id, editable: true } })
  }


  console.log({ tasks })

  const onDragEnd = (result) => {
    const items = Array.from(tasks);
    items[result.source.index].position = result.destination.index;
    items[result.destination.index].position = result.source.index;
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    dispatch({ type: 'REORDER', payload: { data: items } })
  };

  return (
    <>
      <div className='task-cards-wrapper'>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="list" >
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="w-100"
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
                              id={task.id}
                              newTask={false}
                              title={task.title}
                              estimatedTime={task.estimated_time}
                              saved={task.saved}
                              checked={task.checked}
                              editable={task.editable}
                              handleCheckTask={handleCheckTask}
                              handleDeleteTask={handleDeleteTask}
                              handleSaveTask={handleSaveTask}
                              handleEditTask={handleEditTask}
                              description={task.description}
                              selected={task.selected}
                              draggableIcon={
                                <i class="fa-solid fa-grip-vertical color-bg"
                                  {...provided.dragHandleProps} />
                              }
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
      </div>
      <AddTaskCard newTask={true} handleAddNewTask={handleAddNewTask} />
    </>
  )
}

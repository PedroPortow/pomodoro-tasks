import React from "react";
import { useReducer } from "react";
import { createContext, useState, useContext } from "react";

const TaskContext = createContext();

export const taskReducer = (state, action) => {
  let newState;

  switch (action.type) {
    case 'ADD':
      return [...state, action.payload];
    case 'DELETE_ALL':
      return []
    case 'DELETE_UNIQUE':
      return state.filter(task => task.id !== action.payload.id);
    case 'CHECK':
      newState = [...state]
      newState.map((task) => {
        if (task.id === action.payload.id) {
          task.checked = action.payload.check
        }
      })
      return newState
    case 'SAVE':
      newState = [...state]
      console.log({action})
      newState.map((task) => {
        if (task.id === action.payload.taskId) {
          task.title = action.payload.title
          task.estimated_time = action.payload.estimated_time && action.payload.estimated_time
          task.edit = action.payload.edit
          task.description = action.payload.description
        }
      })
      return newState
    case 'EDIT':
      newState = [...state]
      newState.map((task) => {
        if (task.id === action.payload.id) {
          task.edit = action.payload.edit
        }
      })
      return newState
    case 'REORDER':
      return action.payload.data
    case 'POMODOROS_SPENT':
      newState = [...state]
      newState.map((task) => {
        if (task.id === action.payload.id) {
          task.edit = action.payload.edit
        }
      })
      return newState
    default:
      return state
  }
};


export const TaskContextProvider = ({ children }) => {
  const [tasks, dispatch] = useReducer(taskReducer, [{
    title: "oi",
    description: "asd",
    id: 1,
  }])
  const [selectedTask, setSelectedTask] = useState({})

  return (
    <TaskContext.Provider
      value={{
        tasks,
        dispatch,
        selectedTask,
        setSelectedTask

      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export function useTaskContext() {
  return useContext(TaskContext);
}

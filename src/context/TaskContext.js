import React, { useMemo } from "react";
import { useReducer } from "react";
import { createContext, useState, useContext } from "react";

const TaskContext = createContext();

export const taskReducer = (state, action) => {
  let newState;

  switch (action.type) {
    case 'ADD':
      const newTask = action.payload.task;
      const insertIndex = action.payload.index + 1;
      
      newState = [
        ...state.slice(0, insertIndex),
        newTask,
        ...state.slice(insertIndex),
      ];
      localStorage.setItem('tasks', JSON.stringify(newState));
      return newState;
    case 'DELETE_ALL':
      localStorage.removeItem('tasks');
      return [];
    case 'DELETE_UNIQUE':
      newState = state.filter(task => task.id !== action.payload.id);
      localStorage.setItem('tasks', JSON.stringify(newState));
      return newState;
    case 'REORDER':
      localStorage.setItem('tasks', JSON.stringify(action.payload.data));
      return action.payload.data;
    case 'REORDER_TO_LAST':
      const taskId = action.payload.id;
      const taskToMove = state.find(task => task.id === taskId);
      
      newState = state.filter(task => task.id !== taskId);
      newState.push(taskToMove);

      localStorage.setItem('tasks', JSON.stringify(newState));
      return newState;
    case 'CHECK':
        const { id, check } = action.payload;
  
        newState = state.map(task => {
          if (task.id === id) {
            return { ...task, checked: check };
          }
          return task;
        });
  
        localStorage.setItem('tasks', JSON.stringify(newState));
        return newState;
    default:
      return state;
  }
};



export const TaskContextProvider = ({ children }) => {
  const [tasks, dispatch] = useReducer(taskReducer, [])
  
  useMemo(() => {
    const storedTasks = localStorage.getItem('tasks');
    
    if (storedTasks) {
      dispatch({ type: 'REORDER', payload: { data: JSON.parse(storedTasks) } });
    }
  }, []);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        dispatch,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export function useTaskContext() {
  return useContext(TaskContext);
}

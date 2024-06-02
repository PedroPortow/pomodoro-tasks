import React, { useMemo } from "react";
import { useReducer } from "react";
import { createContext, useContext } from "react";
import { v4 as uuidv4 } from 'uuid';

export const ACTIONS = {
  ADD_TASK: 'ADD_TASK',
  UPDATE_TASK: 'UPDATE_TASK',
  REMOVE_TASK: 'REMOVE_TASK',
  CLEAR_TASKS: 'CLEAR_TASKS',
  CHECK: 'CHECK',
  REORDER: 'REORDER'
}

const TaskContext = createContext();

const addToLocalStorage = (key, state) => {
  localStorage.setItem(key, JSON.stringify(state));
}

const buildNewTask = ({ id = uuidv4() }) => ({
  id,
  title: '',
  checked: false
})

export const taskReducer = (state, { type, payload }) => {
  let newState;

  switch (type) {
    case ACTIONS.ADD_TASK:
      const insertIndex = payload.index;


      newState = [
        ...state.slice(0, insertIndex),
       buildNewTask({ id: payload.id }),
        ...state.slice(insertIndex),
      ];

      addToLocalStorage('tasks', newState);

      return newState;

    case ACTIONS.UPDATE_TASK:
      newState = state.map(task =>
        task.id === payload.id ? { ...task, ...payload.updates } : task
      );

      addToLocalStorage('tasks', newState);
      return newState;

    case ACTIONS.REMOVE_TASK:
      newState = state.filter(task => task.id !== payload.id);
      addToLocalStorage('tasks', newState);
      return newState;

    case ACTIONS.CLEAR_TASKS:
      newState = [];
      addToLocalStorage('tasks', newState);
      return newState;

    case ACTIONS.CHECK:
      newState = state.map(task =>
        task.id === payload.id ? { ...task, checked: payload.check } : task
      );
      addToLocalStorage('tasks', newState);
      return newState;

    case ACTIONS.REORDER:
      newState = payload.data;

      addToLocalStorage('tasks', newState);
      return newState;

    default:
      return state;
  }
};

export const TaskContextProvider = ({ children }) => {
  const [tasks, dispatch] = useReducer(taskReducer, []);

  // useMemo(() => {
  //   const storedTasks = localStorage.getItem('tasks');
  //   if (storedTasks) {
  //     dispatch({ type: ACTIONS.REORDER, payload: { data: JSON.parse(storedTasks) } });
  //   }
  // }, []);

  return (
    <TaskContext.Provider value={{ tasks, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

export function useTaskContext() {
  return useContext(TaskContext);
}

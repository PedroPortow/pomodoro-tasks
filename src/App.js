import { useState } from 'react';
import './App.scss';
import { TaskContextProvider } from './context/TaskContext';
import { ThemeContextProvider } from './context/ThemeContext';
import {Pomodoro} from './pages/Pomodoro/Pomodoro.js'

const App = () => {

  return (
    <TaskContextProvider>
      <ThemeContextProvider>
        <Pomodoro />
      </ThemeContextProvider>
    </TaskContextProvider>
  );
}

export default App;

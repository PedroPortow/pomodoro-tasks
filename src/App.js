import { useState } from 'react';
import './App.scss';
import { TaskContextProvider } from './context/TaskContext';
import { ThemeContextProvider } from './context/ThemeContext';
import {Pomodoro} from './pages/Pomodoro/Pomodoro.js'
import { ApplicationContextProvider,  } from './context/ApplicationContext';

const App = () => {
  return (
    <ApplicationContextProvider>
      <TaskContextProvider>
        <ThemeContextProvider>
          <Pomodoro />
        </ThemeContextProvider>
      </TaskContextProvider>
    </ApplicationContextProvider>
  );
}

export default App;

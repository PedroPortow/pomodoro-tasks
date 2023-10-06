import { useState } from 'react';
import './App.scss';
import { TaskContextProvider } from './context/TaskContext';
import { ThemeContextProvider } from './context/ThemeContext';
import { Home } from './pages/Home/Home.js'
import { ApplicationContextProvider,  } from './context/ApplicationContext';

const App = () => {
  return (
    <ApplicationContextProvider>
      <TaskContextProvider>
        <ThemeContextProvider>
          <Home />
        </ThemeContextProvider>
      </TaskContextProvider>
    </ApplicationContextProvider>
  );
}

export default App;

import { useState } from 'react';
import './App.scss';
import { TaskContextProvider } from './context/TaskContext';
import { ThemeContextProvider } from './context/ThemeContext';
import { Home } from './pages/Home/Home.js'
import { ApplicationContextProvider,  } from './context/ApplicationContext';
import Login from './pages/Login/Login';
import { UserContextProvider } from './context/UserContext';
import Routes from './routes';

const App = () => {

  return (
    <UserContextProvider>
      <ApplicationContextProvider>
        <TaskContextProvider>
          <ThemeContextProvider>
            <Routes />
          </ThemeContextProvider>
        </TaskContextProvider>
      </ApplicationContextProvider>
    </UserContextProvider>

  );
}

export default App;

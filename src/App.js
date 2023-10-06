import { useState } from 'react';
import './App.scss';
import { TaskContextProvider } from './context/TaskContext';
import { ThemeContextProvider } from './context/ThemeContext';
import { Home } from './pages/Home/Home.js'
import { ApplicationContextProvider,  } from './context/ApplicationContext';
import Login from './pages/Login/Login';
import { UserContextProvider } from './context/UserContext';
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom";

const App = () => {

  return (
    <UserContextProvider>
      <ApplicationContextProvider>
        <TaskContextProvider>
          <ThemeContextProvider>
             <Routes>
              <Route path="/login" exact component={Login} />
              <ProtectedRoute>
                <Route path="/home" component={Home} />
              </ProtectedRoute>
            </Routes>
          </ThemeContextProvider>
        </TaskContextProvider>
      </ApplicationContextProvider>
    </UserContextProvider>

  );
}

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token')

  if(!token){
    return <Navigate to="/login" replace />
  }

  return children
}

export default App;

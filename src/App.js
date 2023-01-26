import { useState } from 'react';
import './App.scss';
import { ThemeContextProvider } from './context/ThemeContext';
import {Pomodoro} from './pages/Pomodoro/Pomodoro.js'

const App = () => {

  return (
      <ThemeContextProvider>
        <Pomodoro />
      </ThemeContextProvider>
  );
}

export default App;

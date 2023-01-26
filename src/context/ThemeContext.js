import React from "react";
import { createContext, useState, useContext } from "react";

const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState("light")

  let isThemeDark = theme === 'dark'
 
  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        isThemeDark
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export function useThemeContext() {
  return useContext(ThemeContext);
}
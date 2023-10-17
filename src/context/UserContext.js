import axios from "axios";
import React, { useEffect } from "react";
import { createContext, useState, useContext } from "react";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({})
  const [token, setToken] = useState(localStorage?.getItem('token'))


  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      localStorage.setItem('token',token);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem('token')
    }
  }, [token]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export function useUserContext() {
  return useContext(UserContext);
}

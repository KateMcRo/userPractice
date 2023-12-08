import React, { useContext, useEffect, useReducer } from "react";
import { AppStateContext, appStateReducer, initialState } from "../appState";

export const AppStateProvider = ({ children }) => {
  const [appState, dispatch] = useReducer(appStateReducer, initialState);

  // Effect Hook Syntax: useEffect(() => {}, [])
  useEffect(() => {
    async function checkToken() {
      console.log("This is where we check the token");
      const token = JSON.parse(localStorage.getItem("authToken"));
      console.log(token);
      const response = await fetch("", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      if (response.ok) {
        const {
          valid: { data },
        } = await response.json;
        dispatch({
          type: "SET_USER",
          payload: {
            id: data.id,
            firstName: data.firstName,
            email: data.email,
            loggedIn: data.loggedIn,
          },
        });
      }
    }
    checkToken();
  }, []);
  return (
    <AppStateContext.Provider value={[appState, dispatch]}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => useContext(AppStateContext);

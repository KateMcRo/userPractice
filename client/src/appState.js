import { createContext } from "react";

const initialState = {
  id: "",
  firstName: "",
  email: "",
  loggedIn: false,
};

const AppStateContext = createContext(initialState);

// Create reducer
const appStateReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER": {
      return {
        ...state,
        id: action.payload.id,
        firstName: action.payload.firstName,
        email: action.payload.email,
        loggedIn: action.payload.loggedIn,
      };
    }
    case "SET_LOGGED_OUT": {
      return initialState;
    }
    default:
      return initialState;
  }
};

export { AppStateContext, appStateReducer, initialState };

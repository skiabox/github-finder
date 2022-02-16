import { createContext, useReducer } from 'react';
import alertReducer from './AlertReducer';

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const intialState = null;

  //use the useReducer hook to get the dispatch function and the state object returned by the reducer
  const [state, dispatch] = useReducer(alertReducer, intialState);

  // Set an alert function
  const setAlert = (msg, type) => {
    dispatch({
      type: 'SET_ALERT',
      payload: { msg, type }
    });

    setTimeout(() => dispatch({ type: 'REMOVE_ALERT' }), 3000);
  };

  //when we use the alert function in a component we give access to the {alert: state} object too, with the state that we defined -> {msg, type}
  //so we can show this alert wherever we want (we can use it in any component we want)
  return (
    <AlertContext.Provider
      value={{
        alert: state,
        setAlert
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContext;

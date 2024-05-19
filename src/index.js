import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import FlightStore from './store/FlightStore';
import PassengerStore from './store/PassengerStore';
import RegisterStore from './store/RegisterStore';

export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Context.Provider value={{
      flight: new FlightStore(),
      passenger: new PassengerStore(),
      registration: new RegisterStore(),
    }}>
      <App />
    </Context.Provider>
  </React.StrictMode>
);
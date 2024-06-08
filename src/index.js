import React from 'react';
import ReactDOM from 'react-dom/client';
import { ListProvider } from './context/ListContext';
import './index.css';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ListProvider>
      <App />
    </ListProvider>
  </React.StrictMode>
);


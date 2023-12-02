import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BookProvider } from './context/BooksContext';
import { ToastContainer } from 'react-toastify';
import '../node_modules/react-toastify/dist/ReactToastify.min.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BookProvider>
    <App />
    <ToastContainer />
  </BookProvider>
);
import React from 'react';
import './style.scss';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap-icons/font/bootstrap-icons.min.css';
import Header from './components/Header';
import Add from './components/Add';
import List from './components/List'

const App = () => {


  return (
    <div className='container'>
      <Header />
      <Add />
      <List />
    </div>
  );
}

export default App;
import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
//importar los compoents 
import LandingPage from './views/landingPage/LandingPage';
import About from './views/about/About';
import Home from './views/home/Home';
import Detail from './views/detail/Detail';
import Create from './views/create/Create';

import './App.css';

//BrowserRouter  debería estar en el index.js 
//Browser Router es para que exista la funcionalidad de navegacion 

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path= '/' Component={LandingPage}></Route>
        <Route exact path= '/home' Component={Home}></Route>
        <Route path='/dog/:id' Component={Detail}></Route>
        <Route path='/dog' Component={Create}></Route>
        <Route path='/about' Component={About}></Route>
        
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;

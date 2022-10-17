import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';

import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import SignIn from './Components/SignIn/SignIn';
import Signup from './Components/SignUp/SignUp';
import Header from "./Components/Header/Header"
import { ContextProvider } from './Components/ContextApi/context';
const root = ReactDOM.createRoot(document.getElementById('root'));
const token = localStorage.getItem("token");

root.render(

  <React.StrictMode>
    <BrowserRouter>
      <ContextProvider>
        <Routes>
          <Route path='/' element={<SignIn />} />
          <Route path='/register' element={<Signup />} />
          <Route path='/contacts' element={
            token ? (<Header />) : (<Navigate replace to={"/"} />)} />
        </Routes>
      </ContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();


import React from 'react';
import './App.css';
import Layout from "./UI/Layout";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./UI/Pages/Login/Login";
import Home from "./UI/Pages/Home";
import NotFound from "./UI/Pages/NotFound";


function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index element={<Home/>}/>
            <Route path="login" element={<Login/>}/>
            <Route path="*" element={<NotFound/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

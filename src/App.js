// import './App.css';
import { BrowserRouter, Route, Routes, Navigate, Outlet } from "react-router";
import Login from "./views/Login";
import Dog from "./views/Dog";
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { axiosInstance } from "./api/util";

const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); 

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axiosInstance.get("dogs/breeds")
        setIsAuthenticated(true); 
      } catch (error) {
        setIsAuthenticated(false); 
      }
    };
    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};




function App() {
  return (
    <BrowserRouter>
    <Routes>
      
      <Route path="login" element={<Login/>}/>
      <Route path="/" element={<ProtectedRoute/>}>
        <Route index element={<Dog/>}/>
      </Route>
      <Route path="*" element={<Login/>}/>
      
    </Routes>
    </BrowserRouter>
  )
}

export default App;


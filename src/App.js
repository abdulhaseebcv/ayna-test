import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './Components/Login/Login'
import Signup from './Components/Signup/Signup'
import './App.css'
import HomePage from './Pages/HomePage'
import ProtectedRoute from './Utils/ProtectedRoute'
import NotFoundPage from './Pages/ErrorPage';

function App() {
  return (
     <div className="App">
       <Routes>
        {/* Public Routes */}
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />

        {/* Protected Route */}
        <Route path='/' element={<ProtectedRoute><HomePage /></ProtectedRoute>} />

        {/* 404 errors */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
     </div>
  )
}

export default App
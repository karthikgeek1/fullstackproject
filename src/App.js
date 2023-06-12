import React from 'react'
import Login from './components/login/Login'
import Register from './components/register/Register'
import { Routes, Route } from 'react-router-dom'
import Home from './components/home/Home'
import LoginState from './components/context/LoginState'
import Forgot from './components/forgotpassword/Forgot'
const App = () => {
  
  return (
    <LoginState>
      <Routes>
        <Route path='/' element={<Register />} />
        <Route path='/forgot' element={<Forgot/>} />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </LoginState>
  )
}

export default App
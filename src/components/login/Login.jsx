import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import './Login.css'
import axios from 'axios'
import Logincontext from '../context/Logincontext'
const Login = () => {
    const navigation = useNavigate()
    // const [user, setUser] = useState({
    //     email: "",
    //     password: ""
    // })
    const { user, setUser } = useContext(Logincontext)

    const handleChange = (e) => {
        console.log(e.target)
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const login = () => {
        const { email, password } = user;
        if (email && password) {
            axios.post('https://myfullstackapu.onrender.com/login', user).then((res) => {
                console.log(res)
                alert('success')
                navigation('/home')
            }).catch(err => {
                console.log(err)
                alert('authentication error')
            })
        }
        else {
            alert('no details entered')
        }
    }

    return (
        <div className='login-wrapper'>
            <div className='Login-form'>
                <h1>Login page</h1>
                <div>
                    <input name='email' type='text' value={user.email} onChange={handleChange} placeholder='enter your email' />
                </div>
                <div>
                    <input name='password' type='password' value={user.password} onChange={handleChange} placeholder='enter your password' />
                </div>
                <div>
                    <button className='btn' onClick={login}>Login</button>
                </div>
                <div>or</div>
                <div>
                    <Link to='/'>
                        <button className='btn'>register</button>
                    </Link>
                </div>
                <Link to='/forgot'>
                    <p style={{ color: 'white' }}>forgot password</p>
                </Link>
            </div>
        </div>
    )
}
export default Login

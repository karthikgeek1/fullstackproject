import { useState } from "react"
import React from 'react'
import './Register.css'
import Login from "../login/Login"
import axios from 'axios'
import { Link, useNavigate, useNavigation } from "react-router-dom"

const Register = () => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        confirm: ""
    })
    const navigation = useNavigate()
    const handleChange = (e) => {
        console.log(e.target)
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const register = () => {
        const { name, email, password, confirm } = user;
        if (email && name && password && (password == confirm)) {
            axios.post('https://myfullstackapu.onrender.com/register', user).then(res => console.log(res)).catch(err => alert(err))
            alert('posted')
            navigation('/login')
        }
        else {
            alert('invalid input')
        }
    }

    return (
        <div className="background">
            <div className="register-form">
                <h1>register form</h1>
                <div>
                    <input name="name" type='text' value={user.name} onChange={handleChange} placeholder='name' />
                </div>
                <div>
                    <input name="email" type='text' value={user.email} onChange={handleChange} placeholder='email' />
                </div>
                <div>
                    <input name="password" type='password' value={user.password} onChange={handleChange} placeholder='password' />
                </div>
                <div>
                    <input name="confirm" type='password' value={user.confirm} onChange={handleChange} placeholder='confirm password' />
                </div>
                <div>
                    <button className="btn" onClick={register}>register</button>
                </div>
                <div>or</div>
                <div>
                    <Link to='/login'>
                        <button className="btn">login</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Register
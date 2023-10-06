import React, { useState } from 'react'
import "./Login.scss"
import { apiLogin } from '../../services/login'
import axios from 'axios';
import { useUserContext } from '../../context/UserContext';

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState([])
  const { user, setUser } = useUserContext()

  const handleLogin = () => {
    if(!validateFields)
      return

    const params = {
      user:{
        email: "oi@gmail.com",
        password: "123456"
      }
    };

    axios.post('http://localhost:3001/login', params)
      .then(res => {
        setUser(res.data.user)
        localStorage.setItem('token',res.headers.get("Authorization"))
        window.location.href = ""
      })
      .catch(error => {
        console.log(error)
      })

  }

  const validateFields = () => {
    return true
  }

  return (
    <div className='login-wrapper'>
      <div className='left-container'>
        <div className='brand-name-wrapper'>
          <h1>PomoTasks</h1>
        </div>
        <div className='login-fields-wrapper'>
          <div className='top-texts-wrapper d-flex f-col'>
            <h1 className='main-text'>Welcome back</h1>
            <h1 className='sub-text'>Lorem ipsum Lorem iopsum loreremrelorem</h1>
          </div>
          <div className='input-fields-wrapper d-flex f-col'>
            <input
              type="email"
              className="form-input"
              placeholder="Enter your email adress"
              onChange={e => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="form-input"
              placeholder="Enter your password"
              onChange={e => setPassword(e.target.value)}
            />
            <div className='d-flex f-row js-space-between'>
              <div className='d-flex f-row gap-4'>
                <input type='checkbox' className='task-checkbox' />
                <p className='color-gray'>Remember me</p>
              </div>
              <p className='color-blue cursor-pointer'>Forgot password?</p>
            </div>
          </div>
          <div className='buttons-wrapper'>
            <button className='btn-blue' onClick={handleLogin}>Sign in</button>
          </div>
        </div>
      </div>
      <div className='right-container'>

      </div>
    </div>
  )
}

export default Login

import React, { useState } from 'react'
import './CompanyLogin.css'
import { login } from './Api'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

function CompanyLogin() {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [loggedIn, setLoggedIn] = useState(false);
    const dispatch=useDispatch()
    async function adminlogin(){
        await login({email,password},dispatch)
        setLoggedIn(true);
    }
    return (
        <div>
        <div className="login-page">
      <div className="login-form">
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className='buttons' onClick={adminlogin}>Login</button>
        <p>You want to go back <Link to={'/'}>click</Link></p>
      </div>
      {loggedIn && (
        <div className="welcome">
          <h2>Welcome, {email}!</h2>
        </div>
      )}
   
    </div>
   
        </div>
    )
}

export default CompanyLogin
import React, { useState } from 'react'
import './addCompany.css'
import { Link } from 'react-router-dom'
import { Addcompany} from '../Company/Api'
import UserFooter from '../Pages/UserFooter'
import AdminNav from './AdminNav'

function AddCompany() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  async function Add() {
    await Addcompany({name, email, password})
  }
  return (
    <div>
    <div className='navbarhomeadmin'>
        <AdminNav/>
        </div>
        <div className='main-navgap' style={{marginTop:"100px"}}>
    
    <div class="signup-form">
      <form action="/examples/actions/confirmation.php" method="post">
        <h2>Sign Up</h2>
        <div class="form-group">
          <input type="text" class="form-control" name="username" placeholder="Company Name" required="required" onChange={(e) => setName(e.target.value)} />
        </div>
        <div class="form-group">
          <input type="email" class="form-control" name="email" placeholder="Email Address" required="required" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div class="form-group">
          <input type="password" class="form-control" name="password" placeholder="Password" required="required" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div class="form-group">
          <button type="submit" class="btn-primary btn-lg" style={{color:"black",backgroundColor:"gray"}} onClick={Add}>Add</button>
        </div>
      </form>
      <div class="text-center">You want to go back? <Link to={'/Admin'}>click</Link></div>
    </div>
    <UserFooter/>
    </div>
    </div>
  )
}

export default AddCompany
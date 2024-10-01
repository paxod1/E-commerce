import React, { useState } from 'react'
import './AdminLogin.css'
import { loginData } from './Api'
import { useDispatch } from 'react-redux'
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  async function login() {
    await loginData({ email, password }, dispatch)
  }
  return (
    <>

     
        
      <MDBContainer fluid className="p-3 my-5">

        <MDBRow>
           <h3>Admin Login</h3>
          <MDBCol col='10' md='6'>
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" class="img-fluid" alt="Phone image" />
          </MDBCol>
          

          <MDBCol col='4' md='6'>

            
            <MDBInput wrapperClass='mb-4' label='Email address' id='formControlLg' type='email' size="lg" onChange={(e) => setEmail(e.target.value)} />
            <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg2' type='password' size="lg" onChange={(e) => setPassword(e.target.value)} />

            <div className="d-flex justify-content-between mx-4 mb-4">
              <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
             
            </div>

            <div className='text-center text-md-start mt-4 pt-2'>
              <button size='lg' style={{ border: 'black solid 1px', borderRadius: '5px' }} onClick={login}>Login</button>
              <p className="small fw-bold mt-2 pt-1 mb-2">Is you from a company? click to company <Link to={'/Company'}>login</Link>  </p>

            </div>

          </MDBCol>

        </MDBRow>

      </MDBContainer>


    </>
  )
}

export default AdminLogin
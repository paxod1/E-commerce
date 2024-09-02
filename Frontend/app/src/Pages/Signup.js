import React, { useState } from 'react'
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,

}
  from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom'
import { SignupData } from '../api';


function Signup() {

  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  async function register() {
    try{
      SignupData({ firstname, lastname, email, password })
    }catch(err){
      console.log(err)
    }
    
  }


  return (
    <div> <MDBContainer fluid>

      <MDBCard className='text-black m-5' style={{ borderRadius: '25px' }}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

              <p classNAme="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

              <div className="d-flex flex-row align-items-center mb-4 ">
                <MDBIcon fas icon="user me-3" size='lg' />
                <MDBInput label='First name' id='form1' type='text' className='w-100' onChange={(e) => setFirstname(e.target.value)} />
              </div>
              <div className="d-flex flex-row align-items-center mb-4 ">
                <MDBIcon fas icon="user me-3" size='lg' />
                <MDBInput label='Last name' id='form4' type='text' className='w-100' onChange={(e) => setLastname(e.target.value)} />
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="envelope me-3" size='lg' />
                <MDBInput label='Your Email' id='form2' type='email' onChange={(e) => setEmail(e.target.value)} />
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="lock me-3" size='lg' />
                <MDBInput label='Password' id='form3' pattern="(?=.\d)(?=.[a-z])(?=.*[A-Z]).{8,}" type='password' onChange={(e) => setPassword(e.target.value)} />
              </div>
              <button size='lg' onClick={register} style={{border:'black solid 1px',borderRadius:'5px'}}>Register</button>
              <p className="small fw-bold mt-2 pt-1 mb-2"> Have an account? <Link to={'/'}><a href="#!" className="link-danger">Login</a></Link></p>

            </MDBCol>

            <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
              <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid />
            </MDBCol>

          </MDBRow>
        </MDBCardBody>
      </MDBCard>

    </MDBContainer>
    </div>
  )
}

export default Signup
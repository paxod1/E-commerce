import React, { useState } from 'react'
import './Login.css'
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom'
import { loginData } from '../api';
import { useDispatch } from 'react-redux'


function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    async function login() {
        loginData({ email, password }, dispatch)
    }
    return (
        <div>
            <MDBContainer fluid className="p-3 my-5">

                <MDBRow>

                    <MDBCol col='10' md='6'>
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" class="img-fluid" alt="Phone image" />
                    </MDBCol>

                    <MDBCol col='4' md='6'>


                        <MDBInput wrapperClass='mb-4' label='Email address' id='formControlLg' type='email' size="lg" onChange={(e) => setEmail(e.target.value)} />
                        <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg2' pattern="(?=.\d)(?=.[a-z])(?=.*[A-Z]).{8,}" type='password' size="lg" onChange={(e) => setPassword(e.target.value)} />

                        <div className="d-flex justify-content-between mx-4 mb-4">
                            <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
                            <a href="!#">Forgot password?</a>
                        </div>

                        <div className='text-center text-md-start mt-4 pt-2'>
                            <button size='lg' onClick={login} style={{ border: 'black solid 1px', borderRadius: '5px' }}>Login</button>
                            <p className="small fw-bold mt-2 pt-1 mb-2">Don't have an account? <Link to={'/Signup'}>signup</Link> </p>
                            <p className="small fw-bold mt-2 pt-1 mb-2"> <Link to={'/Admin'}>or Admin</Link> </p>

                        </div>

                    </MDBCol>

                </MDBRow>

            </MDBContainer>
        </div>
    )
}

export default Login
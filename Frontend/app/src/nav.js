import React, { useEffect, useState } from 'react'
import { useDispatch } from "react-redux";
import { LogoutData } from './Redux/LoginSlice';
import { Link } from 'react-router-dom';
import './nav.css';
import { IoMdLogOut } from "react-icons/io";
import { IoIosHome } from "react-icons/io";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { IoLogoFoursquare } from "react-icons/io";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { BsBagCheckFill } from "react-icons/bs";



function Nav1() {


  const [openBasic, setOpenBasic] = useState(false);
  const dispatch = useDispatch()
  function logout() {
    dispatch(LogoutData())
  }
  return (
    <>       
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Container>
        <Navbar.Brand href="#home"> <p><IoLogoFoursquare />amous </p></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          <p style={{color:"#5591b7"}}>mens collections</p>
            <Nav.Link href="#features"></Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="#deets"> <Link to={'/'} className='nav-link' style={{color:"black"}}><IoIosHome  />Home</Link></Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
            <Link to={'/orders'} className='nav-link' style={{color:"black"}}><BsBagCheckFill />Order</Link>
            </Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
            <Link to={'/'} className='nav-link' style={{color:"black"}} onClick={logout}><IoMdLogOut />Logout</Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>              
    </>


  )
}

export default Nav1
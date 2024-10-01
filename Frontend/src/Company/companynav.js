import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { companyLogutdata } from '../Redux/CompanySlice';
import { IoMdLogOut } from "react-icons/io";
import { IoIosHome } from "react-icons/io";
import { BsBagCheckFill } from "react-icons/bs";
import { IoLogoFoursquare } from "react-icons/io";

function CompanyNav() { 
    const dispatch = useDispatch();
    
    function logout() {
        dispatch(companyLogutdata());
    }

    return (
        <>       
            <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
                <Container>
                    <Navbar.Brand href="#home">
                        <p><IoLogoFoursquare />amous</p>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <p style={{color:"#5591b7"}}>Company</p>
                            <Nav.Link href="#features"></Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link href="#deets">
                                <Link to={'/Company'} className='nav-link' style={{color:"black"}}>
                                    <IoIosHome />Home
                                </Link>
                            </Nav.Link>
                            <Nav.Link eventKey={2} href="#memes">
                                <Link to={'/CompanyProduct'} className='nav-link' style={{color:"black"}}>
                                    <BsBagCheckFill /> Added Products
                                </Link>
                            </Nav.Link>
                            <Nav.Link eventKey={2} href="#memes">
                            <Link to={'/CompanyOrders'} className='nav-link' style={{color:"black"}}>
                                <BsBagCheckFill /> orders
                            </Link>
                        </Nav.Link>
                            <Nav.Link eventKey={2} href="#memes">
                                <Link to={'/Company'} className='nav-link' style={{color:"black"}} onClick={logout}>
                                    <IoMdLogOut />Logout
                                </Link>
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>              
        </>
    )
}

export default CompanyNav;

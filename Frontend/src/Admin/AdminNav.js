import React, { useState } from 'react'
import './AdminNav.css'
import { CgProfile } from "react-icons/cg";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import { IoIosHome } from "react-icons/io";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { FaCartPlus } from "react-icons/fa";
import { IoLogoFoursquare } from "react-icons/io";
import { TbShoppingCartUp } from "react-icons/tb";
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse,
} from 'mdb-react-ui-kit';
import { IoIosArrowDropdownCircle } from "react-icons/io";
import {AdminLogoutData} from '../Redux/Admin';

function AdminNav() {
  const [openBasic, setOpenBasic] = useState(false);
  const dispatch =useDispatch()
  function logout(){
    dispatch(  AdminLogoutData())
  }
  
  return (
    <>
      <div className='mainCont'>
        <MDBNavbar expand='lg'>
          <MDBContainer fluid>
            <MDBNavbarBrand href='#'><p><IoLogoFoursquare />amous </p></MDBNavbarBrand>
            <MDBNavbarToggler
              aria-controls='navbarSupportedContent'
              aria-expanded='false'
              aria-label='Toggle navigation'
              onClick={() => setOpenBasic(!openBasic)}>
              <IoIosArrowDropdownCircle />
            </MDBNavbarToggler>
            <MDBCollapse navbar open={openBasic}>
              <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
              <MDBNavbarItem>
                  <MDBNavbarLink href='#'><Link to={'/AdminPorfile'} class="links" > <CgProfile />Profile</Link></MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink href='#'> <Link to={'/Admin'} class="links" ><IoIosHome />Home</Link></MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink href='#'><Link to={'/Admin'}class="links"> <CgProfile />All Users</Link></MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink href='#'><Link to={'/AddCompany'} class="links" ><MdOutlineAdminPanelSettings />Add Company</Link></MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                <MDBNavbarLink href='#'><Link to={'/Allcompanys'} class="links" ><MdOutlineAdminPanelSettings />Added Companys</Link></MDBNavbarLink>
              </MDBNavbarItem>
                <MDBNavbarItem>
                <MDBNavbarLink href='#'><Link to={'/'} class="links" onClick={logout} ><IoMdLogOut />Logout </Link></MDBNavbarLink>
              </MDBNavbarItem>
              </MDBNavbarNav>
            </MDBCollapse>
          </MDBContainer>
        </MDBNavbar>
      </div>
    </>
  )
}

export default AdminNav
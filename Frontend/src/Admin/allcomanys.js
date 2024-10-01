
import React, { useEffect, useState } from 'react'
import { basicRequest } from '../AxiosCreate'

import { MDBCard, MDBListGroup, MDBListGroupItem } from 'mdb-react-ui-kit';
import { IoLogoFoursquare } from 'react-icons/io';
import './allcompamy.css'
import AdminNav from './AdminNav';
import UserFooter from '../Pages/UserFooter';

function Allcompanys() {
    const [company, setCompany] = useState({})
    useEffect(() => {
        const allcompanys = async () => {
            const result = await basicRequest.get('/company/allcompany')
            console.log(result)
            setCompany(result.data)
        }
        allcompanys()
    }, [])
    async function romovecompany(id){
        console.log(id)
        try{
          const result=await basicRequest.delete( `/company/deletecompany/${id}`)
          console.log(result)
        }catch(err){
            console.log(err)
        }
    }
    return (
        <div>
            <div className='navbarhomeadmin'>
                <AdminNav />
            </div>
            <div className='main-navgap' style={{marginTop:"100px"}}>
                {
                    company.length > 0 ? (
                        company.map((data, index) => (
                            <div class="profile-container">
                                <div class="profile-header">
                                    <h1><p><IoLogoFoursquare />amous </p></h1>
                                </div>
                                <div class="profile-content">
                                    <div class="profile-picture">
                                        <img src="https://365webresources.com/wp-content/uploads/2016/09/FREE-PROFILE-AVATARS.png" alt="Profile Picture" />
                                    </div>
                                    <div class="profile-details">
                                        <h6>Company Name:{data.name}</h6>
                                        <p>Email: {data.email}</p>
                                        <p>Member since: January 2024</p>
                                        <button onClick={()=>romovecompany(data._id)}>Remove Company</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Loading...</p>
                    )
                }
                <UserFooter />
            </div>

        </div>
    )
}

export default Allcompanys
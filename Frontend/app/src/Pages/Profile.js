import React, { useEffect, useState } from 'react'
import Nav from '../nav'
import { useSelector } from 'react-redux'
import { profileData } from '../api'
import './Profile.css';
import { Link } from 'react-router-dom';
import UserFooter from './UserFooter';


function Profile() {
    const [profile, setProfile] = useState([])
    const MyData = useSelector((state) => state.login.LoginInfo[0])
    if (MyData) {
        var ID = MyData.id
    }
    useEffect(() => {
        async function GetProileData() {
            const MyProfileData = await profileData(ID)
            setProfile(MyProfileData)
        }
        GetProileData()
    }, [])
    console.log('Profile:', profile)
    return (
        <div>
            <div className='navbarhome'>
                <Nav />
            </div>
            <div className='profileBox'>
                <p className='heading'> Profile</p>
                <p>User name:{profile && profile.firstname}</p>
                <p>Last name :{profile && profile.lastname}</p>
                <p>Email     :{profile && profile.email}</p>
                <Link className='updata' to={'/Update'}>You want to update your data?Click</Link>
            </div>
            <UserFooter />
        </div>
    )
}

export default Profile
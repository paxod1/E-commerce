import React, { useEffect, useState } from 'react'
import AdminNav from './AdminNav'
import { DeleteUser, GetAllUsers } from './Api'
import './ListOfUsers.css'
import UserFooter from '../Pages/UserFooter'
import { IoLogoFoursquare } from 'react-icons/io'

function ListOfUsers() {
  const [alldatausers, setAlldatausers] = useState([])
  useEffect(() => {
    async function allusers() {
      const Alldata = await GetAllUsers()
      setAlldatausers(Alldata);
      console.log(Alldata)
    }
    allusers()
  }, [])
  async function deleteUser(id) {
    console.log(id)
    await DeleteUser(id)
  }
  return (
    <div className='mainoflist'>
      <div className='navbarhomeadmin'>
        <AdminNav />
      </div>
      <h2>List of Users</h2>
      <div className='maindivOfProfiles'>
        {
          alldatausers.length > 0 ? (
            alldatausers.map((item, index) => (
              <div class="profile-container">
                <div class="profile-header">
                  <h1><p><IoLogoFoursquare/>amous </p></h1>
                </div>
                <div class="profile-content">
                  <div class="profile-picture">
                    <img src="https://365webresources.com/wp-content/uploads/2016/09/FREE-PROFILE-AVATARS.png" alt="Profile Picture" />
                  </div>
                  <div class="profile-details">
                    <h6>First name: {item.firstname}</h6>
                    <p>Last name: {item.lastname}</p>
                    <p>Email: {item.email}</p>
                    <p><p className='Heading'>Admin can delete User account</p></p>
                    <button onClick={() => deleteUser(item._id)}>Remove Admin</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Loading...</p>
          )
        }
      </div>
      <UserFooter />
    </div>
  )
}

export default ListOfUsers
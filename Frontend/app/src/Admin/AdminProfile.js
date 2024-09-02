import React, { useEffect, useState } from 'react'
import './AdminProfile.css'
import { useSelector } from 'react-redux'
import { AdminprofileData } from './Api'
import AdminNav from './AdminNav'
import { Link } from 'react-router-dom'
import UserFooter from '../Pages/UserFooter'


function AdminProfile() {
  const [profile, setProfile] = useState('')
  const MyData = useSelector((state) => state.admin.AdminLoginInfo[0])
  if (MyData) {
    var Id = MyData.id
  }
  useEffect(() => {
    async function GetProfile() {
      const MyProfileData = await AdminprofileData(Id)
      setProfile(MyProfileData)
      console.log(MyProfileData)
    }
    GetProfile()
  }, [])
  return (
    <div>
      <div className='navbarhomeadmin'>
        <AdminNav />
      </div>
      <div className="page-content page-container" id="page-content" style={{marginTop:'80px'}}>
        <div className="padding">
          <div className="row container d-flex justify-content-center">
            <div className="col-xl-6 col-md-12">
              <div className="card user-card-full">
                <div className="row m-l-0 m-r-0">
                  <div className="col-sm-4 bg-c-lite-green user-profile">
                    <div className="card-block text-center text-white">
                      <div className="m-b-25">
                        <img
                          src="https://img.icons8.com/bubbles/100/000000/user.png"
                          className="img-radius"
                          alt="User-Profile-Image"
                        />
                      </div>
                      <h6 className="f-w-600">
                        AdminName:- {profile && profile.name}
                      </h6>
                      <i className=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                    </div>
                  </div>
                  <div className="col-sm-8">
                    <div className="card-block">
                      <h6 className="m-b-20 p-b-5 b-b-default f-w-600">
                        Haii...!! {profile && profile.name}
                      </h6>
                      <div className="row">
                        <div className="col-sm-6">
                          <h6 className="text-muted f-w-400">
                            Admin Name: {profile && profile.name}
                          </h6>

                          <h6 className="text-muted f-w-400">
                            Email:{profile && profile.email}
                          </h6>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-4">
                          <p className="m-b-10 f-w-600"></p>
                          <h6 className="text-muted f-w-400">
                          </h6>
                        </div>
                        <div className="col-sm-4">
                          <p className="m-b-10 f-w-600"></p>
                          <h6 className="text-muted f-w-400">
                            <Link className='updata' to={'/UpdateAdminProfile'}><button className="btn btn-outline-dark">Update</button></Link>
                          </h6>
                        </div>
                        <div />
                        <div />
                        <div />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <UserFooter />






    </div>
  )
}

export default AdminProfile
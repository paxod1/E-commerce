import React, { useEffect, useState } from 'react'
import Nav1 from '../nav'
import UserFooter from './UserFooter'
import './UserProfile.css'
import { Link } from 'react-router-dom'
import { profileData } from '../api'
import { useSelector } from 'react-redux'

function UserProfile() {
    const MyData = useSelector((state) => state.login.LoginInfo[0])
    if (MyData) {
      var ID = MyData.id
      
    }
    console.log(ID);

    const [profile, setProfile] = useState([])
    useEffect(() => {
      async function GetProileData() {
        const MyProfileData = await profileData(ID)
        setProfile(MyProfileData)
      }
      GetProileData()
    }, [])

    return (
        <div><Nav1 />
            <div className="page-content page-container" id="page-content">
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
                                                UserName:- {profile && profile.firstname} {profile && profile.lastname}
                                            </h6>
                                            <i className=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                                        </div>
                                    </div>
                                    <div className="col-sm-8">
                                        <div className="card-block">
                                            <h6 className="m-b-20 p-b-5 b-b-default f-w-600">
                                                Haii...!! {profile && profile.firstname} {profile && profile.lastname}
                                            </h6>
                                            <div className="row">
                                                <div className="col-sm-6">
                                                <h6 className="text-muted f-w-400">
                                                   User Name: {profile && profile.firstname} {profile && profile.lastname}
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
                                                    <Link className='updata' to={'/Update'}><button className="btn btn-outline-dark">Update</button></Link>
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

export default UserProfile
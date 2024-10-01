import React, { useEffect, useState } from 'react'
import Nav1 from '../nav'
import UserFooter from './UserFooter'
import { useSelector } from 'react-redux'
import { profileData, updateProfile } from '../api'
import { Link } from 'react-router-dom'

function UserProfileUpdate() {
    const [profile, setProfile] = useState('')

    const MyData = useSelector((state) => state.login.LoginInfo[0])
    if (MyData) {
        var ID = MyData.id
    }
    const [firstname, setFirstname] = useState()
    const [lastname, setLastname] = useState()
    const [email, setEmail] = useState()
    useEffect(() => {
        async function GetProileData() {
            const MyProfileData = await profileData(ID)
            setProfile(MyProfileData)
        }
        GetProileData()
    }, [])
    console.log('Profile:', profile)
    async function Updatedata() {
        await updateProfile({ firstname, lastname, email }, ID)
    }
    return (
        <div>
            <div>
                <Nav1 />
                <div className="container rounded bg-white mt-5">
                    <div className="row">
                        <div className="col-md-4 border-right">
                            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                                <span className="text-black-50 font-weight-bold">Update Your Profile <i className="fa fa-long-arrow-right mr-1 mb-1"></i></span>
                                <div className="m-b-25">
                                <img
                                    src="https://img.icons8.com/bubbles/100/000000/user.png"
                                    className="img-radius"
                                    alt="User-Profile-Image"
                                />
                            </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="p-3 py-5">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <div className="d-flex flex-row align-items-center back">
                                        <i className="fa fa-long-arrow-left mr-1 mb-1"></i>
                                        <Link to={'/'}><h6>Back to home</h6></Link>
                                    </div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col-md-12">
                                        <h6 className="text-muted f-w-400">
                                            First name
                                        </h6>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder={profile && profile.firstname}
                                            value={firstname}
                                            onChange={(e) => setFirstname(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col-md-12">
                                    <h6 className="text-muted f-w-400">
                                            Last name
                                        </h6>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder={profile && profile.lastname}
                                            value={lastname}
                                            onChange={(e) => setLastname(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-md-6">
                                    <h6 className="text-muted f-w-400">
                                            Email
                                        </h6>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder={profile && profile.email}
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="mt-5 text-right">
                                    <button className="btn btn-dark profile-button" type="button" onClick={Updatedata}>
                                        Save Profile
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <UserFooter />
            </div>

        </div>
    )
}

export default UserProfileUpdate
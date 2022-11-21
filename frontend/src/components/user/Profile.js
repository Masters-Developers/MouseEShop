import React, { Fragment } from 'react'
import MetaData from '../layouts/MetaData'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

export const Profile = () => {

    const { user, loading } = useSelector(state => state.auth)

  return (
    <Fragment>
            {loading ? <i className="fa fa-refresh fa-spin fa-3x fa-fw"></i> :  (
                <Fragment>
                    <MetaData title={"My Profile"} />

                    <h2 className="mt-5 ml-5">My Profile</h2>
                    <div className="row justify-content-around mt-5 user-info">
                        <div className="col-12 col-md-3">
                            <figure className='avatar avatar-profile'>
                                <img className="rounded-circle img-fluid" src={user.photo.url} alt={user.name} />
                            </figure>
                            <Link to="/myprofile/update" id="edit_profile" className="btn btn-primary btn-block my-5">
                                Edit Profile
                            </Link>
                        </div>

                        <div className="col-12 col-md-5">
                            <h4>Full Name</h4>
                            <p>{user.name}</p>

                            <h4>Email</h4>
                            <p>{user.email}</p>

                            <h4>Registration on : </h4>
                            <p>{String(user.registryDate).substring(0, 10)}</p>

                            {user.role !== 'management' && (
                                <Link to="/orders/myorders" className="btn btn-danger btn-block mt-5">
                                    My Orders
                                </Link>
                            )}

                            <Link to="/password/update" className="btn btn-primary btn-block mt-3">
                                Change Password
                            </Link>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
  )
}
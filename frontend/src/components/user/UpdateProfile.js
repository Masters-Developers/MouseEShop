import React, { Fragment, useEffect, useState } from 'react'
import MetaData from "../layouts/MetaData"
import { useNavigate } from "react-router-dom"
import { useAlert } from "react-alert"
import { useDispatch, useSelector } from "react-redux"
import { updateProfile, loadUser, fixErrors } from '../../actions/userActions'
import { UPDATE_PROFILE_RESET } from '../../constants/usersConstant'


export const UpdateProfile = () => {
    const navigate = useNavigate();
    const [name,setName] = useState("")
    const [email, setEmail] = useState("")
    const [photo, setPhoto] = useState("");
    const [photoPreview, setPhotoPreview] = useState("")
    const alert = useAlert();
    const dispatch = useDispatch();

    const { user } = useSelector(state => state.auth)
    const { error, isUpdated, loading } = useSelector(state => state.user)

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setPhotoPreview(user.photo.url)
        }

        if (error) {
            alert.error(error);
            dispatch(fixErrors());
        }
        if (isUpdated) {
            alert.success("Succesful Update Profile")
            dispatch(loadUser());

            navigate("/myprofile")

            dispatch({
                type: UPDATE_PROFILE_RESET
            })
        }
    }, [dispatch, alert, error, isUpdated,navigate,user])

    const controlSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set("name", name);
        formData.set("email", email);
        formData.set("photo", photo)

        dispatch(updateProfile(formData))
    }

    const onChange = e => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setPhotoPreview(reader.result)
                setPhoto(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0])

    }

    return (
        <Fragment>
            <MetaData title={'Update Profile'} />

            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={controlSubmit} encType='multipart/form-data'>
                        <h1 className="mt-2 mb-5">Update Profile</h1>

                        <div className="form-group">
                            <label htmlFor="email_field">Name</label>
                            <input
                                type="name"
                                id="name_field"
                                className="form-control"
                                name='name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email_field">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                name='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className='form-group'>
                            <label htmlFor='avatar_upload'>Photo</label>
                            <div className='d-flex align-items-center'>
                                <div>
                                    <figure className='avatar mr-3 item-rtl'>
                                        <img
                                            src={photoPreview}
                                            className="rounded-circle"
                                            alt="Preview View "></img>
                                    </figure>
                                </div>
                                <div className='custom-file'>
                                    <input
                                        type='file'
                                        name='photo'
                                        className='custom-file-input'
                                        id='customFile'
                                        accept='images/*'
                                        onChange={onChange}

                                    />
                                    <label className='custom-file-label' htmlFor='customFile'>
                                        Choose a picture
                                    </label>
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="btn update-btn btn-block mt-4 mb-3"
                            disabled={loading ? true : false} >Update Profile</button>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}
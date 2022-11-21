import React , {Fragment, useState, useEffect} from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import MetaData from "../layouts/MetaData";
import { registration,fixErrors } from "../../actions/userActions";
import {useNavigate} from "react-router-dom"
export const Registration =() =>{
    const navigate=useNavigate();
    const [user, setUser]= useState({
        name: "",
        email: "",
        password: "",
    })
    const {name, email, password} = user;
    const [photo, setPhoto] = useState("");
    const [photoPreview, setPhotoPreview]= useState("https://thumbs.dreamstime.com/b/default-photo-profile-icon-vector-default-photo-profile-icon-vector-social-media-user-image-vector-illustration-227787227.jpg")
    const alert= useAlert();
    const dispatch= useDispatch();
    const { isAuthenticated, error, loading } = useSelector(state => state.auth)
    useEffect(() => {
        if (isAuthenticated) {
            navigate("/")
        }
        if (error) {
            dispatch(fixErrors)
        }
    }, [dispatch, isAuthenticated, error, alert,navigate])

    const controlSubmit = (e) =>{
        e.preventDefault();

        const formData= new FormData();
        formData.set("name", name);
        formData.set("email", email);
        formData.set("password", password);
        formData.set("photo", photo)

        dispatch(registration(formData))
    }

    const onChange = e =>{
        if (e.target.name === "photo"){
            const reader = new FileReader();

            reader.onload=()=>{
                if (reader.readyState ===2){
                    setPhotoPreview(reader.result)
                    setPhoto(reader.result)
                }
            }
            reader.readAsDataURL(e.target.files[0])
        }
        else{
            setUser({ ...user, [e.target.name]: e.target.value})
        }
    }

  return (
    <Fragment>
        {loading ? <i className="fa fa-spinner fa-spin fa-3x fa-fw" aria-hidden="true"></i> : (
    <Fragment>
            <MetaData title={'Registration'} />
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={controlSubmit} encType='multipart/form-data'>
                        <h1 className="mb-3">Registration</h1>

                        <div className="form-group">
                            <label htmlFor="name_field">Name</label>
                            <input
                                type="name"
                                id="name_field"
                                className="form-control"
                                name='name'
                                value={name}
                                onChange={onChange}
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
                                onChange={onChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password_field">Password</label>
                            <input
                                type="password"
                                id="password_field"
                                className="form-control"
                                name='password'
                                value={password}
                                onChange={onChange}
                            />
                        </div>

                        <div className='form-group'>
                            <label htmlFor='photo_upload'>photo</label>
                            <div className='d-flex align-items-center'>
                                <div>
                                    <figure className='avatar mr-1 item-rtl'>
                                        <img 
                                        src={photoPreview}
                                        className="rounded-circle"
                                        alt="Preview view "></img>
                                    </figure>
                                </div>
                                <div className='custom-file'>
                                    <input
                                        type='file'
                                        name='photo'
                                        className='custom-file-input'
                                        id='customFile'
                                        accept="images/*"
                                        onChange={onChange}
                                    />
                                    <label className='custom-file-label' htmlFor='customFile'>
                                        Pick Picture
                                    </label>
                                </div>
                            </div>
                        </div>

                        <button
                            id="register_button"
                            type="submit"
                            className="btn btn-block py-3"
                            
                        >
                            Registration
                        </button>
                    </form>
                </div>
            </div>
        </Fragment>
        )}
        </Fragment>
  )
}
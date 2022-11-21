import React, { Fragment ,useEffect,useState} from "react";
import MetaData from "../layouts/MetaData";
import {Link, useNavigate} from "react-router-dom";
import { fixErrors, login } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
export const Login =() =>{
    const navigate = useNavigate();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const dispatch = useDispatch();
    const {isAuthenticated,error,loading} = useSelector(state=>state.auth);
    
    useEffect(()=>{
        if(isAuthenticated===true){
            navigate("/")
        }
        if(error){
            dispatch(fixErrors)
        }
    },[dispatch,isAuthenticated,error,navigate])
    const controlSubmit = (e) =>{
        e.preventDefault();
        dispatch(login(email,password))
    }
    return (
        <Fragment>
             {loading ? <i className="fa fa-spinner fa-spin fa-3x fa-fw" aria-hidden="true"></i> : (
            <Fragment>
            <MetaData title={"Log In"}/>
            <div className='row wrapper'>
            <div className='col-10 col-lg-5'>
                <form className='shadow-lg' onSubmit={controlSubmit}>
                    <h1 className='mb-3'>Log In</h1>
                    {/*email*/}
                    <div className='form-group'>
                        <label htmlFor='email_field'>Email</label>
                        <input type="email" id="email_field" className='form-control' value={email}  onChange={(e) => setEmail(e.target.value)}></input>
                    </div>
                     {/*password*/}
                    <div className='form-group'>
                        <label htmlFor='password_field'>Password</label>
                        <input type="password" id="password_field" className='form-control' value={password} onChange={(e) => setPassword(e.target.value)}></input>
                    </div>

                    <Link to= "/password/forgot" className='float-right mb-4'>Forgot your password?</Link>

                    {/*Log In Button*/}
                    <button id="login_button" type="submit" className='btn btn-block py-3'>Log In</button>
                    
                    {/*Register Button*/}
                    <Link to="/registration"><button id="login_button" type="submit" className='btn btn-block py-3'>Register</button></Link>
        
                </form>
            </div>
        </div>
            </Fragment>
             )}
        </Fragment>
    )
}
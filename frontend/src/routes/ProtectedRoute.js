import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { loadUser } from "../actions/userActions";

const ProtectedRoute = ({children, isManagement}) =>{
    const {isAuthenticated=false, loading=true, user} = useSelector((state)=> state.auth)
    const dispatch=useDispatch();

    useEffect(()=>{
        if(!user){
            dispatch(loadUser());
        }
    }, [dispatch,isAuthenticated, loading,user])

    if (loading) return <i class="fa fa-refresh fa-spin fa-3x fa-fw"></i>;

    if (loading===false && isAuthenticated){
        if (isManagement===true & user.role!=="management"){
            return <Navigate to="/" />;
        }
        return children;
    }
    else{
        return <Navigate to={"/login"} />;
    }
}

export default ProtectedRoute;
import axios from 'axios';
import { LOGIN_REQUEST,
    LOGIN_SUCCES,
    LOGIN_FAIL,
    FIX_ERRORS,
    REGISTRATION_USER_REQUEST,
    REGISTRATION_USER_SUCCES,
    REGISTRATION_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    NEW_PASSWORD_REQUEST,
    NEW_PASSWORD_SUCCESS,
    NEW_PASSWORD_FAIL,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL} from '../constants/usersConstant';

//Login
export const login = (email,password) => async(dispatch) =>{
    try{
        dispatch({type:LOGIN_REQUEST})
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }
        const {data} = await axios.post('/api/login',{email,password},config)

        dispatch({
            type:LOGIN_SUCCES,
            payload:data.user
        })
    }
    catch (error){
        dispatch({
            type:LOGIN_FAIL,
            payload:error.response.data.message
        })
        return error;
    }
}

export const registration = (userData) => async(dispatch) =>{
    try{
        dispatch({type:REGISTRATION_USER_REQUEST})
        const config={
            headers:{
                'Content-Type':'multipart/form-data'
            }
        }
        const {data} = await axios.post('/api/user/registration',userData,config)

        dispatch({
            type:REGISTRATION_USER_SUCCES,
            payload:data.user
        })
    }
    catch (error){
        dispatch({
            type:REGISTRATION_USER_FAIL,
            payload:error.response.data.message
        })
        return error;
    }
}
//load user
export const loadUser=()=> async(dispatch) =>{
    try{
        dispatch({type: LOAD_USER_REQUEST})
        const {data} = await axios.get("/api/myprofile")
        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data.user
        })
    }catch(error){
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response.data.message
        })
    }
}


//update User profile
export const updateProfile = (userData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PROFILE_REQUEST})

        const config={
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        const {data} = await axios.put('/api/myprofile/updateProfile', userData, config)

        dispatch({
            type: UPDATE_PROFILE_SUCCESS,
            payload: data.user
        })
    }
    catch (error) { 
        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: error.response.data.message
        })
    }
}
export default updateProfile;
//logout User
export const logout = () => async (dispatch)=>{
    try{
        await axios.get("/api/logout")
        dispatch({
            type: LOGOUT_SUCCESS,
        })
    } catch(error){
        dispatch({
            type:LOGOUT_FAIL,
            payload: error.response.data.message
        })
    }
}

//Update Password
export const updatePassword = (passwords) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PASSWORD_REQUEST})

        const config={
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const {data} = await axios.put('/api/myprofile/updatePassword', passwords, config)

        dispatch({
            type: UPDATE_PASSWORD_SUCCESS,
            payload: data.user
        })
    }
    catch (error) { 
        dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload: error.response.data.message
        })
    }
}


//forgot password) 
export const forgotPassword = (email) => async (dispatch) => {
    try {
        dispatch({ type: FORGOT_PASSWORD_REQUEST})

        const config={
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const {data} = await axios.post('/api/forgotPassword', email, config)

        dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
            payload: data.user
        })
    }
    catch (error) { 
        dispatch({
            type: FORGOT_PASSWORD_FAIL,
            payload: error.response.data.message
        })
    }
}

//Reset Password, new password
export const resetPassword = (token, passwords) => async (dispatch) => {
    try {
        dispatch({ type: NEW_PASSWORD_REQUEST})

        const config={
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const {data} = await axios.post(`/api/resetPassword/${token}`, passwords, config)

        dispatch({
            type: NEW_PASSWORD_SUCCESS,
            payload: data.user
        })
    }
    catch (error) { 
        dispatch({
            type: NEW_PASSWORD_FAIL,
            payload: error.response.data.message
        })
    }
}
export const allUsers = () => async (dispatch) => {
    try {

        dispatch({ type: ALL_USERS_REQUEST })

        const { data } = await axios.get('/api/management/allUsers')

        dispatch({
            type: ALL_USERS_SUCCESS,
            payload: data.users
        })

    } catch (error) {
        dispatch({
            type: ALL_USERS_FAIL,
            payload: error.response.data.message
        })
    }
}
// Delete user - management
export const deleteUser = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_USER_REQUEST })

        const { data } = await axios.delete(`/api/management/deleteUser/${id}`)

        dispatch({
            type: DELETE_USER_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

// Get user details - management
export const getUserDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: USER_DETAILS_REQUEST })


        const { data } = await axios.get(`/api/management/user/${id}`)

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

// Update user - management
export const updateUser = (id, userData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_USER_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/management/updateUser/${id}`, userData, config)

        dispatch({
            type: UPDATE_USER_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_USER_FAIL,
            payload: error.response.data.message
        })
    }
}
export const fixErrors = () => async (dispatch) =>{
    dispatch({
        type:FIX_ERRORS,
    })
}
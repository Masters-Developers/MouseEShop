import React, {Fragment} from 'react'
import "../../App.css"
import { Link } from "react-router-dom"
import { Search } from './Search'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { logout} from "../../actions/userActions"
const Header = () => {
    const {cartItems} = useSelector(state=>state.cart)
    const alert= useAlert();
    const dispatch= useDispatch();

    const { user, loading } = useSelector(state => state.auth)

    const logoutHandler = () =>{
        dispatch(logout());
        alert.success("Succesful Log Out")
    }
  return (
    <Fragment>
            <nav className="navbar row ">
                <div className="col-12 col-md-3">
                    <div className="navbar-brand">
                          <Link to = ""> <img src="./images/mouse.png" alt="Enterprise's Logo"/>
                          </Link>
                    </div>
                </div>
                <div className='col-12 col-md-5 mt-2 mt-md-0'>
                 {/*Search bar*/}
                 <Search />
                </div>
                <div className="col-12 col-md-4 mt-4 mt-md-0 text-center">
                    <Link to="/cart"><i className="fa fa-shopping-cart fa-2x text-white" aria-hidden="false"></i>
                    <span className="ml-1" id="cart_count">{cartItems.length}</span></Link>

                    {user ? (
                        <div className="ml-4 dropdown d-inline">
                            <Link to="#!" className="btn dropdown-toggle text-white mr-4" type="button"
                                id="dropDownMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <figure className='avatar avatar-nav'>
                                    <img
                                        src={user.photo && user.photo.url}
                                        alt={user && user.name}
                                        className="rounded-circle"></img>
                                </figure>
                                <span>{user && user.name}</span>
                            </Link>
                            <div className='dropdown-menu' aria-labelledby='dropDownMenu'>
                                {/*Preguntamos el rol de quien esta online*/}
                                {user && user.role === "management" && (
                                    <Link className="dropdown-item" to="/dashboard">Manage Items</Link>
                                )}
                                <Link className="dropdown-item" to="/myorders">My Orders</Link>
                                <Link className="dropdown-item" to="/myprofile">My Profile</Link>
                                <Link className="dropdown-item" to="/" onClick={logoutHandler}>Log Out</Link>
                            </div>
                        </div>
                    ) : !loading && <Link to="/login" className='btn ml-4' id="login_btn">Log in</Link>}
                </div>

            </nav>
        </Fragment>
  )
}

export default Header
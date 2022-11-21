import React, { Fragment,useEffect } from 'react'
import { Link } from 'react-router-dom';
import MetaData from '../layouts/MetaData'
import Sidebar from './Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import {getItemsManagement } from '../../actions/ItemsActions'
import { allOrders } from '../../actions/orderActions'
import { allUsers } from '../../actions/userActions'

export const DashBoard = () => {
    const dispatch = useDispatch();

    const { items } = useSelector(state => state.items)
    const { users } = useSelector(state => state.allUsers)
    const { orders, totalAmount} = useSelector(state => state.allOrders)

    let outOfStock = 0;
    items.forEach(item => {
        if (item.stock === 0) {
            outOfStock += 1;
        }
    })

    useEffect(() => {
        dispatch(getItemsManagement())
        dispatch(allOrders())
        dispatch(allUsers())
    }, [dispatch])
    return (
        <Fragment>
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10">
                    <h1 className="my-4">DashBoard</h1>
                    
                        <Fragment>
                            <MetaData title={'Management'} />
                            <div className="row pr-4">
                                <div className="col-xl-12 col-sm-12 mb-3">
                                    <div className="card text-white bg-primary o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Total Sales<br /> <b>${totalAmount && totalAmount.toFixed(2)}</b>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row pr-4">
                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-success o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Items<br /> <b>{items && items.length}</b></div>
                                        </div>
                                        <Link className="card-footer text-white clearfix small z-1" to="/itemsList">
                                            <span className="float-left">View Details</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>


                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-danger o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Orders<br /> <b>{orders && orders.length}</b></div>
                                        </div>
                                        <Link className="card-footer text-white clearfix small z-1" to="/management/orders">
                                            <span className="float-left">View Details</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>


                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-info o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Users<br /> <b>{users && users.length}</b></div>
                                        </div>
                                        <Link className="card-footer text-white clearfix small z-1" to="/management/users">
                                            <span className="float-left">View Details</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>

                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-warning o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Finished<br /> <b>{outOfStock}</b></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </Fragment>
                  

                </div>
            </div>

        </Fragment >
    )
}


export default DashBoard

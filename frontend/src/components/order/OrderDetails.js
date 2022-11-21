import React, { Fragment, useEffect } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, Link } from 'react-router-dom'
import { fixErrors, getOrderDetails } from '../../actions/orderActions';
import MetaData from '../layouts/MetaData'

export const OrderDetails = () => {
    const navigate=useNavigate();
    const params= useParams();
    const alert= useAlert();
    const dispatch= useDispatch();
    const {loading, error, order={}}= useSelector(state=> state.orderDetails)
    const { sendInfo, items, payInfo, user, totalPrice, state} = order

    useEffect(()=>{
        dispatch(getOrderDetails(params.id));
        if (error){
            alert.error(error)
            dispatch(fixErrors)
        }
    },[dispatch, alert, error, params.id])
    const sendDetails= sendInfo && `${sendInfo.adress}, ${sendInfo.city}, ${sendInfo.state}`

    const isPayed= payInfo && payInfo.state==="Accepted" ? true : false

  return (
    <Fragment>
            <MetaData title={'Order Details'} />

            {loading ? <i class="fa fa-refresh fa-spin fa-3x fa-fw"></i> : (
                <Fragment>
                    <div className="row d-flex justify-content-between">
                        <div className="col-12 col-lg-8 mt-5 order-details">

                            <h1 className="my-5">Order # {order._id}</h1>

                            <h4 className="mb-4">Send Information</h4>
                            <p><b>name:</b> {user && user.name}</p>
                            <p><b>Phone:</b> {sendInfo && sendInfo.phone}</p>
                            <p className="mb-4"><b>Adress:</b>{sendDetails}</p>
                            <p><b>Full Payment:</b> ${totalPrice}</p>

                            <hr />

                            <h4 className="my-4">pay</h4>
                            <p className={isPayed ? "greenColor" : "redColor"}><b>{isPayed ? "Completed Payment" : "Pending Payment"}</b></p>

                            <h4 className="my-4">Order State:</h4>
                            <p className={order.state && String(order.state).includes('Delivered') ? "greenColor" : "redColor"} ><b>{state}</b></p>

                            <h4 className="my-4">Purchased Items:</h4>

                            <hr />
                            <div className="cart-item my-1">
                                {items && items.map(itemc => (
                                    <div key={itemc.item} className="row my-5">
                                        <div className="col-4 col-lg-2">
                                            <img src={itemc.image} alt={itemc.name} height="45" width="65" />
                                        </div>

                                        <div className="col-5 col-lg-5">
                                            <Link to={`/items/${itemc.item}`}>{itemc.name}</Link>
                                        </div>

                                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                            <p>${itemc.price}</p>
                                        </div>

                                        <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                            <p>{itemc.amount} Unities(es)</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="btn ml-4" id="login_btn" onClick={() => navigate(-1)}>Back</button>
                            <hr />
                        </div>
                    </div>
                </Fragment>
            )}

        </Fragment>
  )
}

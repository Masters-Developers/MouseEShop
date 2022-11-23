import React, { Fragment, useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import MetaData from '../layouts/MetaData'
import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderDetails, updateOrder, fixErrors } from '../../actions/orderActions'
import { UPDATE_ORDER_RESET } from '../../constants/ordersConstants'

export const ProcessOrder = () => {
    const navigate = useNavigate();
    const params=useParams();

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, order = {} } = useSelector(state => state.orderDetails)
    const { sendInfo, items, payInfo, user, totalPrice, state : orderState } = order
    const { error, isUpdated } = useSelector(state => state.order)
    const [state, setState] = useState(orderState);

    const orderId = params.id;

    useEffect(() => {

        dispatch(getOrderDetails(orderId))

        if (error) {
            alert.error(error);
            dispatch(fixErrors())
        }


        if (isUpdated) {
            alert.success('Order Updated Successfuly');
            dispatch({ type: UPDATE_ORDER_RESET })
        }

    }, [dispatch, alert, error, isUpdated, orderId])


    const updateOrderHandler = (id) => {
        const formData = new FormData();
        formData.set('state', state);

        dispatch(updateOrder(id, formData))
    }

    const sendDetails = sendInfo && `${sendInfo.adress}, ${sendInfo.city}, ${sendInfo.state}`
    const isPaid = payInfo && payInfo.state === 'Accepted' ? true : false

    return (
        <Fragment>
            <MetaData title={`Proccess order # ${order && order._id}`} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        {loading ? <i class="fa fa-refresh fa-spin fa-3x fa-fw"></i> : (
                            <div className="row d-flex justify-content-around">
                                <div className="col-12 col-lg-7 order-details">

                                    <h2 className="my-5">Order # {order._id}</h2>

                                    <h4 className="mb-4">Send Information</h4>
                                    <p><b>Name:</b> {user && user.name}</p>
                                    <p><b>Phone:</b> {sendInfo && sendInfo.phone}</p>
                                    <p className="mb-4"><b>Adress: </b>{sendDetails}</p>
                                    <p><b>Total Value:</b> ${totalPrice}</p>

                                    <hr />

                                    <h4 className="my-4">Payment</h4>
                                    <p className={isPaid ? "greenColor" : "redColor"}><b>{isPaid ? "PAYMENT" : "PAYMENT PENDING"}</b></p>

                                    <h4 className="my-4">Transaction Number</h4>
                                    <p><b>{payInfo && payInfo.id}</b></p>

                                    <h4 className="my-4">Order's State:</h4>
                                    <p className={order.orderState && String(order.orderState).includes('Delivered') ? "greenColor" : "redColor"} ><b>{orderState}</b></p>



                                    <h4 className="my-4">Items Purchased:</h4>

                                    <hr />
                                    <div className="cart-item my-1">
                                        {items && items.map(itemo => (
                                            <div key={itemo.item} className="row my-5">
                                                <div className="col-4 col-lg-2">
                                                    <img src={itemo.image} alt={itemo.name} height="45" width="65" />
                                                </div>

                                                <div className="col-5 col-lg-5">
                                                    <Link to={`/items/${itemo.item}`}>{itemo.name}</Link>
                                                </div>


                                                <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                                    <p>${itemo.price}</p>
                                                </div>

                                                <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                                    <p>{itemo.amount} Unity(es)</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <hr />
                                </div>

                                <div className="col-12 col-lg-3 mt-5">
                                    <h4 className="my-4">Order's Satate</h4>

                                    <div className="form-group">
                                        <select
                                            className="form-control"
                                            name='status'
                                            value={orderState}
                                            onChange={(e) => setState(e.target.value)}
                                        >
                                            <option value="Proccessing">Proccessing</option>
                                            <option value="Send">Send</option>
                                            <option value="Deliveres">Delivered</option>
                                        </select>
                                    </div>

                                    <button className="btn btn-primary btn-block" onClick={() => updateOrderHandler(order._id)}>
                                        Update Order'r State
                                    </button>
                                </div>
                               
                            </div>
                        )}
                    </Fragment>
                    <button className="btn ml-4" id="login_btn" onClick={() => navigate(-1)}>Back</button>
                </div>
            </div>

        </Fragment>
    )
}

export default ProcessOrder
import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import uuid from "react-native-uuid"
import { fixErrors, createOrder } from '../../actions/orderActions';
import MetaData from '../layouts/MetaData';
import { useAlert } from 'react-alert';
import CheckoutSteps from './CheckOutSteps';

export const Payment = () => {
    const navigate= useNavigate();
    const alert= useAlert();
    const dispatch= useDispatch();
    const id= uuid.v4()
    const {cartItems, shippingInfo} = useSelector(state => state.cart)
    const {error} = useSelector(state => state.newOrder)

    useEffect(()=>{
        if (error){
            alert.error(error)
            dispatch(fixErrors)
        }
    },[dispatch, alert, error])

    let items=[];

    cartItems.forEach(elem =>{
        items.push({
            name: elem.name,
            amount: elem.quantity,
            image: elem.image,
            price: elem.price,
            item: elem.item
        })
    })

    const order={
        items,
        sendInfo: shippingInfo
    }

    const orderInfo= JSON.parse(sessionStorage.getItem("orderInfo"));

    if (orderInfo){
        order.itemsPrice= orderInfo.itemsPrice
        order.sendPrice=orderInfo.sendPrice
        order.tax= orderInfo.tax
        order.totalPrice= orderInfo.totalPrice
        order.payInfo={
            id:id,
            state:"Accepted"
        }
    }

    const submitHandler = async (e) =>{
        e.preventDefault();
        try{
            dispatch(createOrder(order))
            localStorage.removeItem("cartItems")
            window.alert("Orden registrated correctly")
            navigate("/success")
            window.location.reload(false)
        }catch(error){
            window.alert("the purchase was not registered ")
        }
    }

  return (
    <Fragment>
            <MetaData title={'Payment'} />

            <CheckoutSteps shipping confirmOrder payment />

            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler} >
                        <h1 className="mb-4">Card Information</h1>
                        <div className="form-group">
                            <label htmlFor="card_num_field">Card Number</label>
                            <input
                                type="number"
                                id="card_num_field"
                                className="form-control"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="card_exp_field">Expiration Date</label>
                            <input
                                type="text"
                                id="card_exp_field"
                                className="form-control"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="card_cvc_field">CVC</label>
                            <input
                                type="number"
                                id="card_cvc_field"
                                className="form-control"
                            />
                        </div>


                        <button
                            id="pay_btn"
                            type="submit"
                            className="btn btn-block py-3"
                        >
                            Pay ${` - ${orderInfo && orderInfo.totalPrice}`}
                        </button>

                    </form>
                </div>
            </div>

        </Fragment>

  )
}
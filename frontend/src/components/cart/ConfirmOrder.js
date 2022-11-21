import React, { Fragment } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate , Link} from 'react-router-dom'
import MetaData from '../layouts/MetaData'
import CheckoutSteps from './CheckOutSteps';

export const ConfirmOrder = () => {
    const navigate=useNavigate();
    const { cartItems, shippingInfo} = useSelector(state => state.cart)
    const { user } = useSelector (state => state.auth)

    //TOTAL AMOUNT
    const itemsPrice= cartItems.reduce((acc, itemc) => acc+itemc.price * itemc.quantity, 0)
    const sendPrice= itemsPrice> 125000 ? 0: 12000
    const tax = Number((0.19 * itemsPrice).toFixed(2))
    const totalPrice =(itemsPrice + sendPrice + tax).toFixed(2)

    const processToPayment=()=>{
        const data={
            itemsPrice: itemsPrice.toFixed(2),
            sendPrice,
            tax,
            totalPrice
        }

        sessionStorage.setItem('orderInfo', JSON.stringify(data))
        navigate("/payment")
    }
  return (
    <Fragment>

            <MetaData title={'Confirm Order'} />

            <CheckoutSteps Shipping ConfirmOrder />

            <div className="row d-flex justify-content-between"key={shippingInfo}>
                <div className="col-12 col-lg-8 mt-5 order-confirm">

                    <h4 className="mb-3">Send Information</h4>
                    <p><b>Name:</b> {user && user.name}</p>
                    <p><b>Phone:</b> {shippingInfo.phone}</p>
                    <p className="mb-4"><b>Adress:</b> {`${shippingInfo.adress}, ${shippingInfo.city} ${shippingInfo.state}`}</p>

                    <hr />
                    <h4 className="mt-4">Items in your Cart:</h4>
                    {cartItems.map(itemc => (
                        <Fragment>
                            <hr />
                            <div className="cart-item my-1" key={itemc.item}>
                                <div className="row">
                                    <div className="col-4 col-lg-2">
                                        <img src={itemc.image} alt={itemc.name} height="45" width="65" />
                                    </div>
                                    <div className="col-5 col-lg-6">
                                        <Link to={`/item/${itemc.item}`}>{itemc.name}</Link>
                                    </div>
                                    <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                                        <p>{itemc.quantity} x ${itemc.price} = <b>${(itemc.quantity * itemc.price).toFixed(2)}</b></p>
                                    </div>

                                </div>
                            </div>
                            <hr />
                        </Fragment>
                    ))}
                </div>

                <div className="col-12 col-lg-3 my-4" key={cartItems}>
                    <div id="order_summary">
                        <h4>Purchase Summary</h4>
                        <hr />
                        <p>Subtotal:  <span className="order-summary-values">${itemsPrice}</span></p>
                        <p>Shipping Cost: <span className="order-summary-values">${sendPrice}</span></p>
                        <p>Taxes:  <span className="order-summary-values">${tax}</span></p>

                        <hr />

                        <p>Total: <span className="order-summary-values">${totalPrice}</span></p>

                        <hr />
                        <button id="checkout_btn" className="btn btn-primary btn-block" onClick={processToPayment}>Continue with Payment</button>
                    </div>
                </div>


            </div>

        </Fragment>
  )
}
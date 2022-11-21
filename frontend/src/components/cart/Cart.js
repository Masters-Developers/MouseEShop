import React, { Fragment} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import MetaData from '../layouts/MetaData'
import { addItemToCart, removeItemFromCart } from '../../actions/cartActions'
import { useDispatch, useSelector } from 'react-redux'


const Cart = () => {
    const navigate=useNavigate()
    const dispatch= useDispatch();
    const {cartItems} = useSelector(state => state.cart)
    const {user} =useSelector(state => state.auth)
    const increaseQty = (id, quantity, stock) => {
        const newQty = quantity+1;
        if (newQty > stock) return;
        dispatch(addItemToCart(id, newQty))
     }
  
     const decreaseQty = (id, quantity) => {
        const newQty = quantity-1;
        if (newQty <= 0) return;
        dispatch(addItemToCart(id, newQty))
   }

   const removeCartItemHandler= (id)=>{
    dispatch(removeItemFromCart(id))
   }
   const checkOutHandler = () =>{
    if (user){
        navigate("/shipping")
    }
    else{
        navigate("/login")
    }
}

    return (
        <Fragment>
            <MetaData title={'My Cart'} />
            

            {cartItems.length === 0 ? <h2 className="mt-5">Your Cart Is Empty</h2> : (
                <Fragment>
                    
                    <h2 className="mt-5">Your Cart: <b>{cartItems.reduce((acc, itemc)=>(acc+Number(itemc.quantity)),0)} items</b></h2>

                    <div className="row d-flex justify-content-between" key={cartItems}>
                        <div className="col-12 col-lg-8">
                        {cartItems && cartItems.map(itemc => (
                                <Fragment>
                                    <hr />
                                    <div className="cart-item" key={itemc.name} value ={itemc}>
                                        <div className="row">
                                            <div className="col-4 col-lg-3">
                                                <img src={itemc.image} alt={itemc.name} height="90" width="115" />
                                            </div>
                                            <div className="col-5 col-lg-3">
                                                <Link to={`/items/${itemc.item}`}>{itemc.name}</Link>
                                            </div>
                                            <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                                <p id="card_item_price">${itemc.price}</p>
                                            </div>
                                            <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                                <div className="stockCounter d-inline">
                                                    <span className="btn btn-danger minus" onClick={() => decreaseQty(itemc.item, itemc.quantity)}>-</span>

                                                    <input type="number" className="form-control count d-inline" value={itemc.quantity} readOnly />

                                                    <span className="btn btn-primary plus" onClick={()=>increaseQty(itemc.item, itemc.quantity, itemc.stock)}>+</span>
                                                </div>
                                            </div>

                                            <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                                                <i id="delete_cart_item" className="fa fa-trash btn btn-danger" onClick={() => removeCartItemHandler(itemc.item)}></i>
                                            </div>

                                        </div>
                                    </div>
                                    <hr />
                                </Fragment>
                            
                        ))}
                        </div>

                        <div className="col-12 col-lg-3 my-4">
                            <div id="order_summary">
                                <h4>Total Amount </h4>
                                <hr />
                                <p>items:  <span className="order-summary-values">{cartItems.reduce((acc, itemc)=>(acc+Number(itemc.quantity)),0)} (Unities)</span></p>
                                <p>Total Amount: <span className="order-summary-values">${cartItems.reduce((acc, itemc)=> acc+(itemc.quantity*itemc.price),0).toFixed(2)}</span></p>

                                <hr />
                                <button id="checkout_btn" className="btn btn-primary btn-block" onClick={checkOutHandler}>Buy!</button>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default Cart
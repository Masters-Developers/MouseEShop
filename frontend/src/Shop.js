
import { itemReducer, itemDetailsReducer, newItemReducer ,itemUpdateandDeleteReducer, newReviewReducer, itemReviewsReducer, reviewReducer} from './reducers/itemReducer';
import { authReducer , forgotPasswordReducer, userReducer,allUsersReducer, userDetailsReducer  } from './reducers/userReducer';
import { cartReducer } from './reducers/cartReducer';
import { allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer, orderReducer } from './reducers/orderReducer';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
const reducer= combineReducers ({
    items:itemReducer,
    itemDetails: itemDetailsReducer,
    auth : authReducer,
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    newItem: newItemReducer,
    item:itemUpdateandDeleteReducer,
    newOrder:newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
    newReview: newReviewReducer,
    allOrders: allOrdersReducer,
    order: orderReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
    itemReviews: itemReviewsReducer,
    review: reviewReducer
})
let initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
        shippingInfo: localStorage.getItem('shippingInfo')
            ? JSON.parse(localStorage.getItem('shippingInfo'))
            : {}
    }
}
const middleware = [thunk]
const shop= createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))
export default shop;
import { ADD_TO_CART, REMOVE_ITEM_CART,SAVE_SHIPPING_INFO } from '../constants/cartConstants'

export const cartReducer = (state = { cartItems: []}, action) => {
    switch (action.type) {

        case ADD_TO_CART:
            const itemc = action.payload;

            const isItemExist = state.cartItems.find(i => i.item === itemc.item)

            if (isItemExist) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(i => i.item === isItemExist.item ? itemc : i)
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, itemc]
                }
            }

        case REMOVE_ITEM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter(i => i.item !== action.payload)
            }
        case SAVE_SHIPPING_INFO:
            return{
                ...state,
                shippingInfo: action.payload
            }
    
        default:
            return state
    }
}
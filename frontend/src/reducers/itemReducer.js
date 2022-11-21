import { ALL_ITEMS_REQUEST,
    ALL_ITEMS_SUCCES,
    ALL_ITEMS_FAIL,
    FIX_ERRORS,ITEM_DETAILS_SUCCESS,ITEM_DETAILS_FAIL, ITEM_DETAILS_REQUEST, MANAGEMENT_ITEMS_REQUEST, MANAGEMENT_ITEMS_FAIL, MANAGEMENT_ITEMS_SUCCES, NEW_ITEM_REQUEST, NEW_ITEM_SUCCES ,NEW_ITEM_RESET,NEW_ITEM_FAIL,
    UPDATE_ITEM_REQUEST,UPDATE_ITEM_SUCCESS,UPDATE_ITEM_FAIL,UPDATE_ITEM_RESET,DELETE_ITEM_REQUEST,DELETE_ITEM_FAIL, DELETE_ITEM_SUCCES,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,
    NEW_REVIEW_RESET,
    GET_REVIEWS_REQUEST,
    GET_REVIEWS_SUCCESS,
    GET_REVIEWS_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_RESET,
    DELETE_REVIEW_FAIL} from "../constants/itemsConstants";

export const itemReducer = (state ={items:[]},action)=>{
    switch(action.type){
        case MANAGEMENT_ITEMS_REQUEST:
        case ALL_ITEMS_REQUEST:
            return{
                loading:true,
                items:[]
            }
        case ALL_ITEMS_SUCCES:
            return{
                loading:false,
                items:action.payload.items,
                itemsCount:action.payload.itemsCount,
                resPerPage: action.payload.resPerPage,
                filteredItemsCount: action.payload.filteredItemsCount
            }
        case MANAGEMENT_ITEMS_SUCCES:
            return{
                loading:false,
                items:action.payload
            }
        case MANAGEMENT_ITEMS_FAIL:
        case ALL_ITEMS_FAIL:
            return{
                loading:false,
                error: action.payload
            }
        case FIX_ERRORS:
            return{
                ...state,
                error:null
            }
        default:
            return state;
        }
}
export const itemDetailsReducer = (state ={ item: {}}, action)=>{
    switch(action.type){
        case ITEM_DETAILS_REQUEST:
            return{
                ...state,
                loading:true
            }
        case ITEM_DETAILS_SUCCESS:
            return{
                loading:false,
                item: action.payload,
            }
        case ITEM_DETAILS_FAIL:
            return{
                ...state,
                error: action.payload
            }
        case FIX_ERRORS:
            return{
                ...state,
                error:null
            }
        default:
            return state;
    }
}
export const newItemReducer = (state={item:{}},action) =>{
    switch(action.type){
        case NEW_ITEM_REQUEST:
            return{
                ...state,
                loading:true
            }
        case NEW_ITEM_SUCCES:
            return{
                loading:false,
                succes:action.payload.succes,
                item:action.payload.item

            }
        case NEW_ITEM_FAIL:
            return{
                ...state,
                error:action.payload
            }
        case NEW_ITEM_RESET:
            return{
                ...state,
                succes:false
            }
        case FIX_ERRORS:
            return{
                ...state,
                error:null
            }
        default:
            return state;
    }   
}
export const itemUpdateandDeleteReducer= (state = {}, action)=>{
    switch(action.type){
        case DELETE_ITEM_REQUEST:
        case UPDATE_ITEM_REQUEST:
            return{
                ...state, 
                loading:true
            }
        case DELETE_ITEM_SUCCES:
            return{
                ...state,
                loading: false,
                isDeleted: action.payload
            }

        case UPDATE_ITEM_SUCCESS:
            return{
                ...state,
                loading: false,
                isUpdated: action.payload
            }
            
        case DELETE_ITEM_FAIL:
        case UPDATE_ITEM_FAIL:
            return{
                ...state,
                error: action.payload
            }
            
        case UPDATE_ITEM_RESET:
            return{
                ...state,
                isUpdated: false
            }
        case FIX_ERRORS:
            return {
                error:null
            }
        default:
            return state
    }
}
export const newReviewReducer = (state = {}, action) => {
    switch (action.type) {

        case NEW_REVIEW_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_REVIEW_SUCCESS:
            return {
                loading: false,
                success: action.payload
            }

        case NEW_REVIEW_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case NEW_REVIEW_RESET:
            return {
                ...state,
                success: false
            }

        case FIX_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export const itemReviewsReducer = (state = { opiniones: [] }, action) => {
    switch (action.type) {

        case GET_REVIEWS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case GET_REVIEWS_SUCCESS:
            return {
                loading: false,
                opiniones: action.payload
            }

        case GET_REVIEWS_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case FIX_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export const reviewReducer = (state = {}, action) => {
    switch (action.type) {

        case DELETE_REVIEW_REQUEST:
            return {
                ...state,
                loading: true
            }

        case DELETE_REVIEW_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }

        case DELETE_REVIEW_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case DELETE_REVIEW_RESET:
            return {
                ...state,
                isDeleted: false
            }

        case FIX_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}


 

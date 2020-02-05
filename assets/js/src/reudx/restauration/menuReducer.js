import { FETCH_MENU_LIST_REQUEST,
     FETCH_MENU_LIST_SUCCESS, 
     FETCH_MENU_LIST_FAILURE, 
     FETCH_HISTO_RESERVATION_REQUEST, 
     FETCH_HISTO_RESERVATION_SUCCESS, 
     FETCH_HISTO_RESERVATION_FAILURE, 
     SET_RENEW_ERROR_STATUS
    } from "../actionsType";


const InitialState = {
    loading: false,
    menus: [],
    error: ''
}

export const menuReducer = (state = InitialState, action) =>{
    switch (action.type) {
        case FETCH_MENU_LIST_REQUEST: return{
            ...state,
            loading: true,
            menus: [],
            error : ''
        }

        case FETCH_MENU_LIST_SUCCESS: return{
            ...state, 
            loading: false,
            menus: action.payload,
            error: ''
        }

        case FETCH_MENU_LIST_FAILURE: return{
            ...state,
            loading : false,
            menus : [],
            error : action.payload
        }
        default:return state;
    }
}

const InitialState2 ={
    loading : false,
    data:[],
    error : ''
}

export const histoReservReducer = (state = InitialState2, action)=>{
    switch (action.type) {
        case FETCH_HISTO_RESERVATION_REQUEST: return{
            ...state,
            loading : true,
            data: [],
            error : ''
        }
        
        case FETCH_HISTO_RESERVATION_SUCCESS: return{
            ...state,
            loading : false,
            data : action.payload,
            error : ''
        }

        case FETCH_HISTO_RESERVATION_FAILURE: return{
            ...state,
            loading : false,
            data: [],
            error : action.payload
        }
        case SET_RENEW_ERROR_STATUS: return{
            ...state,
            error : '',
        }
        default: return state;
    }

}
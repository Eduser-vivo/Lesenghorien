import {
     FETCH_BUS_LIGNES_REQUEST,
     FETCH_BUS_LIGNES_SUCCESS, 
     FETCH_BUS_LIGNES_FAILURE,
     FETCH_BUS_RESERVATION_REQUEST,
     FETCH_BUS_RESERVATION_SUCCESS,
     FETCH_BUS_RESERVATION_FAILURE,
     FETCH_BUS_RESERVATION_HISTO_REQUEST,
     FETCH_BUS_RESERVATION_HISTO_SUCCESS,
     FETCH_BUS_RESERVATION_HISTO_FAILURE,
     SET_RESERVATION_STATUS_FALSE,
     SET_RENEW_ERROR_STATUS,
     FETCH_HORAIRE_VALIDE_REQUEST,
     FETCH_HORAIRE_VALIDE_SUCCESS,
     FETCH_HORAIRE_VALIDE_FAILURE,
     FETCH_HORAIRE_STATUS, 
} from "../actionsType";


const initialState1 ={
    loading: false,
    data : [],
    error : '',
}

/**
 * ligne bus
 */
export const lignesReducer = (state = initialState1 ,  action)=>{
    switch (action.type) {
        case FETCH_BUS_LIGNES_REQUEST: return{
            ...state,
            loading : true,
            data: [],
            error:'',
        }

        case FETCH_BUS_LIGNES_SUCCESS: return{
            ...state,
            loading:false,
            data: action.payload,
            error: '',
        }

        case FETCH_BUS_LIGNES_FAILURE : return{
            ...state,
            loading: false,
            data: [],
            error: action.payload
        }
        default: return state;
    }

}


const initialState2 ={
    loading: false,
    data : [],
    isOK : false,
    error : '',
}


/**
 * reservation bus
 */
export const reservationBusReducer = (state = initialState2, action)=>{
    switch (action.type) {
        case FETCH_BUS_RESERVATION_REQUEST: return{
            ...state,
            loading : true,
            data: [],
            isOK: false,
            error:'',
        }
            
        case FETCH_BUS_RESERVATION_SUCCESS: return{
            ...state,
            loading:false,
            data: action.payload,
            isOK :true,
            error: '',
        };

        case FETCH_BUS_RESERVATION_FAILURE : return{
            ...state,
            loading: false,
            data: [],
            isOK :false,
            error: action.payload
        }

        case SET_RESERVATION_STATUS_FALSE: return{
            ...state,
            loading:false,
            isOK: false,
            error:''
        }
        
    
        default: return state;
    }
}


const initialState3 = {
    loading: false,
    data: [],
    error:''
}

export const historiquebusReducer = (state = initialState3, action)=>{
    switch (action.type) {
        case FETCH_BUS_RESERVATION_HISTO_REQUEST: return{
            ...state,
            loading: true,
            data : [],
            error: ''
        }

        case FETCH_BUS_RESERVATION_HISTO_SUCCESS: return{
            ...state,
            loading: false,
            data : action.payload,
            error: '',
        }
            
        case FETCH_BUS_RESERVATION_HISTO_FAILURE: return{
            ...state,
            loading: false,
            data : [],
            error: action.payload,
        }

        case SET_RENEW_ERROR_STATUS: return{
            ...state,
            error : '',
        }
        
        default:return state;
    }
}

export const horaireReducer = (state={loading: false, data:[], error: ''}, action) =>{
    switch (action.type) {
        case FETCH_HORAIRE_VALIDE_REQUEST: return{
            ...state,
            loading: true,
            data:[],
            error: ''
        }

        case FETCH_HORAIRE_VALIDE_SUCCESS: return{
            loading: false,
            data: action.payload,
            error: ''
        }

        case FETCH_HORAIRE_VALIDE_FAILURE: return{
            loading: false,
            data:[],
            error: action.payload
        }

        case FETCH_HORAIRE_STATUS: return{
            loading: false,
            data:[],
            error: ''
        }
        default: return state;
    }
}
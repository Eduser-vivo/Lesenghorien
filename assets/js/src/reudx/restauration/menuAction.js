import { FETCH_MENU_LIST_REQUEST,
     FETCH_MENU_LIST_SUCCESS,
      FETCH_MENU_LIST_FAILURE,
      FETCH_HISTO_RESERVATION_REQUEST,
      FETCH_HISTO_RESERVATION_SUCCESS,
      FETCH_HISTO_RESERVATION_FAILURE,
      tdate, 
} from "../actionsType"
import { request } from "../request"



/**
 * Menu list
 */
export const fetchMenuListRequest = () =>{
    return{
        type: FETCH_MENU_LIST_REQUEST
    }
}

export const fetchMenuListSuccess = (data) =>{
    return{
        type: FETCH_MENU_LIST_SUCCESS,
        payload : data["hydra:member"]
    }
}

export const fetchMenuListFailure = (error) =>{
    return{
        type: FETCH_MENU_LIST_FAILURE,
        payload: error
    }
}

export const fetchMenuList = () =>{
    return dispatch =>{
        dispatch(fetchMenuListRequest());
        return request.get(`/menus?dateValidite[after]=${tdate}&page=1&itemsPerPage=30`).then(
            response => dispatch(fetchMenuListSuccess(response))
        ).catch(
            error => {
                const isError = error.response && error.response.status ;
                dispatch(fetchMenuListFailure(isError))
            }
        );
    }
}


/**
 * historique reservation
 */

 export const fetchHistoReservRequest = ()=>{
     return{
        type: FETCH_HISTO_RESERVATION_REQUEST,
     }
 }

 export const fetchHistoReservSuccess = (data)=>{
     return{
        type: FETCH_HISTO_RESERVATION_SUCCESS,
        payload : data["hydra:member"]
     }
 }

 export const fetchHistoReservFailure = (error)=>{
     return{
        type: FETCH_HISTO_RESERVATION_FAILURE,
        payload : error
     }
 }

 export const fetchHistoReserv = (idClient)=>{
    return (dispatch)=>{
        dispatch(fetchHistoReservRequest());
        return request.get(`/reservations?client.id=${idClient}&dateReservation[after]=${tdate}&page=1&itemsPerPage=30`).then(
            response => dispatch(fetchHistoReservSuccess(response))
        ).catch(
            error => {
                const isError = error.response && error.response.status ;
                dispatch(fetchHistoReservFailure(isError))
            }
        )
    }   
 }
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
    tdate,
    FETCH_HORAIRE_VALIDE_REQUEST,
    FETCH_HORAIRE_VALIDE_SUCCESS,
    FETCH_HORAIRE_VALIDE_FAILURE,
    FETCH_HORAIRE_STATUS
} from "../actionsType"
import { request } from "../request";


/**
 * Ligne bus
 */
export const fetchBusLigneRequest = () =>{
    return{
        type: FETCH_BUS_LIGNES_REQUEST,
    }
}
export const fetchBusLigneSuccess = (data) =>{
    
    return{
        type: FETCH_BUS_LIGNES_SUCCESS,
        payload: data["hydra:member"]
    }
}
export const fetchBusLignesFailure = (error) =>{
    return{
        type: FETCH_BUS_LIGNES_FAILURE,
        payload : error
    }
}

export const fetchBusLignes = () =>{
    return (dispatch)=>{
        dispatch(fetchBusLigneRequest());
        return request.get(`/ligne_buses?dateValidite[after]=${tdate}&page=1&itemsPerPage=30`).then(
            response=> dispatch(fetchBusLigneSuccess(response))
        ).catch(error => {
            const isError = error.response && error.response.status ;
            dispatch(fetchBusLignesFailure(isError))
        })
    }
}


/**
 * reservation bus 
 */
export const fetchBusReservationRequest = () =>{
    return{
        type: FETCH_BUS_RESERVATION_REQUEST,
    }
}
export const fetchBusReservationSuccess = (data) =>{
    return{
        type: FETCH_BUS_RESERVATION_SUCCESS,
        payload: data
    }
}
export const fetchBusReservationFailure = (error) =>{
    return{
        type: FETCH_BUS_RESERVATION_FAILURE,
        payload : error
    }
}


export const fetchBusReservation = (idHoraire, idClient) =>{
    return (dispatch)=>{
        dispatch(fetchBusReservationRequest());
        return request.post(`/reservation_buses`, 
            {
                horaire : `api/horaires/${idHoraire}`,
                client : `api/clients/${idClient}`
            }
        
        ).then(
            response=> dispatch(fetchBusReservationSuccess(response))
        ).catch(error => {
            const isError = error.response && error.response.status ;
            dispatch(fetchBusReservationFailure(isError))
        })
    }
}


/**
 * historiques
 */

 export const fetchHistoBusRequest = ()=>{
     return{
         type: FETCH_BUS_RESERVATION_HISTO_REQUEST
     }
 }
 export const fetchHistoBusSuccess = (data)=>{
    return{
        type: FETCH_BUS_RESERVATION_HISTO_SUCCESS,
        payload: data["hydra:member"]
    }
 }
 export const fetchHistoBusFailure = (error)=>{
    return{
        type: FETCH_BUS_RESERVATION_HISTO_FAILURE,
        payload: error
    }
 }


 export const setConfirmationreservfalse = ()=>{
     return{
         type: SET_RESERVATION_STATUS_FALSE
     }
 }

 export const setErrorStatus = ()=>{
     return{
         type: SET_RENEW_ERROR_STATUS
     }
 }

 export const fetchHistoBus =(idClient)=>{
     console.log(idClient);
     
     return (dispatch)=>{
         dispatch(fetchHistoBusRequest());
         return request.get(`/reservation_buses?client.id=${idClient}&dateReservation[after]=${tdate}&page=1&itemsPerPage=30`).then(
             response => dispatch(fetchHistoBusSuccess(response))
         ).catch(
            error => {
                const isError = error.response && error.response.status ;
                dispatch(fetchHistoBusFailure(isError))
            }
         )
     }
 }



/**
 * get horaire with id
 */

 export const fetchHoraireRequest = ()=>{
     return{
         type: FETCH_HORAIRE_VALIDE_REQUEST
     }
 }

 
 export const fetchHoraireSuccess = (data)=>{
     return{
         type: FETCH_HORAIRE_VALIDE_SUCCESS,
         payload : data["hydra:member"]
     }
 }

 export const fetchHoraireFailure = (error)=>{
     return{
         type: FETCH_HORAIRE_VALIDE_FAILURE,
         payload: error
     }
 }

 export const fetchHostaireStatus = ()=>{
     return{
         type: FETCH_HORAIRE_STATUS
     }
 }

 export const fetchHoraire = (id)=>{
     return dispatch =>{
         dispatch(fetchHoraireRequest());
         return request.get(`/horaires?dateValidite[after]=${tdate}&lignebus.id=${id}&page=1&itemsPerPage=30`).then(
             response => dispatch(fetchHoraireSuccess(response))
         ).catch(
             error =>{
                 const ErrorStatus = error.response && error.response.status;
                 dispatch(fetchHoraireFailure(ErrorStatus))
             }
         )
     }
 }

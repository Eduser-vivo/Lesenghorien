import { 
    CREATION_RESERVATION_REQUEST,
    CREATION_RESERVATION_SUCCESS,
    CREATION_RESERVATION_FAILURE,
    CLEAR_OLD_RESERVATION_DATA,
    AJOUT_PLAT,
    RETRAIT_PLAT,
    AJOUT_QUANT,
    RETRAIT_QUANT,
 } from "../actionsType"
import { request } from "../request"

/**
 * panierAdd
 */

 export const addToPanier = (plat, id) =>{
     return{
         type: AJOUT_PLAT,
         id,
         plat
     }
 }

 /**
  * retrait plat
  */

  export const removeItem = (id) =>{
     return{
         type: RETRAIT_PLAT,
         id
     }
  }

  /**
   * ajout qant
   */


   export const addQuantity = (id)=>{
        return{
            type: AJOUT_QUANT,
            id
        }
   }

   /**
    * retrait quant
    */

    export const subtractQuantity = (id)=>{
        return{
            type: RETRAIT_QUANT,
            id
        }
    }

/**
 * CreationReservation
 */

 export const createReservationRequest = ()=>{
     return{
         type: CREATION_RESERVATION_REQUEST
     }
 }

 export const creationReservationSuccess = (data)=>{
     return{
         type: CREATION_RESERVATION_SUCCESS,
         payload : data
     }
 }


 export const creationReservationFailure = (error)=>{
     return{
         type: CREATION_RESERVATION_FAILURE,
         payload: error
     }
 }

 export const cleanOldReservData = ()=>{
    return{
        type: CLEAR_OLD_RESERVATION_DATA
    }
 }

 export const creationReservation = (idClient, paniers )=>{
     return (dispatch)=>{
         dispatch(createReservationRequest());
         console.log(paniers);
         
         return request.post(`/reservations`, 
         {
            client : `api/clients/${idClient}`,
            panier : paniers
         }
         ).then(
             response => dispatch(creationReservationSuccess(response))
         ).catch(
            error =>{
                const errorStatus = error.response && error.response.status;
                 dispatch(creationReservationFailure(errorStatus))
            }
         )
     } 
 }




import { 
    CREATION_RESERVATION_REQUEST, 
    CREATION_RESERVATION_SUCCESS, 
    CREATION_RESERVATION_FAILURE, 
    CLEAR_OLD_RESERVATION_DATA,
    AJOUT_PLAT,
    RETRAIT_PLAT,
    AJOUT_QUANT,
    RETRAIT_QUANT,
    SET_RENEW_ERROR_STATUS
     } from "../actionsType";
import service from "../../service/service";



const initialState2 = {
    loading : false,
    data: [],
    error : '',
    isReserv: false
}

export const createReservReducer = (state = initialState2, action)=>{
    switch (action.type) {
        case CREATION_RESERVATION_REQUEST: return{
            ...state,
            loading : true,
            data:[],
            error: '',
            isReserv: false
        }

        case CREATION_RESERVATION_SUCCESS: return{
            ...state,
            loading: false,
            data: action.payload,
            error: '',
            isReserv: true,
        }

        case CREATION_RESERVATION_FAILURE: return{
            ...state,
            loading: false,
            data: [],
            error: action.payload,
            isReserv: false
        }

        case CLEAR_OLD_RESERVATION_DATA: return{
            ...state, 
            isReserv: false,
            error: ''
        }

        case SET_RENEW_ERROR_STATUS: return{
            ...state,
            error: ''
        }
        default: return state;
    }
}

const monPanier = ()=>{
    const p = service.getPostPanier();
    if(p === null || typeof(p)=== 'undefined'){
        return [];
    }else{
        return p;
    }
}

const monShop=()=>{
    const p = service.getPanier();
    if(p === null || typeof(p) === 'undefined'){
        return [];
    }else{
        return p;
    }
}

 const initialState3 = {
    addedItems : monPanier(),
    shoppings : monShop(),
}

export const cardReducer = (state = initialState3, action)=>{
    if(action.type === CLEAR_OLD_RESERVATION_DATA){
        return{
            addedItems : [],
            shoppings: []
        }
    }
    
    if(action.type === AJOUT_PLAT){
        
        let items = action.plat;
        
        let addedOneItem = items.find(item => item['@id'] === action.id);
            
        if(addedOneItem){
            let panier = {};
            let shop = {};
            panier.plat = addedOneItem["@id"];
            shop.plat = addedOneItem;


            let existed_item = state.addedItems.find(item => action.id === item.plat)
            let existed_item_shop = state.shoppings.find(item => action.id === item.plat['@id'])
            
            if(existed_item ){
                existed_item.quantite += 1;
                existed_item_shop.quantite += 1;
                
                service.setPanier(state.shoppings);
                service.setPostPanier(state.addedItems);
                return{
                    ...state,
                    addedItems : [...state.addedItems],
                    shoppings : [...state.shoppings]
                }
            }else{
                panier.quantite = 1
                shop.quantite = 1
                service.setPanier([...state.shoppings, shop]);
                service.setPostPanier([...state.addedItems, panier]);
                return{
                    addedItems : [...state.addedItems, panier],
                    shoppings : [...state.shoppings, shop]
                }
            }
        }

    }
    if(action.type === RETRAIT_PLAT){
        let itemToRemove = state.addedItems.find(item => action.id === item.plat);
        // let itemToRemoveShop = state.shoppings.find(item => action.id === item.plat['@id']);

        if(itemToRemove){

            let new_items = state.addedItems.filter(item => action.id !== item.plat);
            let new_items_shop = state.shoppings.filter(item => action.id !== item.plat['@id']);
            service.setPanier(new_items_shop);
            service.setPostPanier(new_items);
            return{
                ...state,
                addedItems : new_items,
                shoppings : new_items_shop
            }
        }


    }
    if(action.type === AJOUT_QUANT){
        let existed_item = state.addedItems.find(item => action.id === item.plat);
        let existed_item_shop = state.shoppings.find(item => action.id === item.plat['@id']);

        existed_item.quantite += 1;
        existed_item_shop.quantite += 1;
        service.setPanier(state.shoppings);
        service.setPostPanier(state.addedItems);
        return{
            ...state
        }
    }
    if(action.type === RETRAIT_QUANT){
        let existed_item = state.addedItems.find(item => action.id === item.plat);
        let existed_item_shop = state.shoppings.find(item => action.id === item.plat['@id']);

        if(existed_item.quantite === 1){
            let new_items = state.addedItems.filter(item => action.id !== item.plat);
            let new_items_shop = state.shoppings.filter(item => action.id !== item.plat['@id']);
            service.setPanier(new_items_shop);
            service.setPostPanier(new_items);
            return{
                ...state,
                addedItems : new_items,
                shoppings : new_items_shop
            }
        }else{
            existed_item.quantite -= 1;
            existed_item_shop.quantite -= 1;
            service.setPanier(state.shoppings);
            service.setPostPanier(state.addedItems);
            return{
                ...state
            }
        }
    }
    else{
        return state;
    }

}

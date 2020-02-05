import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { removeItem, addQuantity, subtractQuantity, creationReservation } from '../../reudx/restauration/panierAction';
import { fetchlogout } from '../../reudx/log/logAction';
import { setErrorStatus } from '../../reudx/bus/busAction';
import { Link } from 'react-router-dom';
import '../../asset/historiqueplat.css';
import service from '../../service/service';


function Monpanier(props) {

  const shoppings = props.cardReducer.shoppings;
  const addedItems = props.cardReducer.addedItems;

  console.log(shoppings);
  if(!shoppings){
    return<Redirect to={{pathname:`/plats`}}/>
  }

  const addQuantity =(id)=>{
    props.addQuantity(id);
  }

  const removeItem =(id) =>{
    props.removeItem(id);
  }

  const subtractQuantity=(id)=>{
      props.subtractQuantity(id);
  }

 const reserver =(addItems)=>{
    const idClient = props.client.data;
    props.reservation(idClient, addItems);
}


const reserOk = props.creatReserv.isReserv;
const errorStatus = props.creatReserv.error;
if(reserOk){
  service.cleanPanier();
  return <Redirect to={{pathname:`historique-plats`}} />
}

console.log(errorStatus);

console.log(typeof(shoppings));


if(errorStatus === 401){
  props.fetchlogout();
  props.setErrorStatus();
  return <Redirect to={{pathname:`connexion` , state:{status:401, referer: `/panier`}}} />
} 
  
  return (
    <div>

     
        <div id="bodyhistoReserv">
          {
            (shoppings.length === 0 || shoppings === null)?(
              <div id="alert-login">
                  <span className="alert alert-secondary float-center" role="alert" > votre panier est vide </span>
              </div>
            ):(
              shoppings.map(plat =>(
                <div className="card mb-4 mt-4 shadow-sm" id="histoCard2" key={plat.plat.id}>
                    <div className="card-body">
                        <div className="card-title border-bottom">
                            <small>{plat.plat.nom.substring(0, 30)} </small><br/>
                            <small>quantite : {plat.quantite} </small><br/>
                        </div>
                        <div className="card-text">
                            <small>prix: {plat.plat.prix * plat.quantite}</small>
                        </div>
                      <div className="card-text">
                        <button className="btn btn-outline-primary btn-sm pan-action"  onClick={()=>addQuantity(plat.plat['@id'])}>ajouter</button>
                        <button className="btn btn-outline-warning btn-sm pan-action" onClick={()=>subtractQuantity(plat.plat['@id'])} >diminuer</button>
                        <button className="btn btn-outline-danger btn-sm pan-action" onClick={()=>removeItem(plat.plat['@id'])}><i className="fas fa-trash"></i></button>
                      </div>
                    </div>
                </div>
              ))
            )
          }
        </div>

          <div id="historiqueplat" className="nav-wrapper">
              <div>
                  <Link to={{pathname:`/plat`, state:{referer:"/panier"}}}
                      style={{ color: "white", textDecoration: "none" }}
                      className="btn btn-primary" id="backBtn"
                  >
                      <i className="fas fa-long-arrow-alt-left"> </i> retour
                  </Link>
                  Mon panier
              </div>
          </div>
          <div id="reserver-btn">
            {
                (shoppings.length !== 0 ) &&
                <button className="btn btn-success" onClick={()=>reserver(addedItems)} > 
                  <i className="far fa-check-circle fa-1x"></i>
                  reserver
                </button>
            }
          </div>
        
    </div>
  );
}

const mapStateToProps = (state) =>{
  return{
    client : state.client,
    cardReducer : state.cardReducer,
    creatReserv : state.createreservation
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    removeItem : (id) => dispatch(removeItem(id)),
    addQuantity : (id) => dispatch(addQuantity(id)),
    subtractQuantity : (id) => dispatch(subtractQuantity(id)),
    reservation : (z, x)=> dispatch(creationReservation(z, x)),
    fetchlogout: ()=> dispatch(fetchlogout()),
    setErrorStatus: ()=> dispatch(setErrorStatus()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Monpanier);
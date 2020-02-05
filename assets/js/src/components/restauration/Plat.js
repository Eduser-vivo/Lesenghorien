import React from 'react';
import '../../asset/plat.css';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { creationReservation, addToPanier } from '../../reudx/restauration/panierAction';
import { fetchlogout } from '../../reudx/log/logAction';

class Plat extends React.Component {
    constructor(props){
        super(props);
        this.state={
            panier : []
        }
    }

    UNSAFE_componentWillMount(){
       
    }

    addPanier(plat, id){        
        this.props.addToPanier(plat, id);
    }

    reserver(addItems){
        const idClient = this.props.client.data;
        this.props.reservation(idClient, addItems);
    }

    render() {
        const addItems = this.props.cardReducer.addedItems;
        const shoppings = this.props.cardReducer.shoppings;
        const errorStatus = this.props.creatReserv.error;

        console.log(addItems);
        console.log(shoppings);
        
        const check = this.props.location.state;
        
        if(check === null || check === undefined || check.length === 0){
            return <Redirect to={{pathname:`/menus`}} />
        }
        
        const plats = this.props.location.state.plats;
        if(plats === null || plats === undefined || plats.length === 0){
            return <Redirect to={{pathname:`/menus`}} />
        }
        const menu = this.props.location.state.menu;
        const reserOk = this.props.creatReserv.isReserv;
        const loading = this.props.creatReserv.loading;

        console.log(errorStatus);
        if(reserOk){
            return <Redirect to={{pathname:`historique-plats`}} />
        }

        if(errorStatus === 401){
            this.props.fetchlogout();
            return <Redirect to={{pathname:`connexion` , state:{status:401, referer: `/plat`}}} />
        }
        return (
            <div id="platContainer">
                <div id="listeMenuTitle" className="nav-wrapper">
                    <div>
                        <Link to={{pathname:`/menus`, state:{referer:"/plat"}}}
                            style={{ color: "white", textDecoration: "none" }}
                            className="btn btn-primary" id="backBtn"
                        >
                            <i className="fas fa-long-arrow-alt-left"> </i> retour
                        </Link>
                        <small>Plat {menu+1} </small> <br />
                    </div>
                    <div>
                       <Link to={{pathname:`panier`, state:{ referer: "/plat"}}}
                             style={{ color: "white", textDecoration: "none" }}
                            >
                           { (addItems === null )?(0):(
                           <small>{addItems.length}</small>)
                           }
                          <i className="fa fa-cart-plus" aria-hidden="true"></i>
                       </Link>
                    </div>
                </div>

                <div className="container" id="platBody">
                    {
                        loading ?( <i className="fa fas-spinner fa-spin"></i> ):(

                        (plats.length === 0 || plats === null)?(
                            <div id="alert-login">
                                <span className="alert alert-secondary float-center" role="alert" > aucun plat disponible </span>
                            </div>
                        ):(
                          
                            plats.map((plat, index) =>(
                                <div className="card" id="platBody" key={plat.id}>
                                    <div className="card-body">
                                        <div className="card-title border-bottom ">
                                            <small><u>Plat {index+1}:</u> {plat.nom.substring(0, 30)}</small>
                                        </div>
                                        <div>
                                            <small> description : {plat.description.substring(0, 30)}</small> <br />
                                            <small> prix: {plat.prix} fcfa </small>
                                        </div>
                                    </div>
                                    <div className="card-footer" id="platAjout">
                                        <div><button className="btn btn-outline-primary btn-sm" onClick={()=> this.addPanier(plats, plat['@id'])} >ajouter+</button></div>
                                    </div>
                                </div>
                     ))
                        ))
                    }
                </div>

             </div>
        );
    }
}


const mapStateToProps = (state) => ({
  client : state.client,
  creatReserv : state.createreservation,
  cardReducer : state.cardReducer
});

const mapDispatchToProps = (dispatch) => ({
  reservation : (z, x)=> dispatch(creationReservation(z, x)),
  addToPanier : (plat, id) => dispatch(addToPanier(plat,id)),
  fetchlogout: ()=> dispatch(fetchlogout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Plat);

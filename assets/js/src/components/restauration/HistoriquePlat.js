import React from 'react';
import { connect } from 'react-redux';
import { fetchHistoReserv } from '../../reudx/restauration/menuAction';
import { Link, Redirect } from 'react-router-dom';
import '../../asset/historiqueplat.css';
import { fetchlogout } from '../../reudx/log/logAction';
import { setErrorStatus } from '../../reudx/bus/busAction';
import { cleanOldReservData } from '../../reudx/restauration/panierAction';


class HistoriquePlat extends React.Component {

  UNSAFE_componentWillMount(){
    
    this.props.cleanOldReservData();
    const idClient = this.props.client.data;
    this.props.histoReserv(idClient);
  }

  render() {

    console.log(this.props);
    const histo = this.props.histo.data;
    
    const errorStatus = this.props.histo.error;

    if(errorStatus === 401){
      this.props.fetchlogout();
      this.props.setErrorStatus();
      return <Redirect to={{pathname:`/connexion`, state: {status:401, referer: `/historique-plats`}}} />
  }

    console.log(histo);
    
    
    return (
      <>
        <div className="container" id="bodyhistoReserv">

            {
              histo && (histo.length === 0 && histo === null)?(
                <div id="alert-login">
                  <span className="alert alert-secondary float-center" role="alert" > vous n'avez effectué aucune reservation </span>
              </div>
              ):( histo.map((item) =>(
                item.panier.map(element =>(
                      <div className="card mb-4 mt-4 shadow-sm" id="histoCard1"  key={element.id}>
                        <div className="card-body">
                          <div className="card-title border-bottom">
                            <small> {element.plat.nom.substring(0, 20)} </small><br/>
                          </div>
                          <div className="card-text">
                            <small> quantite: {element.quantite} </small><br/>
                            <small> prix :{element.plat.prix * element.quantite} </small>
                          </div>
                      </div>
                  </div>
                ))
              ))


  )
            }
        </div>
        <div id="historiqueplat" className="nav-wrapper">
              <div>
                  <Link to={{pathname:`/`, state:{referer:"/historiqueplat"}}}
                      style={{ color: "white", textDecoration: "none" }}
                      className="btn btn-primary" id="backBtn"
                  >
                      <i className="fas fa-long-arrow-alt-left"> </i> retour
                  </Link>
                  Vos reservations de plat
              </div>
          </div>
      </>
    );
  }
}

const mapStateToProps = (state) =>{
  return{
    client : state.client,
    histo : state.histoReserv
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    histoReserv : (id)=> dispatch(fetchHistoReserv(id)),
    fetchlogout: ()=> dispatch(fetchlogout()),
    setErrorStatus: ()=> dispatch(setErrorStatus()), 
    cleanOldReservData: () => dispatch(cleanOldReservData()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoriquePlat);



import React, { Component } from 'react';
import '../../asset/lignes.css';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {fetchBusLignes} from '../../reudx/bus/busAction';
import { fetchlogout } from '../../reudx/log/logAction';


class Lignes extends Component {

  UNSAFE_componentWillMount(){
    const lignes = this.props.lignes.data;
    if(lignes.length === 0 || lignes === null){
      this.props.fetchBusLignes();
    }
    
  }
  
  render() {
    const lignes = this.props.lignes.data;
    const loading = this.props.lignes.loading;
    
    const lignesError = this.props.lignes.error;
    console.log(lignesError);
    
    if(lignesError === 401){
      this.props.fetchlogout();
      return <Redirect to={{pathname:`/connexion`, state: {status:401, referer: `/`}}} />
    }

    console.log(lignes);
    return (
      <div id="lignesContainer">
        <div id="lignesTitle">
              <Link to={{pathname:`/`, state:{referer:"/lignes"}}}
                    style={{ color: "white", textDecoration: "none" }}
                    className="btn btn-primary" id="backBtn"
                  >
                 <i className="fas fa-long-arrow-alt-left"></i> retour
              </Link>
             Lignes
        </div>
        
        <div className="container" id="ligneBody">

        {
          loading ?(
            <i className="fa fas-spinner fa-spin"></i> 
          ) :(
            (lignes.length === 0 || lignes === null)?(
              <div id="alert-login">
                  <span className="alert alert-secondary float-center" role="alert" > pas de ligne active </span>
              </div>
            ):(

              lignes.map((ligne, index) =>(
                <div className="card mb-4 mt-4 shadow-sm" key={ligne.id}>
                  <div className="card-body"> 
                      <div className="card-title border-bottom">
                        <u>Ligne<u></u></u> : {index+1} {ligne.nom.substring(0, 50)}
                      </div>
                      <div className="card-text border-bottom">
                        <small>distance: {ligne.distance} km </small> <br />
                        <small>point depart: {ligne.pointDepart.substring(0, 50)} </small> <br />
                        <small>point arrive: {ligne.pointArrivee.substring(0, 50)}  </small> <br />
                        <small> {ligne.montant} </small><br/>
                      </div>
                      <div className="card-text">
                        <Link to={{pathname:`/horaires/${index+1}`, state:{ligne: index, id: ligne.id, ligneNom: ligne.nom, LigneHoraires:ligne.horaires, referer: "/lignes"}}}
                            style={{ color: "white", textDecoration: "none" }}
                            className="btn btn-primary btn-sm btn-block"
                        >
                          Les horaires disponibles
                        </Link>
                      </div>
                  </div>
              </div> 
              )))  
          )
        }    
        </div>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    lignes: state.lignes
  };
}


const mapDispatchToProps = (dispatch)=>{
  return{
    fetchBusLignes: ()=> dispatch(fetchBusLignes()),
    fetchlogout : ()=> dispatch(fetchlogout())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Lignes);
import React from 'react';
import '../../asset/horaires.css';
import { connect } from 'react-redux';
import Popup from 'reactjs-popup';
import ReserveForm from './ReserveForm';
import { Link, Redirect } from 'react-router-dom';
import { fetchHoraire, fetchHostaireStatus } from '../../reudx/bus/busAction';


class Horaires extends React.Component {

    UNSAFE_componentWillMount(){
        const check = this.props.location.state;
        if(check === null || check === undefined || check.length === 0){
            return <Redirect to={{pathname:`/lignes`}} />
        }

        const id = this.props.location.state.id;
    
        if(typeof(id) === 'undefined' || id === null){
            return <Redirect to={{pathname:`lignes`}} />
        }else{
            this.props.horaire(id);
        }
    }

    render() {
            

        const horaires = this.props.location.state.LigneHoraires;

        const valideHoraire = this.props.horaires.data;
        const loading = this.props.horaires.loading;

        const horaireError = this.props.horaires.error;
        if(horaireError === 401){
            this.props.fetchHostaireStatus();
            return <Redirect to={{pathname:`connexion`, state:{status:401, referer:`/horaire`}}} />
        }

        const ligne = this.props.location.state.ligne;
        const ligneNom = this.props.location.state.ligneNom;
        console.log(horaires);
        
        return (
            <div id="horairesContainer">
                <div id="horairesTitle">
                        <Link to={{pathname:`/lignes`, state:{referer:"/horaires"}}}
                             style={{ color: "white", textDecoration: "none" }}
                             className="btn btn-primary" id="backBtn"
                            >
                             <i className="fas fa-long-arrow-alt-left"> </i> retour
                        </Link>
                       <small>Ligne {ligne+1} </small> <br />
                </div>
                <div className="container" id="horairesBody">
                    {
                        loading ? (
                            <div>
                                <i className="fa fas-spinner fa-spin"> </i> 
                            </div>
                        ):(
                        (valideHoraire.length === 0 || valideHoraire === null)?(
                            <div id="alert-login">
                                <span className="alert alert-secondary float-center" role="alert" > pas d'horaire disponible </span>
                            </div>
                        ):(

                            valideHoraire.map((horaire, index) =>(
                            <div className="card mb-4 mt-4 shadow-sm" id="cardHoraire" key={horaire.id}>
                            <div className="card-body"> 
                                <div className="card-title border-bottom">
                                    <u>Horraire {index+1}:</u> {horaire.nom.substring(0, 15 )}
                                </div>
                                <div className="card-text border-bottom">
                                    <small>heure depart:  {horaire.heureDepart.substring(11, 19)} </small> <br />
                                    <small>heure arrive: {horaire.heureArrivee.substring(11, 19)} </small> <br />
                                    <small>nombre place: {horaire.nombrePlaces} </small> <br />
                                    <small>montant : {horaire.montant} fcfa</small>
                                </div>
                                <div className="card-text text-center">
                                    <Popup 
                                        trigger={<button className="btn btn-primary btn-block">reserver</button>}
                                        modal
                                        closeOnDocumentClick
                                    >
                                        <ReserveForm horaire ={horaire} ligne={ligne} ligneNom ={ligneNom} />
                                    </Popup>
                                </div>
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

const mapStateToProps = (state) =>{
    return{
        horaires : state.horaire
    }
};

const mapDispatchToProps = dispatch=> {
  return{
      horaire : (id)=> dispatch(fetchHoraire(id)),
      fetchHostaireStatus: ()=> dispatch(fetchHostaireStatus())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Horaires);

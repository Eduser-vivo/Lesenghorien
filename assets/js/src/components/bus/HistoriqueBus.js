import React from 'react';
import { connect } from 'react-redux';
import '../../asset/histoBus.css';
import { Link, Redirect } from 'react-router-dom';
import {fetchHistoBus, setConfirmationreservfalse, setErrorStatus} from '../../reudx/bus/busAction';
import { fetchlogout } from '../../reudx/log/logAction';

class HistoriqueBus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    UNSAFE_componentWillMount(){
       this.props.setConfirmationreservfalse();
        const idClient = this.props.client.data;
        console.log(idClient);
        
        this.props.fetchHistoBus(idClient);
    }

    render() {
        const loading = this.props.histoBus.loading;
        const histoBus = this.props.histoBus.data;
        const errorStatus = this.props.histoBus.error;

        if(errorStatus === 401){
            this.props.fetchlogout();
            this.props.setErrorStatus();
            return <Redirect to={{pathname:`/connexion`, state: {status:401, referer: `/historique-bus`}}} />
        }

        return (
            <div>
                <div id="lignesTitle">
                  <Link to={{pathname:`/`, state:{referer:"/historiquebus"}}}
                        style={{ color: "white", textDecoration: "none" }}
                        className="btn btn-primary" id="backBtn"
                      >
                     <i className="fas fa-long-arrow-alt-left"></i> retour
                    </Link>
                    Vos reservations de bus
                </div>
    
                <div id="histoBus" className="container">
                        {
                            loading ?(
                                <i className="fa fas-spinner fa-spin"></i>
                            ) : (
                                (histoBus.length === 0 || histoBus === null)?(
                                <div id="alert-login">
                                    <span className="alert alert-secondary float-center" role="alert" > vous n'avez effectué aucune reservation </span>
                                </div>):(
                                    histoBus.map((histo, index) =>(
                                        <div className="card mb-4 mt-4 shadow-sm" id="histoCard" key={histo.id}>
                                            <div className="card-body">
                                                <div className="card-title border-bottom">
                                                <small>Ligne:{histo.horaire.lignebus.nom.substring(0, 30)} </small><br/>
                                                <small>du {histo.horaire.dateValidite.substring(0, 10)} </small>
                                                </div>
                                                <div className="card-text">
                                                    <small>depart: {histo.horaire.heureDepart.substring(11, 16)} /</small>
                                                    <small> arrivé: {histo.horaire.heureArrivee.substring(11, 16)} </small><br/>
                                                    <small>montant: {histo.horaire.montant} </small>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )
                            )
                        }
                </div>
            </div>
        );
    };
}


const mapStateToProps = (state) => ({
    histoBus: state.histoBus,
    client : state.client,
});

const mapDispatchToProps = (dispatch) =>({
    fetchHistoBus : (x)=> dispatch(fetchHistoBus(x)),
    setConfirmationreservfalse : ()=> dispatch(setConfirmationreservfalse()),
    fetchlogout : ()=> dispatch(fetchlogout()),
    setErrorStatus : ()=> dispatch(setErrorStatus()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HistoriqueBus);
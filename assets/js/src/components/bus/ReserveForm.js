import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Redirect } from 'react-router';
import {fetchBusReservation, setErrorStatus} from '../../reudx/bus/busAction';
import { fetchlogout } from '../../reudx/log/logAction';



const RerserveForm = (props) => {

    const horaire = props.horaire;
    const ligne = props.ligne;
    const ligneNom = props.ligneNom;
    const handleSubmit  = props.handleSubmit;


    const onSubmit=()=>{
        const idHoraie = horaire.id;
        const idClient = props.client.data;
        console.log(idClient);
        
        props.fetchBusReservation(idHoraie, idClient);

    }

    const isLog = props.logInfo.isLog;
    const reservStatus = props.reservationBus.isOK;
    const errorStatus = props.reservationBus.error;
    const loading = props.reservationBus.loading;

    console.log(reservStatus);
    
    if(!isLog || errorStatus === 401){
        props.fetchlogout();
        props.setErrorStatus();
        return (<Redirect to={{ pathname: "/connexion", state: {status:401, referer: '/lignes' } }} />);
    }

    if(reservStatus){
        return (<Redirect to={{pathname:'/historique-bus', state:{ referer:'/reservation'}}}  />);
    }
    
    return (
        <div>
            {
                loading && <i className="fa fas-spinner fa-spin"></i> 
            }
            <h5>Votre Reservation</h5>
            <div>
                <p>  Ligne {ligne+1}: {ligneNom} </p>
                <p>  horaire depart: {horaire.heureDepart.substring(11, 19)} </p>
                <p>  horaire arrive: {horaire.heureArrivee.substring(11, 19)} </p>
                <p>  montant : {horaire.montant} fcfa   </p>
                <form onSubmit={handleSubmit(onSubmit)} >
                    <button className="btn btn-primary" type="submit">
                         confirmer 
                    </button>
                </form>
            </div>
 
        </div>
    );
};

const mapStateToProps = (state) => ({
    logInfo: state.login,
    client : state.client,
    reservationBus : state.reservationBus
});

const mapDispatchToProps =(dispatch)=>{
    return{
        fetchBusReservation: (idH, idCl)=> dispatch(fetchBusReservation(idH, idCl)),
        fetchlogout: ()=> dispatch(fetchlogout()),
        setErrorStatus: ()=> dispatch(setErrorStatus())
    }
};

export default reduxForm({
    form: 'RerserveForm'
})(connect(mapStateToProps, mapDispatchToProps)(RerserveForm));

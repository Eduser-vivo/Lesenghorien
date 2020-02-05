import React, { Fragment } from 'react';
import '../../asset/login.css';
import { connect } from 'react-redux';
import {renderField} from '../../reudx/renderForm';
import { reduxForm, Field } from 'redux-form';
import {fetchLogin, fetchClient} from '../../reudx/log/logAction';
import { Link, Redirect } from 'react-router-dom';
import JwtDecode from 'jwt-decode';

const Login = (props) => {


    const check = props.location.state;
    if(check === null || check === undefined || check.length === 0){
        return <Redirect to={{pathname:`/`}} />
    }

    console.log(props.logInfo.error);

    const message = props.location.state.status && props.location.state.status;
    console.log(message);
    

   const onSubmit=(values)=>{
       const formData = {
           username : values.username,
           password : values.password
        }
        props.fetchLogin(formData);     
    }

   
    const isLog = props.logInfo.isLog;
    const loading = props.logInfo.loading;
    const token = props.logInfo.data.token;
    const referer = props.location.state.referer;
    const handleSubmit = props.handleSubmit;
    const error = props.logInfo.error

    if(isLog){
        console.log('is log'); 
        const userInfo = JwtDecode(token);
       const username = userInfo.username;
        props.fetchClient(username);
        
        return <Redirect to={{pathname:`${referer}`}} />
    }else{
        console.log();
        
    }


    return (
        <Fragment>
            <div className="container" id="formLogin">
                            {
                                (message === 401)&&(
                                    <div id="alert-login">
                                        <span className="alert alert-warning float-center" role="alert" > temps de connexion expiré, veuillez vous reconnecter </span>
                                    </div>
                                )
                            }
                           { (error === 401 || error === 400 || error === 404)&& (
                               <div id="alert-login">
                                   <span className="alert alert-danger float-center" role="alert" > identifiant ou mot de passe incorrect</span>
                               </div>
                            )
                           }
                <div className="container" id="formContainer">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <legend id="legendLogin">
                            <i className="fas fa-user-circle fa-3x"></i><br/>
                               { loading && <i className="fas fa-spinner fa-spin" ></i>}
                                CONNEXION</legend>
                              <Field name="username" label="Nom d'utilisateur" type="text" component={renderField} />
                            <Field name="password" label="Mot de passe" type="password"  component={renderField} />
                            <button className="btn btn-primary btn-block" type="submit"><i className="fas fa-sign-in-alt "> connexion </i> </button>
                        </form>
                            {
                                <span>Vous n'avez pas de compte? <Link to={{pathname:`/inscription`}}> inscrivez vous</Link></span>
                            }
                </div>
            </div>
        </Fragment>
    );
};

const mapStateToProps = (state) => ({
  logInfo : state.login
});

const mapDispatchToProps = {
    fetchLogin,
    fetchClient
};

export default reduxForm({
    form: 'Login'
})(connect(mapStateToProps, mapDispatchToProps)(Login));

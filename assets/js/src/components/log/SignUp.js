import React, {useState} from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import '../../asset/login.css';
import { renderField } from '../../reudx/renderForm';
import { fetchSignUp, setSignUpStatus, limitErrorMsg } from '../../reudx/log/logAction';
import { Link, Redirect } from 'react-router-dom';


const mapStateToProps = state =>{
    return{
        SignUp : state.signUp
    }
}


const mapDispatchToProps = dispatch =>{
    return{
        fetchSignUp: (data)=> dispatch(fetchSignUp(data)),
        setSignUpStatus: ()=> dispatch(setSignUpStatus()),
        limitErrorMsg: ()=> dispatch(limitErrorMsg())
    }
}



function SignUp(props) {


    const [confirm, setConfirm] = useState(false);
    const {errorStatus, errorMessages, loading, isSign} = props.SignUp;


    console.log(errorStatus);
    console.log(errorMessages);
    
    const onSubmit = (values)=>{

        if(values.password !== values.confirmation ){
            setConfirm(true);
        }else{
            setConfirm(false);
            const data =  {
                username : values.username,
                password : values.password,
                email : values.email,
                client : {
                    nom : values.nom,
                    prenom : values.prenom,
                    numero : values.telephone
                }
            }
            
            console.log(data);
            props.fetchSignUp(data);
        }
        
    }


    if(isSign){
        props.setSignUpStatus();
        return <Redirect to={{pathname:`/connexion`, state:{referer: `/`}}} />
    }

    const handleSubmit = props.handleSubmit;

  return (
      <div className="container" style={{paddingTop:'50px'}}>
            <div className="container" id="formContainer">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <legend id="legendLogin">
                        <i className="fas fa-user-circle fa-3x"></i><br/>
                        {loading && <i className="fas fa-spinner fa-spin" ></i>}
                        INSCRIPTION
                    </legend>
                    {
                    (typeof(errorMessages) !== 'undefined' && errorMessages.length !== 0) &&(
                        <div className="alert alert-danger">
                            {
                                    errorMessages.map((error, index) =>(
                                        <div key={index} >
                                            <span > - {error.message} <br/> </span>
                                        </div>
                                    ))
                            }
                            </div>
                    )}
                    <Field name="nom" label="Nom" type="text"  component={renderField} />
                    <Field name="prenom" label="Prenom" type="text" component={renderField} />
                    <Field name="telephone" label="telephone" type="text"  component={renderField} />
                    <Field name="username" label="Nom d'utilisateur" type="text" component={renderField} />
                    <Field name="email" label="Adresse email" type="email" component={renderField} />
                    <Field name="password" type="password" label="Mot de passe" component={renderField} />

                    {confirm && (
                    <div style={{fontSize:'12px', color:'red'}} >
                        <span className="badge badge-danger" >erreur</span>
                        <span>mot de passe non conforme</span>
                    </div> 
                    )}

                    <Field name="confirmation" type="password" label="Confirmation" component={renderField} />

                    <button className="btn btn-primary btn-block" type="submit">
                    <i className="fas fa-sign-in-alt "> inscription </i> 
                    </button>
                </form>
                {
                    <span>Vous avez déjà un compte? <Link to={{pathname:`/connexion`}}> connectez vous</Link></span>
                }
            </div>
      </div>
  );
}

export default reduxForm({
    form: 'SignUp'
})(connect(mapStateToProps, mapDispatchToProps)(SignUp));
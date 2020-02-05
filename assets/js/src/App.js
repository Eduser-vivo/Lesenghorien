import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import Home from './components/Home';
import Lignes from './components/bus/Lignes';
import Horaires from './components/bus/Horaires';
import { Switch, Route, Redirect } from 'react-router';
import ListeMenu from './components/restauration/ListeMenu';
import Plat from './components/restauration/Plat';
import Login from './components/log/Login';
import ReserveForm from './components/bus/ReserveForm';
import Logout from './components/log/Logout';
import HistoriqueBus from './components/bus/HistoriqueBus';
import Monpanier from './components/restauration/Monpanier';
import HistoriquePlat from './components/restauration/HistoriquePlat';
import PrivateRoute from './components/PrivateRoute';
import SignUp from './components/log/SignUp';


function mapStateToProps(state) {
  return {
    Log : state.login,
    menus : state.menus,
    lignes : state.menus
  };
}

const mapDispatchToProps =(dispatch)=> {
  return{

  }
}

class App extends Component {

  UNSAFE_componentWillMount(){
    const isLog = this.props.Log.isLog;
    if(!isLog){
      
      return <Redirect to={{pathname:`/connexion`, state:{referer :`/`} }} />
    }

  }
  

  render() {
    const isAuth = this.props.Log.isLog;
    return (
      <div id="appContent">
        <Switch>
          <PrivateRoute path="/" component={Home} isAuth={isAuth} exact/>
          <PrivateRoute path="/lignes" component={Lignes} isAuth={isAuth} exact />
          <PrivateRoute path="/horaires/:id" component={Horaires} isAuth={isAuth} exact />
          <PrivateRoute path="/menus" component={ListeMenu} isAuth={isAuth} exact />
          <PrivateRoute path="/plat" component={Plat} exact isAuth={isAuth} />
          <PrivateRoute path="/reservation" component={ReserveForm} isAuth={isAuth} exact />
          <PrivateRoute path="/historique-bus" component={HistoriqueBus} isAuth={isAuth} exact />
          <PrivateRoute path="/panier" component={Monpanier} isAuth={isAuth} exact />
          <PrivateRoute path="/historique-plats" component={HistoriquePlat} isAuth={isAuth} exact />
          <Route path="/connexion" component={Login} isAuth={isAuth} />
          <Route path="/inscription" component={SignUp} isAuth={isAuth} />
          <Route path="/deconnexion" component={Logout} isAuth={isAuth} />
        </Switch>
      </div>
    );
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(App);
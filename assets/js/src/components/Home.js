import React, { Component } from 'react';
import '../asset/home.css';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import { connect } from 'react-redux';
import { fetchBusLignes } from '../reudx/bus/busAction';
import { fetchMenuList } from '../reudx/restauration/menuAction';
import { fetchlogout } from '../reudx/log/logAction';

class Home extends Component {

  UNSAFE_componentWillMount(){
    console.log(this.props);

    this.props.fetchMenuList();
    this.props.fetchBusLignes();
  }
  

  render() {
    
    console.log(this.props);
    
    return (
      <div id="homeConteneur">

          <div className="container-fluid" id="homeHeader">
            <div>
              <div id="mesHistorique">

                 <Link to={{pathname:`/historique-plats`}}>
                     <button className="btn btn-light btn-sm" >mes plats</button> </Link>
                 <Link to={{pathname:`/historique-bus`}}>
                    <button className="btn btn-light btn-sm"  >mes lignes </button> </Link>
              </div>
              <div id="homeNavBar">
                <NavBar />
              </div>
            </div>
            <div id="homeHeaderMsg">
                <h3>Bienvenue</h3>
                <span>Veuillez cliquer sur Bus pour accéder aux lignes disponible</span>
                <span> et sur Reservation pour accéder aux menu du jours et choisir un plat</span>
            </div>
          </div>

          <div className="container" id="homeBody">

            <div className="row" id="homeCardContainer">
              <div className="col-6">
                <Link to={{pathname:`/lignes`, state:{referer:'/'}}}>
                      <div className="card mb-4 mt-4 shadow-sm" id="cardH">
                          <div className="card-body">
                              <i className="fas fa-bus fa-5x" style={{margin:'auto'}}></i>
                          </div>
                      </div>
                </Link>
              </div>

                <div className="col-6">
                  <Link to={{pathname:`/menus`, state:{referer:'/'}}}>
                      <div className="card mb-4 mt-4 shadow-sm" id="cardH" >
                          <div className="card-body">
                              <div><i className="fas fa-utensils fa-5x" style={{margin:'auto'}}/>
                               </div>
                          </div>
                      </div>
                  </Link>
                </div>
            </div>
            
          </div>
      </div>
    );
  }
}

const mapStateToProps = (state)=>{
  return{
    logInfo : state.login
  }
}


const mapDispatchToProps =(dispatch)=> {
  return{
    fetchBusLignes : ()=> dispatch(fetchBusLignes()),
    fetchMenuList: ()=> dispatch(fetchMenuList()),
    fetchlogout : ()=> dispatch(fetchlogout())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import '../asset/navbar.css';
import { Link } from 'react-router-dom';

const NavBar = (props) => {
   
    const isLog = props.logInfo.isLog;

    return (
        <div className="" id="navBar">
            <div id="navLog">
                <button className="btn">
                    {
                        isLog?(
                            <Link to={{pathname:`/deconnexion`, state:{referer : '/'}}}  style={{color:"#fff"}}
                             className="btn btn-outline-warning btn-sm">
                             deconnexion
                       </Link> 
                        ) :(
                            <Link to={{pathname:`/connexion`, state:{referer : '/'}}}  style={{color:"#fff"}}
                            className="btn btn-outline-success btn-sm">
                            connexion
                          </Link>
                      )
                    }
                </button>
            </div>
        </div>
    );
};


const mapStateToProps = (state) => ({
  logInfo : state.login,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);

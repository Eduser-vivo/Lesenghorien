import React from 'react';
import { connect } from 'react-redux';
import {fetchlogout} from '../../reudx/log/logAction';
import { Redirect } from 'react-router';


const Logout = (props) => {

    props.fetchlogout();
    window.localStorage.clear();

    return (
        <div>
            <Redirect to = {{ pathname:`/connexion`, state:{referer:'/'}}} />
        </div>
    );
};


const mapStateToProps = (state) => ({
  
});

const mapDispatchToProps = {
    fetchlogout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Logout);

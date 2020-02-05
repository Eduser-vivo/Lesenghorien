
import React from 'react';
import { Route, Redirect } from 'react-router';

function PrivateRoute({component: Component, isAuth, ...rest}){
    return (
        <Route
            {...rest}
            render={props =>
                isAuth ?(
                    <Component {...props} isAuth={isAuth} />
                ):(
                    <Redirect to={{pathname:"connexion", state:{referer: props.location.pathname}}} />
                )
            }

        />
        
    );
};

export default PrivateRoute;

// import React, { Component } from 'react';
// // import ReactDOM from 'react-dom';
// import './index.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './asset/fontawesome-free/css/all.min.css';
// import App from './App';
// // import * as serviceWorker from './serviceWorker';
// import { Provider } from 'react-redux';
// import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import { createStore, applyMiddleware, combineReducers } from 'redux';
// import logger from "redux-logger";
// import thunk from 'redux-thunk';
// import {reducer as formReducer } from 'redux-form';
// import { lignesReducer, reservationBusReducer, historiquebusReducer, horaireReducer} from './reudx/bus/busReducer';
// import { menuReducer, histoReservReducer } from './reudx/restauration/menuReducer';
// import { loginReducer, getClientReducer, signUpReducer } from './reudx/log/loginReducer';
// import {createReservReducer, cardReducer } from './reudx/restauration/panierReducer';


// const rootReducer = combineReducers({
//     form: formReducer,
//     lignes: lignesReducer,
//     reservationBus: reservationBusReducer,
//     menus : menuReducer,
//     login : loginReducer,
//     client : getClientReducer,
//     histoBus : historiquebusReducer,
//     createreservation : createReservReducer,
//     cardReducer: cardReducer,
//     histoReserv : histoReservReducer,
//     signUp : signUpReducer,
//     horaire : horaireReducer
// })

// const store = createStore(rootReducer, applyMiddleware(logger,thunk));

// class Index extends Component{
//     render(){
//         return(
//             <Provider store={store}>
//                 <BrowserRouter>
//                     <Switch>
//                     <Route path="/" component={App} />
//                     <Route component={Error } />
//                     </Switch>
//                 </BrowserRouter>
//             </Provider>

//         );
//     }
// }

// export default Index;

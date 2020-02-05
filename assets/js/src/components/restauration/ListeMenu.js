import React from 'react';
import '../../asset/listemenu.css';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import {fetchMenuList} from '../../reudx/restauration/menuAction'
import { Spinner } from 'react-bootstrap';
import { fetchlogout } from '../../reudx/log/logAction';

class ListeMenu extends React.Component {

    UNSAFE_componentWillMount(){
        const {menus} = this.props.menus;
        if(menus.length === 0 || menus === null){
            this.props.fetchMenuList()
        }
    }

    render() {
        const {menus, loading} = this.props.menus;
        const menuError = this.props.menus.error;
        console.log(menuError);
        
        if(menuError === 401){
              this.props.fetchlogout();
              return <Redirect to={{pathname:`/connexion`, state: {status:401, referer: `/`}}} />
        }
      
        return (
            <div id="listeMenuContainer">

                <div id="listeMenuTitle">
                    <div>
                     <Link to={{pathname:`/`, state:{referer:"/menus"}}}
                         style={{ color: "white", textDecoration: "none" }}
                         className="btn btn-primary" id="backBtn"
                    >
                        <i className="fas fa-long-arrow-alt-left"> </i> retour
                    </Link>
                     Menus
                    </div>
                </div>

                <div className="container" id="menusBody">
                    {
                        loading ?(
                            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                        ):(
                            (menus.length === 0 || menus === null)?(
                                <div id="alert-login">
                                    <span className="alert alert-secondary float-center" role="alert" > pas de meu disponible </span>
                                </div>
                            ):
                            (menus.map((menu, index)=>(
                                <div className="card" key={menu.id}>
                                    <div className="card-header" >
                                      <u>Menu<u></u></u> : {index+1} {menu.nom.substring(0, 50)}
                                    </div>
                                    <div className="card-body"> 
                                        <div className="ccard-text">
                                            <small>{menu.description.substring(0, 200)} </small>
                                        </div>
                                    </div>
                                    <div>
                                        <Link to={{pathname:`/plat`, state:{menu: index, plats:menu.plats, menus:menus, referer: "/menus"}}}
                                            style={{ color: "white", textDecoration: "none" }}
                                            className="btn btn-primary btn-sm btn-block"
                                        >
                                           Les plats du menu
                                        </Link>
                                    </div>
                                </div>
                            ))
                        ))
                    }
                </div>

            </div>
        );
    }
}

const mapStateToProps = (state) => ({
  menus : state.menus
});

const mapDispatchToProps =(dispatch)=> {
    return{
        fetchMenuList: ()=> dispatch(fetchMenuList()),
        fetchlogout : ()=> dispatch(fetchlogout())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ListeMenu);

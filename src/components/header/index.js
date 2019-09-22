import React from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import ProfileComponent from './ProfileComponent';
import DropDown from '../dropdown';
import Sidebar from '../sidebar';
import AuthService from '../../services/auth.service';
import './styles.scss';

class Container extends React.PureComponent<> {
    render() {
        return (
            <header>
          
              <nav class="navbar fixed-top navbar-expand-lg navbar-light white scrolling-navbar">
                <div class="container-fluid">
          
                  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                  </button>
          
                    <a href="https://www.facebook.com/mdbootstrap" class="nav-link waves-effect" target="_blank">
                         <img src="sulatroniko-logo.png" width={100} />
                    </a>
          
                    <ul class="navbar-nav nav-flex-icons">
                        <DropDown title="Account">
                            {this.props.userType !== 'admin' && (
                                <Link class="dropdown-item" to="/profile"><i class="fas fa-cog" style={{marginRight: '0.5em'}}></i>Account Settings</Link>
                            )}
                            <a class="dropdown-item" onClick={this.props.logout}><i class="fas fa-sign-out-alt" style={{marginRight: '0.5em'}}></i>Logout</a>
                        </DropDown>
                    </ul>
          
                  </div>
          
              </nav>
          
            <Sidebar />




            </header>
        );
        return (
            <div class="navbar navbar-expand-lg navbar-light header-navigation__container">
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <a class="navbar-brand" href="/"><img src="./sulatroniko-logo.png" style={{height: 40}} /></a>
                    <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li class={`nav-item ${this.props.currentRoute === '/' ? `active is-route-selected` : ``}`}><Link class="nav-link header-link" to="/">HOME</Link></li>
                            <li class={`nav-item ${this.props.currentRoute === '/threads' ? `active is-route-selected` : ``}`}><Link class="nav-link header-link" to="/threads">MESSAGES</Link></li>
                        {this.props.userType === 'author' && (
                            <li class={`nav-item ${this.props.currentRoute === '/manuscripts' ? `active is-route-selected` : ``}`}><Link class="nav-link header-link" to="/manuscripts">MY MANUSCRIPTS</Link></li>
                        )}
                        {/*
                        <li class={`nav-item ${this.props.currentRoute === '/authors' ? `active is-route-selected` : ``}`}><Link class="nav-link header-link" to="/authors">authors</Link></li>
                        <li class={`nav-item ${this.props.currentRoute === '/publishers' ? `active is-route-selected` : ``}`}><Link class="nav-link header-link" to="/publishers">publishers</Link></li>
                        <li class={`nav-item ${this.props.currentRoute === '/copywriters' ? `active is-route-selected` : ``}`}><Link class="nav-link header-link" to="/copywriters">copywriters</Link></li>
                        */}
                        
                        <li class={`nav-item ${this.props.currentRoute === '/copywriters' ? `active is-route-selected` : ``}`}>
                            <div class="nav-link header-link dropdown">
                                <a class="dropdown-toggle" id="clubs" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    USERS
                                </a>
                                <div class="dropdown-menu" aria-labelledby="clubs">
                                    <Link class="dropdown-item" to="/publishers">publishers</Link>
                                    <Link class="dropdown-item" to="/authors">authors</Link>
                                    <Link class="dropdown-item" to="/copywriters">copywriters</Link>
                                </div>
                            </div>
                        </li>


                              
                    
                    </ul>
                    <form class="form-inline my-2 my-lg-0">
                        <ProfileComponent />
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    userType: state.userStore.type
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(AuthService.logout()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);

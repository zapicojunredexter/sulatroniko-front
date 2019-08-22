import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from "react-router-dom";
import Dashboard from './containers/dashboard';
import Profile from './containers/profile';
import Publishers from './containers/publishers';
import Authors from './containers/authors';
import Threads from './containers/threads';
import Manuscripts from './containers/manuscripts';
import CopyWriters from './containers/copywriters';
import Progress from './containers/progress';
import Clubs from './containers/clubs';
import Login from './containers/login';
import { setIsLoggedOut } from './redux/user/user.action';
import { hasProfileDetails } from './redux/user/user.selector';
import FirebaseClient from './modules/FirebaseClient';
import Footer from './components/footer';
import Header from './components/header';
import AuthService from './services/auth.service';

import './App.css';

class App extends React.PureComponent<> {
    constructor(props){
        super(props);
        FirebaseClient.init();
    }

    componentDidMount(){
        this.props.authenticationListener();
    }


    protectedRoute = props => {
        if (this.props.isLoggedIn) {
            if(this.props.shouldSetup && props.location.pathname !== '/profile'){
                return (
                    <Redirect
                        to={{
                            pathname: '/profile',
                            state: { from: props.location },
                        }}
                    />
                );
            }
            return (
                <Switch>
                    <div style={{minHeight: '100vh'}}>
                        <Header currentRoute={props.location.pathname} />
                        <Route path="/" exact component={Dashboard} />
                        <Route path="/authors" exact component={Authors} />
                        <Route path="/publishers" exact component={Publishers} />
                        <Route path="/profile" exact component={Profile} />
                        <Route path="/threads" component={Threads} />
                        <Route path="/manuscripts" component={Manuscripts} />
                        <Route path="/copywriters" component={CopyWriters} />
                        <Route path="/progress" component={Progress} />
                        <Route path="/clubs" component={Clubs} />
                        
                        <Footer />
                    </div>
                </Switch>
            );
        }
        return (
            <Redirect
                to={{
                    pathname: '/login',
                    state: { from: props.location },
                }}
            />
        );
    };

    loginRoute = () => {
        if (this.props.isLoggedIn === false) {
            return <Route path="/login" component={Login} />;
        }

        return (
            <Redirect
                to={{
                    pathname: '/',
                }}
            />
        );
    };

    render(){
        return (
            <Switch>
                <Route path="/login" render={this.loginRoute} />
                <Route path="/" render={this.protectedRoute} />
            </Switch>
        );
    }
}


const mapStateToProps = state => ({
    isLoggedIn: state.userStore.isLoggedIn,
    isRehydrated: state._persist.rehydrated,
    shouldSetup: !hasProfileDetails(state),
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(setIsLoggedOut()),
    authenticationListener: () => dispatch(AuthService.authenticationListener()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

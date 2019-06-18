import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from "react-router-dom";
import Dashboard from './containers/dashboard';
import Login from './containers/login';
import { setIsLoggedOut } from './redux/user/user.action';

import './App.css';

class App extends React.PureComponent<> {

    protectedRoute = props => {
        if (this.props.isLoggedIn) {
            return (
                <Switch>
                    <Route path="/" exact component={Dashboard} />
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
    isLoggedIn: state.userStore.isLoggedIn
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(setIsLoggedOut()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

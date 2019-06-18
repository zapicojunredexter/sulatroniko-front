import React from 'react';
import { connect } from 'react-redux';
import AuthService from '../../services/auth.service';

class Container extends React.PureComponent<> {
    render() {
        return (
            <div>
                login/index.js
                <button onClick={this.props.login}>login</button>
            </div>
        );
    }
}


const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    login: (username, password) => dispatch(AuthService.login(username,password)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);

import React from 'react';
import { connect } from 'react-redux';
import AuthService from '../../services/auth.service';

class Container extends React.PureComponent<> {
    state = {
        username: 'test@test.com',
        password: 'testtest',
    }

    handleLogin = () => {
        this.props.login(this.state.username, this.state.password)
        .catch(err => alert(err.message));
    }

    handleRegistrationAuthor = () => {
        this.props.registerAuthor(this.state.username, this.state.password)
        .catch(err => alert(err.message));
    }

    handleRegistrationPublisher = () => {
        this.props.registerPublisher(this.state.username, this.state.password)
        .catch(err => alert(err.message));
    }
    render() {
        return (
            <div>
                login/index.js
                <input value={this.state.username} onChange={event => this.setState({username: event.target.value})} />
                <input value={this.state.password} onChange={event => this.setState({password: event.target.value})} />
                <button onClick={this.handleLogin}>login</button>


                <br />
                <br />
                <br />
                <br />
                <br />
                <input value={this.state.username} onChange={event => this.setState({username: event.target.value})} />
                <input value={this.state.password} onChange={event => this.setState({password: event.target.value})} />
                <button onClick={this.handleRegistrationAuthor}>login/register author</button>




                <br />
                <br />
                <br />
                <br />
                <br />
                <input value={this.state.username} onChange={event => this.setState({username: event.target.value})} />
                <input value={this.state.password} onChange={event => this.setState({password: event.target.value})} />
                <button onClick={this.handleRegistrationPublisher}>login/register publisher</button>
            </div>
        );
    }
}


const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    login: (username, password) => dispatch(AuthService.login(username,password)),
    registerAuthor: (username, password) => dispatch(AuthService.registerAuthor(username,password)),
    registerPublisher: (username, password) => dispatch(AuthService.registerPublisher(username,password)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);

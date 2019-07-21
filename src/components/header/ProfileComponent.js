import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import AuthService from '../../services/auth.service';
import './styles.scss';

class Container extends React.PureComponent<> {
    render() {
        const userType = `${this.props.userType.charAt(0).toUpperCase()}${this.props.userType.slice(1).toLowerCase()}`;
        return (
            <div class="dropdown">
                <div class="profile-component" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <img src={this.props.userProfileImg} className="profile-component__image" />
                </div>
                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                    <a class="dropdown-item disabled with-name">
                    <img src={this.props.userProfileImg} className="profile-component__with-name" />
                    <span>{this.props.userName}</span>
                    </a>
                    <a class="dropdown-item disabled">{userType}</a>
                    <div class="dropdown-divider"></div>
                    {this.props.userType === 'publisher' && <a class="dropdown-item" href="/copywriters">Copywriters</a>}
                    <a class="dropdown-item" href="/profile">Profile</a>
                    <a class="dropdown-item" onClick={this.props.logout}>Logout</a>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    userProfileImg: 'default-user.png',
    userType: state.userStore.type || '',
    userName: state.userStore.user && state.userStore.user.name
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(AuthService.logout()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);

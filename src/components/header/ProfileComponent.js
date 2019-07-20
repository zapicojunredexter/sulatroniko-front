import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import AuthService from '../../services/auth.service';
import './styles.scss';

class Container extends React.PureComponent<> {
    render() {
        return (
            <div class="dropdown">
                <div class="profile-component" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <img src={this.props.userProfileImg} className="profile-component__image" />
                </div>
                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
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
    userType: state.userStore.type,
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(AuthService.logout()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);

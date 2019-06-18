import React from 'react';
import { connect } from 'react-redux';
import AuthService from '../../services/auth.service';

class Container extends React.PureComponent<> {
    render() {
        return (
            <div>
                dashboard/index.js
                <button onClick={this.props.logout}>logout</button>
            </div>
        );
    }
}


const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(AuthService.logout()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);

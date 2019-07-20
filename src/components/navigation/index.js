import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import './styles.scss';

class Container extends React.PureComponent<> {
    render() {
        return (
            <div className="custom-navigation">
                <div className="row custom-navigation__wrapper">
                    <div className="col-sm-3"><Link to="/profile">Profile</Link></div>
                    <div className="col-sm-3"><Link to="/manuscripts">Manuscript</Link></div>
                    <div className="col-sm-3"><Link to="/threads">Message</Link></div>
                    <div className="col-sm-3"><Link to="/todo">Work in Progress</Link></div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);

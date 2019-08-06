import React from 'react';
import { connect } from 'react-redux';
import AuthorsService from '../../services/authors.service';
import ThreadsService from '../../services/threads.service';
import config from '../../config/config';

class Container extends React.PureComponent<> {

    render() {
        return (
            <div>
                progress
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

import React from 'react';
import { connect } from 'react-redux';
import AuthorsService from '../../services/authors.service';

class Container extends React.PureComponent<> {
    componentDidMount(){
        this.props.fetchAll();
    }
    render() {
        return (
            <div>
                authors/index.js

                <ul>
                    {this.props.authors.map(publisher => {
                        return (
                            <li>{JSON.stringify(publisher)}</li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    authors: state.authorsStore.authors
});

const mapDispatchToProps = dispatch => ({
    fetchAll: () => dispatch(AuthorsService.fetchAll()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);

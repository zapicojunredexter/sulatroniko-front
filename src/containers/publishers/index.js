import React from 'react';
import { connect } from 'react-redux';
import PublishersService from '../../services/publishers.service';
import ManuscriptService from '../../services/manuscripts.service';
import { getOwnManuscripts } from '../../redux/manuscripts/manuscripts.selector';

class Container extends React.PureComponent<> {
    state = {
        selectedPublisher: null,
        selectedManuscript: null,
    };

    componentDidMount(){
        this.props.fetchPublishers();
    }

    handleSubmitRequest = () => {
        try {
            console.log(this.state.selectedManuscript, this.state.selectedPublisher.id);
            this.props.submitManuscriptRequest(this.state.selectedManuscript, this.state.selectedPublisher.id);
        } catch (err) {
            console.error(err);
        }
    }
    render() {
        console.log('rendered', this.state);
        return (
            <div>
                <button onClick={this.handleSubmitRequest}>REQUEST</button>
                publishers/index.js
                <select onChange={(event) => this.setState({selectedManuscript: event.target.value})}>
                    {this.props.myManuscripts.map(manuscript => {
                        return (
                            <option value={manuscript.id}>{JSON.stringify(manuscript)}</option>
                        );
                    })}
                </select>

                <ul>
                    {this.props.publishers.map(publisher => {
                        return (
                            <li onClick={() => this.setState({selectedPublisher: publisher})}>{JSON.stringify(publisher)}</li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    publishers: state.publishersStore.publishers,
    myManuscripts: getOwnManuscripts(state),
});

const mapDispatchToProps = dispatch => ({
    fetchPublishers: () => dispatch(PublishersService.fetchAll()),
    submitManuscriptRequest: (manuscript, publisher) => dispatch(ManuscriptService.requestTransaction(manuscript, publisher))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);

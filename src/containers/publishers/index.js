import React from 'react';
import { connect } from 'react-redux';
import PublishersService from '../../services/publishers.service';
import ManuscriptService from '../../services/manuscripts.service';
import ThreadsService from '../../services/threads.service';
import { getOwnManuscripts } from '../../redux/manuscripts/manuscripts.selector';
import config from '../../config/config';

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

    
    handleClickMessage = (copywriterId) => {
        this.props.createThread(copywriterId)
            .then((result) => {
                // window.location.href=`threads/#${result.id}`;
                window.location.href=`${config.front_url}/threads#${result.id}`;
            })
            .catch(err => alert(err.message));
    }

    render() {
        return (
            <div>

                <table class="table m-3">
                    <tr>
                        <th>PUBLISHER</th>
                        <th></th>
                    </tr>
                    {this.props.publishers.map(copywriter => {
                        return (
                            <tr>
                                <td>
                                    <img src="default-user.png" style={{width: 50}} />
                                    {copywriter.name}
                                </td>
                                <td><button onClick={() => this.handleClickMessage(copywriter.id)} className="btn btn-secondary">message</button></td>
                            </tr>
                        );
                    })}
                </table>
            </div>
        );
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
                            <li
                                onClick={() => this.setState({selectedPublisher: publisher})}
                            >
                                {JSON.stringify(publisher)}
                                <button onClick={() => this.props.createThread(publisher.id)}>send message</button>
                            </li>
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
    createThread: (userId) => dispatch(ThreadsService.createThread(userId)),
    submitManuscriptRequest: (manuscript, publisher) => dispatch(ManuscriptService.requestTransaction(manuscript, publisher))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);

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
            this.props.submitManuscriptRequest(this.state.selectedManuscript, this.state.selectedPublisher)
                .then(res => {
                    window.location.href=`${config.front_url}/threads#${res.thread.id}`;
                });
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

    handleAssignManuscripit = (copywriterId) => {
        this.setState({selectedPublisher: copywriterId});
    }

    render() {
        return (
            <div>
                <div>
                    mao ning form
                    <select onChange={(ev) => {
                        this.setState({selectedManuscript: ev.target.value})
                    }}>
                        <option>-</option>
                        {this.props.myManuscripts.map(manuscript => {
                            return (
                                <option value={manuscript.id}>{manuscript.title}</option>
                            );
                        })}
                    </select>
                    <button
                        onClick={this.handleSubmitRequest}
                        disabled={!this.state.selectedManuscript || !this.state.selectedPublisher}
                    >
                        submit
                    </button>
                </div>

                <table class="table m-3">
                    <tr>
                        <th>PUBLISHER</th>
                        <th></th>
                    </tr>
                    {this.props.publishers.map(publisher => {
                        return (
                            <tr>
                                <td>
                                    <img src="default-user.png" style={{width: 50}} />
                                    {publisher.name}
                                </td>
                                <td><button onClick={() => this.handleClickMessage(publisher.id)} className="btn btn-secondary">message</button></td>
                                <td>
                                    <button onClick={() => this.handleAssignManuscripit(publisher.id)} className="btn btn-secondary">
                                        assign manuscript
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </table>
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

import React from 'react';
import { connect } from 'react-redux';
import { getThreads } from '../../redux/threads/threads.selector';
import ThreadsService from '../../services/threads.service';
import Navigation from '../../components/navigation';
import './styles.scss';

class Container extends React.PureComponent<> {
    state = {
        message: null,
        files: null,
        selectedThread: null,
    };

    componentDidMount(){
        this.handleChangeThread();
    }
    handleSelectThread = (threadId) => {
        console.log(threadId);
        window.location.href = `#${threadId}`;
        this.handleChangeThread();
    }

    handleChangeThread = () => {
        this.setState({
            selectedThread: window.location.hash.substr(1),
        })
    }

    handleSendMessage = () => {
        const params = {
            message: this.state.message,
            threadId: this.state.selectedThread,
            files: this.state.files,
        }
        this.props.sendMessage(params).then(() => this.setState({
            message: null,
            files: null,
        }));
    }

    renderThreadDetails = (thread) => {
        return (
            <div className={`thread-details-card ${thread.id === this.state.selectedThread ? 'thread-isActive' : ''}`} onClick={() => this.handleSelectThread(thread.id)}>
                <div className="thread-details-card__name">
                    <h5>{thread.threadDisplayable && thread.threadDisplayable.name}</h5>
                </div>
                <div className="thread-details-card__image-wrapper">
                    <img src="default-user.png" />
                </div>
            </div>
        );
    }

    renderThreadMessages = () => {
        const selectedThread = this.props.threads.find(thread => thread.id === this.state.selectedThread);
        if(!selectedThread) return null;
        const renderFilesLinks = (files) => {
            return (
                files.map(file => <a href={file.filePath}>{` ${file.fileName}`}</a>)
                
            );
        }
        return (
            <div className="threads__messages-container">
                <div className="messages">

                    {selectedThread.messages.map(message => {
                        return (
                            <div className={`chat-bubble ${message.isOwn ? `is-own` : ``}`}>
                                {message.message}
                                {renderFilesLinks(message.files)}
                            </div>
                        );
                    })}
                </div>
                <div className="add-components">
                    {this.renderSendMessage()}
                </div>
            </div>
        )
    }

    renderSendMessage = () => {
        return (
            <div className="send-message-components">
                <textarea onChange={(event) => this.setState({message: event.target.value})} className="form-control" rows="3" value={this.state.message || ''} />
                <div className="d-flex p-3">

                    <input type="file" onChange={event => {
                        const selectedFiles = event.target.files;
                        this.setState({files: selectedFiles});
                    }} multiple />
                    <button onClick={this.handleSendMessage} class="btn btn-info">SEND</button>
                </div>
                
            </div>
        )
    }
    render() {
        return (
            <div className="threads">
                <Navigation />
                <div className="threads__wrapper">
                    <div className="row">
                        <div className="col-md-6 threads__scrollable">
                            <div className="threads__messages-container">
                                <input className="form-control" disabled placeholder="Search..." />
                                <hr style={{border: '0.5 solid gray', width: '100%'}}/>
                                <h4>Recent Messages</h4>
                                {this.props.threads.map(thread => this.renderThreadDetails(thread))}
                            </div>

                        </div>
                        <div className="col-md-6 threads__scrollable">
                            {this.renderThreadMessages()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    threads: state.threadsStore.threads,
    threads: getThreads(state),
});

const mapDispatchToProps = dispatch => ({
    sendMessage:(params) => dispatch(ThreadsService.sendMessage(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);

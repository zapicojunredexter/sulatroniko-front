import React from 'react';
import { connect } from 'react-redux';
import { getThreads } from '../../redux/threads/threads.selector';
import ThreadsService from '../../services/threads.service';
import Navigation from '../../components/navigation';
import UserService from '../../services/user.service';
import './styles.scss';

class Container extends React.PureComponent<> {
    state = {
        message: null,
        files: null,
        selectedThread: null,
        filterMessages: '',
        fetchedData: [],
    };

    componentDidMount(){
        this.handleChangeThread();
        this.fetchUsers();
    }

    fetchUsers = () => {
        this.props.fetchAllUserTypes()
            .then((res) => {
                this.setState({fetchedData: res});
            })
            .catch(err => alert(err.message))
    }

    handleSelectThread = (threadId) => {
        console.log(threadId);
        window.location.href = `#${threadId}`;
        const newThread = {
            newMessageCount: 0
        };
        this.props.editThread(threadId, newThread);
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
            <button onClick={() => this.handleSelectThread(thread.id)} class="btn btn-mdb-color btn-sm" style={{width: '100%',marginTop: '-.2em'}}>
                <span style={{float:'left', fontSize: 15}}>{thread.threadDisplayable && thread.threadDisplayable.name}</span>
                {thread.newMessageCount ? <span class="badge badge-danger" style={{float:'left',marginTop: '.7em',marginLeft: '1em'}}>{thread.newMessageCount}</span> : null}
                {/*
                <span style={{border: '1px solid white',borderRadius: '50%',padding: '2px 8px',float:'right'}}>C</span>
                */}
                
            </button>
        );
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
        const renderFilesLinks = (files) => {
            return (
                files.map(file => <a href={file.filePath}>{` ${file.fileName}`}</a>)
                
            );
        }
        const hasSelected = !!selectedThread;
        return (
            <div class="container-fluid" style={{paddingBottom: '2em'}}>
                {hasSelected ? (
                    <>
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
                    </>
                ) :
                (
                    <>
                        <p style={{marginTop: '1em'}}>New Message</p><br/>
                        <hr style={{marginTop: '-.5em'}} />
                        <input class="form-control form-control-md" type="text" placeholder="Recepient's Name" style={{marginTop: '1em'}} /><br/>
                        <div class="form-group" style={{marginTop: '-1em !important'}}>
                        <textarea class="form-control" rows="10" placeholder="Type your message"></textarea>
                        </div>
                        
                        {JSON.stringify(this.state.fetchedData)}
                        <p class="blue-grey-text" style={{fontSize: 10}}>Tip: For technical issues related to the SulaTroniko site or questions, please contact <a class="blue-text" href="mailto:sulatroniko@sulatroniko.com">Support</a>.</p>
                        <div style={{float:'right', marginBottom: '1.5em'}}>
                            <button type="button" class="btn btn-primary btn-sm">Upload File</button>
                            <button type="button" class="btn btn-primary btn-sm">Send</button>
                            
                        </div>
                    </>
                )}
                
            </div>
        );
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
        console.log('zzz', this.props.threads);
        const messageDetails = this.props.threads.filter(thread => thread.threadDisplayable && thread.threadDisplayable.name.toUpperCase().indexOf(this.state.filterMessages.toUpperCase()) >= 0);
        return (
            <main class="pt-5 mx-lg-5 threads-page-container">
                <div class="container-fluid mt-5">

                    <div class="row wow fadeIn">

                        <div class="col-md-12 mb-12">

                            <div class="card">

                                <div class="card-body">

                                    <div class="row container">
                                        <div class="col-md-4 thread-details-container">
                                            <div value={this.state.filterMessages} onChange={ev => this.setState({filterMessages: ev.target.value})} class="container-fluid" style={{paddingBottom: '2em'}}>
                                                <input class="form-control form-control-md" type="text" placeholder="Search" style={{marginTop: '1em'}} /><br/>
                                                <hr style={{marginTop: '-.5em'}} />
                                                <p>Recent Messages</p>
                                                
                                                {messageDetails.map(thread => this.renderThreadDetails(thread))}
                                        
                                            </div>
                                        </div>

                                        <div class="col-md-7" style={{background: '#f2f2f2', border: '1.5px solid #e6e6e6', borderRadius: 5,marginLeft: '2em',}}>
                                            {this.renderThreadMessages()}
                                        </div>

                                    </div>
                                

                                </div>

                            </div>


                        </div>
                    </div>


                </div>
            </main>
        );
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
    fetchAllUserTypes: () => dispatch(UserService.fetchAllUserTypes()),
    sendMessage:(params) => dispatch(ThreadsService.sendMessage(params)),
    editThread: (id, params) => dispatch(ThreadsService.editThread(id, params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);

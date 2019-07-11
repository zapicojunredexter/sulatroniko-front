import React from 'react';
import { connect } from 'react-redux';

class Container extends React.PureComponent<> {
    state = {
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
    render() {
        return (
            <div>
                threads/index.js
                <ul>
                    {this.props.threads.map(thread => <li onClick={() => this.handleSelectThread(thread.id)}>{JSON.stringify(thread)}</li>)}
                </ul>
                <div style={{backgroundColor:'orange'}}>
                    <h2>messages</h2>
                    <div>
                        {JSON.stringify(this.props.threads.find(thread => thread.id === this.state.selectedThread))}
                    </div>
                </div>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    threads: state.threadsStore.threads,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);

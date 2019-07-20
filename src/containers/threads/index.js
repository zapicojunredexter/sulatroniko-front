import React from 'react';
import { connect } from 'react-redux';
import Navigation from '../../components/navigation';
import './styles.scss';

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
            <div className="threads">
                <Navigation />
                threads/index.js
                <div className="threads__wrapper">
                    <div className="row">
                        <div className="col-md-6">
                            <h4>Recent Messages</h4>
                            <ul>
                                {this.props.threads.map(thread => <li onClick={() => this.handleSelectThread(thread.id)}>{JSON.stringify(thread)}</li>)}
                            </ul>
                        </div>
                        <div className="col-md-6">
                            <div>
                                {JSON.stringify(this.props.threads.find(thread => thread.id === this.state.selectedThread))}
                            </div>
                        </div>
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

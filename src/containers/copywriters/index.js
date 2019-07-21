import React from 'react';
import { connect } from 'react-redux';
import CopywriterService from '../../services/copywriters.service';
import { getMyCopywriters } from '../../redux/copywriters/copywriters.selector';
import ThreadsService from '../../services/threads.service';
import config from '../../config/config';

class Container extends React.PureComponent<> {
    state = {
        isAdding:false,
        username: null,
        password: null,
        name: null,
        phone: null,
        email: null,
        jobDesc: null,
    }
    componentDidMount(){
        this.props.fetchCopywriters();
    }
    handleAdd = () => {
        this.props.add({
            user: {
                username: this.state.username,
                password: this.state.password,
            },
            copywriter: {
                name: this.state.name,
                email: this.state.email,
                phone: this.state.phone,
                jobDesc: this.state.jobDesc,

            }
        })
        .catch(err => alert(err.message));
    }

    handleClickMessage = (copywriterId) => {
        this.props.createThread(copywriterId)
            .then((result) => {
                // window.location.href=`threads/#${result.id}`;
                window.location.href=`${config.front_url}/threads#${result.id}`;
            })
            .catch(err => alert(err.message));
    }
    renderAddingForm = () => {
        return (

            <div className="row p-3">
                <div className="col-sm-5">
                    Username
                    <input className="form-control" onChange={(event) => this.setState({username: event.target.value})} value={this.state.username} placeholder="username" />
                    <br />Password
                    <input className="form-control" onChange={(event) => this.setState({password: event.target.value})} value={this.state.password} placeholder="password" />
                </div>
                <div className="col-sm-7">
                    Name
                    <input className="form-control" value={this.state.name} onChange={(event) => this.setState({name: event.target.value})} placeholder="name" />
                    <br />Email
                    <input className="form-control" value={this.state.email} onChange={(event) => this.setState({email: event.target.value})} placeholder="email" />
                    <br />Contact Number
                    <input className="form-control" value={this.state.phone} onChange={(event) => this.setState({phone: event.target.value})} placeholder="phone" />
                    <br />Job Description
                    <input className="form-control" value={this.state.jobDesc} onChange={(event) => this.setState({jobDesc: event.target.value})} placeholder="jobDesc" />
                    <br />
                    
                    <button onClick={() => this.setState({isAdding: false})} className="btn btn-secondary">CANCEL</button>
                    {`     `}<button className="btn btn-info" onClick={this.handleAdd}>ADD</button>
                </div>
            </div>
        );
    }
    render() {
        if(this.state.isAdding) {
            return this.renderAddingForm();
        }
        return (
            <div>
                <table class="table m-3">
                    <tr>
                        <th>Names</th>
                        <th>Status</th>
                        <th>Specialized Genres</th>
                        <th></th>
                    </tr>
                    {this.props.myCopywriters.map(copywriter => {
                        return (
                            <tr>
                                <td>{copywriter.name}</td>
                                <td>{copywriter.field}</td>
                                <td>{copywriter.status}</td>
                                    <td><button onClick={() => this.handleClickMessage(copywriter.id)} className="btn btn-secondary">message</button></td>
                                </tr>
                        );
                    })}
                </table>
                <button onClick={() => this.setState({isAdding: true})} className="btn btn-secondary">ADD</button>
            </div>

        );
        return (
            <div>
                containers/copywriters/index.js
                <input onChange={(event) => this.setState({username: event.target.value})} value={this.state.username} placeholder="username" />
                <input onChange={(event) => this.setState({password: event.target.value})} value={this.state.password} placeholder="password" />


                <input onChange={(event) => this.setState({name: event.target.value})} value={this.state.name} placeholder="name" />
                <input onChange={(event) => this.setState({phone: event.target.value})} value={this.state.phone} placeholder="phone" />
                <input onChange={(event) => this.setState({email: event.target.value})} value={this.state.email} placeholder="email" />
                <input onChange={(event) => this.setState({jobDesc: event.target.value})} value={this.state.jobDesc} placeholder="jobDesc" />
                <button onClick={this.handleAdd}>add</button>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    myCopywriters: getMyCopywriters(state),
});

const mapDispatchToProps = dispatch => ({
    fetchCopywriters: () => dispatch(CopywriterService.fetchAll()),
    createThread: (copywriterId) => dispatch(ThreadsService.createThread(copywriterId)),
    add: (params) => dispatch(CopywriterService.add(params)), 
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);

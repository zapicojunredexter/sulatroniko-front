import React from 'react';
import { connect } from 'react-redux';
import CopywriterService from '../../services/copywriters.service';
import { getMyCopywriters } from '../../redux/copywriters/copywriters.selector';
import ThreadsService from '../../services/threads.service';
import config from '../../config/config';

const initialState = {
    isAdding:false,
    username: null,
    password: null,
    name: null,
    phone: null,
    email: null,
    jobDesc: null,
}
class Container extends React.PureComponent<> {
    state = {
        ...initialState,
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
        .then(() => {
            alert('success');
            this.props.fetchCopywriters().then(() => {
                this.setState(initialState);
            })
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

            <main class="pt-5 mx-lg-5 threads-page-container">
                <div class="container-fluid mt-5">
                    <div className="row p-3">

                        <div className="col-sm-5 p-3">
                            <div class="md-form">
                                <input onChange={(event) => this.setState({username: event.target.value})} id="username" value={this.state.username} type="text" class="form-control"/>
                                <label class={this.state.username && 'active'} for="username">Username</label>
                            </div>
                            <div class="md-form">
                                <input onChange={(event) => this.setState({password: event.target.value})} id="password" value={this.state.password} type="text" class="form-control"/>
                                <label class={this.state.password && 'active'} for="password">Password</label>
                            </div>
                        </div>
                        <div className="col-sm-7 p-3">
                            <div class="md-form">
                                <input onChange={(event) => this.setState({name: event.target.value})} id="name" value={this.state.name} type="text" class="form-control"/>
                                <label class={this.state.name && 'active'} for="name">Name</label>
                            </div>
                            <div class="md-form">
                                <input onChange={(event) => this.setState({email: event.target.value})} id="email" value={this.state.email} type="text" class="form-control"/>
                                <label class={this.state.email && 'active'} for="email">Email</label>
                            </div>
                            <div class="md-form">
                                <input onChange={(event) => this.setState({phone: event.target.value})} id="phone" value={this.state.phone} type="text" class="form-control"/>
                                <label class={this.state.phone && 'active'} for="phone">phone</label>
                            </div>
                            <div class="md-form">
                                <input onChange={(event) => this.setState({jobDesc: event.target.value})} id="jobDesc" value={this.state.jobDesc} type="text" class="form-control"/>
                                <label class={this.state.jobDesc && 'active'} for="jobDesc">jobDesc</label>
                            </div>
                            <button onClick={() => this.setState({isAdding: false})} className="btn btn-secondary">CANCEL</button>
                            {`     `}<button className="btn btn-info" onClick={this.handleAdd}>ADD</button>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
    render() {
        if(this.state.isAdding) {
            return this.renderAddingForm();
        }
        return (
            <main class="pt-5 mx-lg-5 threads-page-container">
                <div class="container-fluid mt-5">
                    <table class="table m-3">
                        <tr>
                            <th>Names</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                        {this.props.myCopywriters.map(copywriter => {
                            return (
                                <tr>
                                    <td>{copywriter.name}</td>
                                    <td>{!copywriter.deleted ? (
                                        <span class="badge badge-success">Active</span>
                                    ) : (
                                        <span class="badge badge-dark">Inactive</span>
                                    )}</td>
                                        <td>
                                            {copywriter.deleted ? (
                                                <button onClick={() => this.props.editCopywriter(copywriter.id, {deleted: false}).then(() => {
                                                    alert('success');
                                                    this.props.fetchCopywriters().catch(() => {});
                                                }).catch(err => alert(err.message))} style={{marginRight: '10px'}} className="btn btn-success btn-danger"><i className="fas fa-check pr-2" aria-hidden="true"></i>Enable Account</button>
                                            ): (
                                                <button onClick={() => this.props.editCopywriter(copywriter.id, {deleted: true}).then(() => {
                                                    alert('success')
                                                    this.props.fetchCopywriters().catch(() => {});
                                                }).catch(err => alert(err.message))} style={{marginRight: '10px'}} class="btn btn-sm btn-danger"><i class="fas fa-ban pr-2" aria-hidden="true"></i>Disable Account</button>

                                            )}
                                            <button onClick={() => this.handleClickMessage(copywriter.id)} className="btn btn-sm btn-mdb-color"><i class="fas fa-envelope pr-2" aria-hidden="true"></i>Message</button>
                                        </td>
                                    </tr>
                            );
                        })}
                    </table>
                    <button class="btn btn-primary btn-sm"onClick={() => this.setState({isAdding: true})}>ADD</button>
                </div>
            </main>
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
    editCopywriter: (id, params) => dispatch(CopywriterService.editCopywriter(id, params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);

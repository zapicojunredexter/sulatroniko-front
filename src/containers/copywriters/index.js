import React from 'react';
import { connect } from 'react-redux';
import CopywriterService from '../../services/copywriters.service';

class Container extends React.PureComponent<> {
    state = {
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
        });
    }
    render() {
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
});

const mapDispatchToProps = dispatch => ({
    fetchCopywriters: () => dispatch(CopywriterService.fetchAll()),
    add: (params) => dispatch(CopywriterService.add(params)), 
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);

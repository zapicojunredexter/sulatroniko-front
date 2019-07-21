import React from 'react';

export default class Container extends React.PureComponent<> {
    constructor(props){
        super(props);
        console.log('heho', props.user);
        this.state = {
            name: '',
            email: '',
            phone: '',
            jobDesc: '',
            ...props.user,
        };
    }

    handleSubmit = () => {
        const copywriter = {
            name: this.state.name,
            email: this.state.email,
            phone: this.state.phone,
            jobDesc: this.state.jobDesc,
        };
        this.props.setCopywriter(copywriter).then(() => alert('success')).catch(err => err.message);
    }

    render() {
        return (
            <div className="row p-3">
                <div className="col-sm-5">
                    Username
                    <input value={this.props.credentials.username} className="form-control" disabled />
                    <br />Password
                    <input value={this.props.credentials.password} className="form-control" type="password" disabled />
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
                    <br /><button className="btn btn-info" onClick={this.handleSubmit}>EDIT</button>
                </div>
            </div>
        );
        return (
            <div className="row">
                copywriter
                <input type="" value={this.state.writerName} onChange={(event) => this.setState({writerName: event.target.value})} placeholder="writerName" />
                <input type="" value={this.state.email} onChange={(event) => this.setState({email: event.target.value})} placeholder="email" />
                <input type="" value={this.state.phone} onChange={(event) => this.setState({phone: event.target.value})} placeholder="phone" />
                <input type="" value={this.state.jobDesc} onChange={(event) => this.setState({jobDesc: event.target.value})} placeholder="jobDesc" />
                <button onClick={this.handleSubmit}>submit</button>
            </div>
        );
    }
}

import React from 'react';

export default class Container extends React.PureComponent<> {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            phone: '',
            biography: '',
            dob: '',
            location: '',
            ccnum: '',
            ccv: '',
            ...props.user,
        };
    }

    renderTextField = (key) => {
        return (
            <input
                value={this.state[key]}
                onChange={event => this.setState({[key]: event.target.value})}
                placeholder={key}
            />
        );
    }

    handleSubmit = () => {
        const params = {
            ...this.state,
        };
        this.props.setAuthor(params).then(() => alert('success')).catch(err => alert(err.message));
    }

    render() {

        return (
            <div className="row p-3">
                <div className="col-sm-5">
                    Username
                    <input value={this.props.credentials.username} className="form-control" disabled />
                    <br />Password
                    <input value={this.props.credentials.password} className="form-control" type="password" disabled />
                    <br />Bio
                    <textarea className="form-control" placeholder="biography" onChange={(event) => this.setState({biography: event.target.value})} value={this.state.biography} type="text" rows="3"></textarea>
                </div>
                <div className="col-sm-7">
                    Name
                    <input className="form-control" value={this.state.name} onChange={(event) => this.setState({name: event.target.value})} placeholder="name" />
                    <br />Email
                    <input className="form-control" value={this.state.email} onChange={(event) => this.setState({email: event.target.value})} placeholder="email" />
                    <br />Contact Number
                    <input className="form-control" value={this.state.phone} onChange={(event) => this.setState({phone: event.target.value})} placeholder="phone" />
                    <br />Date Of Birth
                    <input type="date" className="form-control" value={this.state.dob} onChange={(event) => this.setState({dob: event.target.value})} placeholder="dob" />
                    <br />Location
                    <input className="form-control" value={this.state.location} onChange={(event) => this.setState({location: event.target.value})} placeholder="location" />
                    <br />CC Number
                    <input className="form-control" value={this.state.ccnum} onChange={(event) => this.setState({ccnum: event.target.value})} placeholder="ccnum" />
                    <br />CCV
                    <input className="form-control" value={this.state.ccv} onChange={(event) => this.setState({ccv: event.target.value})} placeholder="ccv" />
                    
                    <br /><button className="btn btn-info" onClick={this.handleSubmit}>EDIT</button>
                </div>
            </div>
        );
        return (
            <div>
                author
                {this.renderTextField('email')}
                {this.renderTextField('phone')}
                {this.renderTextField('biography')}
                {this.renderTextField('dob')}
                {this.renderTextField('location')}
                {this.renderTextField('ccnum')}
                {this.renderTextField('ccv')}
                <button onClick={this.handleSubmit}>submit</button>
            </div>
        );
    }
}

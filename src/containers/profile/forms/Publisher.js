import React from 'react';

export default class Container extends React.PureComponent<> {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            contactPerson: '',
            address: '',
            email: '',
            services: '',
            website: '',
            pubCCNum: '',
            pubCCV: '',
            ...props.user,
        };
    }

    handleSubmit = () => {
        const publisher = {
            ...this.state,
        };
        console.log('click');
        this.props.setPublisher(publisher);
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
                    Company Name
                    <input className="form-control" value={this.state.name} onChange={(event) => this.setState({name: event.target.value})} placeholder="name" />
                    <br />Contact Person
                    <input className="form-control" value={this.state.contactPerson} onChange={(event) => this.setState({contactPerson: event.target.value})} placeholder="contactPerson" />
                    <br />CC Number
                    <input className="form-control" value={this.state.pubCCNum} onChange={(event) => this.setState({pubCCNum: event.target.value})} placeholder="pubCCNum" />
                    <br />CCV
                    <input className="form-control" value={this.state.pubCCV} onChange={(event) => this.setState({pubCCV: event.target.value})} placeholder="pubCCV" />
                    <br />Address
                    <input className="form-control" value={this.state.address} onChange={(event) => this.setState({address: event.target.value})} placeholder="address" />
                    <br />Website
                    <input className="form-control" value={this.state.website} onChange={(event) => this.setState({website: event.target.value})} placeholder="website" />
                    <br />Email
                    <input className="form-control" value={this.state.email} onChange={(event) => this.setState({email: event.target.value})} placeholder="email" />
                    <br />Services
                    <input className="form-control" value={this.state.services} onChange={(event) => this.setState({services: event.target.value})} placeholder="services" />
                    
                    <br /><button className="btn btn-info" onClick={this.handleSubmit}>EDIT</button>
                </div>
            </div>
        );
        return (
            <div>
                publisher
                <input type="" value={this.state.name} onChange={(event) => this.setState({name:event.target.value})} placeholder="name" />
                <input type="" value={this.state.contactPerson} onChange={(event) => this.setState({contactPerson:event.target.value})} placeholder="contactPerson" />
                <input type="" value={this.state.address} onChange={(event) => this.setState({address:event.target.value})} placeholder="address" />
                <input type="" value={this.state.email} onChange={(event) => this.setState({email:event.target.value})} placeholder="email" />
                <input type="" value={this.state.services} onChange={(event) => this.setState({services:event.target.value})} placeholder="services" />
                <input type="" value={this.state.website} onChange={(event) => this.setState({website:event.target.value})} placeholder="website" />
                <input type="" value={this.state.pubCCNum} onChange={(event) => this.setState({pubCCNum:event.target.value})} placeholder="pubCCNum" />
                <input type="" value={this.state.pubCCV} onChange={(event) => this.setState({pubCCV:event.target.value})} placeholder="pubCCV" />
                <button onClick={this.handleSubmit}>submitz</button>
            </div>
        );
    }
}

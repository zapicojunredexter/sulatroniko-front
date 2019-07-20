import React from 'react';

export default class Container extends React.PureComponent<> {
    constructor(props){
        super(props);
        this.state = {
            companyName: '',
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
            <div>
                publisher
                <input type="" value={this.state.companyName} onChange={(event) => this.setState({companyName:event.target.value})} placeholder="companyName" />
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

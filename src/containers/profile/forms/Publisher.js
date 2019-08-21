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
            name: this.state.name,
            contactPerson: this.state.contactPerson,
            address: this.state.address,
            email: this.state.email,
            services: this.state.services,
            website: this.state.website,
            pubCCNum: this.state.pubCCNum,
            pubCCV: this.state.pubCCV,
        };
        this.props.setPublisher(publisher);
    }
    render() {
        return (

            <div class="col-md-12 mb-12">
                
                <div class="card" style={{marginTop: '4em'}}>
    
                    <div class="card-body">
    
                        <div class="row container">
                            <div class="md-form col-lg-3" style={{marginLeft: '4em'}}>
                                <h6>Login Details</h6>
            
                                <div class="row">
                                    <div class="md-form col s12">
                
                                        <input value={this.props.credentials.username} type="text" id="email" class="form-control" disabled/>
                                        <label class={this.props.credentials.username && 'active'} for="email">Username</label>
                                        <span class="helper-text" data-error="Invalid Email"></span>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="md-form col s12">
                                        <input value={this.props.credentials.password} id="password" type="password" class="form-control" disabled/>
                                        <label class={this.props.credentials.password && 'active'} for="password">Password</label>
                                    </div>
                                </div>
            
                                <div class="row">
                                    <div class="md-form col s12">
                                        <input value={this.props.credentials.password} id="password" type="password" class="form-control" disabled/>
                                        <label class={this.props.credentials.password && 'active'} for="password">Confirm Password</label>
                                    </div>
                                </div>
            
                            </div>
            
                            <div class="md-form col s8" style={{marginLeft: '4em'}}>
                                <h6 style={{marginLeft: '1em'}}>Personal Information (Publisher)</h6>
                                <div class="md-form row">
                                    <div class="md-form col s12" style={{marginTop: '0.7em', marginBottom: '-1em'}}>
                                        <input onChange={(event) => this.setState({name: event.target.value})} value={this.state.name}  id="company_name" type="text" class="form-control"/>
                                        <label class={this.state.name && 'active'} for="company_name">Company/Institution</label>
                                    </div>
                                </div>

                                <div class="md-form row">
                                    <div class="md-form col s6" style={{marginTop: '2.4em'}}>
                                        <input value={this.state.contactPerson} onChange={(event) => this.setState({contactPerson: event.target.value})} id="contact_person" type="text" class="form-control"/>
                                        <label class={this.state.contactPerson && 'active'} for="contact_person">Contact Person</label>
                                    </div>
                                    <div class="md-form col s6" style={{marginTop: '2.4em'}}>
                                        <input value={this.state.address} onChange={(event) => this.setState({address: event.target.value})} id="address" type="text" class="form-control"/>
                                        <label class={this.state.address && 'active'} for="address">Address</label>
                                    </div>
                                </div>
            
                                <div class="md-form row">
                                    <div class="md-form col s6" style={{marginTop: 0}}>
                                        <input value={this.state.pubCCV} onChange={(event) => this.setState({pubCCV: event.target.value})} id="ccv" type="text" class="form-control"/>
                                        <label class={this.state.pubCCV && 'active'} for="ccv">CCV</label>
                                    </div>
                                    <div class="md-form col s6" style={{marginTop: 0}}>
                                        <input value={this.state.pubCCNum} onChange={(event) => this.setState({pubCCNum: event.target.value})} id="ccn" type="text" class="form-control"/>
                                        <label class={this.state.pubCCNum && 'active'} for="ccn">CC Number</label>
                                    </div>
                                </div>
                
                                <div class="md-form row">
                                    <div class="md-form col s4" style={{marginTop: 0}}>
                                        <input value={this.state.website} onChange={(event) => this.setState({website: event.target.value})} id="website" type="text" class="form-control"/>
                                        <label class={this.state.website && 'active'} for="website">Website</label>
                                    </div>
                                    <div class="md-form col s4" style={{marginTop: 0}}>
                                        <input value={this.state.email} id="email" onChange={(event) => this.setState({email: event.target.value})} type="text" class="form-control"/>
                                        <label class={this.state.email && 'active'} for="email">Email</label>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="md-form col s12" style={{marginTop: '-0.6em'}}>
                                        <textarea value={this.state.services} onChange={(event) => this.setState({services: event.target.value})} id="services" class="md-textarea form-control" rows="2"></textarea>
                                        <label for="services">Services</label>
                                    </div>
                                </div>
                
                                <div class=" float-right"><button class="btn btn-primary" type="button" onClick={this.handleSubmit}>Save Changes</button></div>
                    
                            </div>
            
                        </div>
                        
        
                    </div>
        
                </div>


            </div>
            
        );

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

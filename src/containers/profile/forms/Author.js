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
            email: this.state.email,
            phone: this.state.phone,
            biography: this.state.biography,
            dob: this.state.dob,
            location: this.state.location,
            ccnum: this.state.ccnum,
            ccv: this.state.ccv,
        };
        this.props.setAuthor(params).then(() => alert('success')).catch(err => alert(err.message));
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
                                <h6 style={{marginLeft: '1em'}}>Personal Information (Author)</h6>
                                <div class="md-form row">
                                    <div class="md-form col s8" style={{marginTop: '0.7em', marginBottom: '-1em'}}>
                                        <input value={this.state.name} onChange={(event) => this.setState({name: event.target.value})} id="name" type="text" class="form-control"/>
                                        <label class={this.state.name && 'active'} for="name">Name</label>
                                    </div>
                                    <div class="md-form col s4" style={{marginTop: '0.7em', marginBottom: '-1em'}}>
                                        <input value={this.state.dob} onChange={(event) => this.setState({dob: event.target.value})} id="dob" type="date" class="form-control"/>
                                        <label class={this.state.dob && 'active'} for="dob">Date Of Birth</label>
                                    </div>
                                </div>
            
                                <div class="md-form row">
                                    <div class="md-form col s4" style={{marginTop: '2.4em'}}>
                                        <input onChange={(event) => this.setState({email: event.target.value})} id="email" value={this.state.email} onChange={(event) => this.setState({email: event.target.value})} type="text" class="form-control"/>
                                        <label class={this.state.email && 'active'} for="email">Email</label>
                                    </div>
                                    <div class="md-form col s4" style={{marginTop: '2.4em'}}>
                                        <input onChange={(event) => this.setState({phone: event.target.value})} id="phone" value={this.state.phone} type="text" class="form-control"/>
                                        <label class={this.state.phone && 'active'} for="phone">Phone</label>
                                    </div>
                                    <div class="md-form col s4" style={{marginTop: '2.4em'}}>
                                        <input onChange={(event) => this.setState({location: event.target.value})} id="location" value={this.state.location} type="text" class="form-control"/>
                                        <label class={this.state.location && 'active'} for="location">Location</label>
                                    </div>
                                </div>
                
                                <div class="md-form row">
                                    <div class="md-form col s4" style={{marginTop: 0}}>
                                        <input onChange={(event) => this.setState({ccnum: event.target.value})} value={this.state.ccnum} id="ccn" type="text" class="form-control"/>
                                        <label class={this.state.ccnum && 'active'} for="ccn">CC Number</label>
                                    </div>
                                    <div class="md-form col s4" style={{marginTop: 0}}>
                                        <input onChange={(event) => this.setState({ccv: event.target.value})} value={this.state.ccv} id="ccv" type="text" class="form-control"/>
                                        <label class={this.state.ccv && 'active'} for="ccv">CCV</label>
                                    </div>
                                </div>
                
                                <div class="row">
                                    <div class="md-form col s12" style={{marginTop: '-0.6em'}}>
                                        <textarea onChange={(event) => this.setState({biography: event.target.value})} id="bio" value={this.state.biography} class="md-textarea form-control" rows="2"></textarea>
                                        <label class={this.state.biography && 'active'} for="bio">Bio</label>
                                    </div>
                                </div>
                
                                <div class=" float-right"><button class="btn btn-primary" onClick={this.handleSubmit} type="button">Save Changes</button></div>
                    
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

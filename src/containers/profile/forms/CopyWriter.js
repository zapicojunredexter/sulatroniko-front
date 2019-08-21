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
                                <h6 style={{marginLeft: '1em'}}>Personal Information (Copywriter)</h6>
                                <div class="md-form row">
                                    <div class="md-form col s12" style={{marginTop: '0.7em', marginBottom: '-1em'}}>
                                        <input id="name" value={this.state.name} onChange={(event) => this.setState({name: event.target.value})} type="text" class="form-control"/>
                                        <label class={this.state.name && 'active'} for="name">Name</label>
                                    </div>
                                </div>
            
                                <div class="md-form row">
                                    <div class="md-form col s6" style={{marginTop: '2.4em'}}>
                                        <input id="email" onChange={(event) => this.setState({email: event.target.value})} value={this.state.email} type="text" class="form-control"/>
                                        <label class={this.state.email && 'active'} for="email">Email</label>
                                    </div>
                                    <div class="md-form col s6" style={{marginTop: '2.4em'}}>
                                        <input id="phone" value={this.state.phone} onChange={(event) => this.setState({phone: event.target.value})} type="text" class="form-control"/>
                                        <label class={this.state.phone && 'active'} for="phone">Phone</label>
                                    </div>
                                </div>
                
                                <div class="row">
                                    <div class="md-form col s12" style={{marginTop: '-0.6em'}}>
                                        <textarea value={this.state.jobDesc} onChange={(event) => this.setState({jobDesc: event.target.value})} id="bio" class="md-textarea form-control" rows="2"></textarea>
                                        <label class={this.state.jobDesc && 'active'} for="bio">Job Description</label>
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

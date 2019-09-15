import React from 'react';
import { connect } from 'react-redux';
import AuthService from '../../../services/auth.service';

const initialState = {
    username: '',
    password: '',
    confirmPass: '',
    userType: 'publisher'
}
class Container extends React.PureComponent<> {
    state = {
        ...initialState,
    }
    componentDidMount(){
    }
    handleRegistration = () => {
        if(this.state.userType === 'author') {
            this.props.registerAuthor(this.state.username, this.state.password)
            .catch(err => alert(err.message));
        } else {
            if(this.state.userType === 'publisher') {
                this.props.registerPublisher(this.state.username, this.state.password)
                .catch(err => alert(err.message));
            }
        }
    }
    render() {
        const isOpen = this.props.isOpen;
        return (
            
          <div class="modal fade right show" id="signup" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" style={isOpen ? {display: 'block', paddingRight: 16} : {}} aria-modal="true">
          
          <div class="modal-dialog modal-full-height modal-right" role="document">
        
        
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title  ml-auto mr-auto">Create an Account</h4>
              </div>
              <div class="modal-body">
                <div class="container">
                    <div class="md-form form-sm">
                      <i class="fas fa-envelope prefix" style={{fontSize: 15,marginTop: '0.6em',marginLeft: '0.5em'}}></i>
                      <input type="email" value={this.state.username} onChange={ev => this.setState({ username: ev.target.value })} class="form-control" />
                      <label for="emailadd">Username</label> <br/>
                    </div>
                    <div class="md-form form-sm" style={{marginTop: "-1.5em"}}>
                      <i class="fas fa-lock prefix" style={{fontSize: 15,marginTop: '0.6em',marginLeft: '0.5em'}}></i>
                      <input type="password" id="password" value={this.state.password} onChange={ev => this.setState({ password: ev.target.value })} class="form-control" />
                      <label for="passowrd">Password</label>
                      <br/>
                    </div>
                    <div class="md-form form-sm" style={{marginTop: "-1.5em"}}>
                      <i class="fas fa-lock prefix" style={{fontSize: 15,marginTop: '0.6em',marginLeft: '0.5em'}}></i>
                      <input type="password" value={this.state.cofirmPass} onChange={ev => this.setState({ confirmPass: ev.target.value })} id="confirmpassword" class="form-control"/>
                      <label for="confirmpassword">Confirm Password</label> <br/>
                    </div>
                    <div class="user-type-group" style={{margin: '-2em 0 0 1em'}}>
                      <p style={{color: 'gray'}}>Creating account as: </p>
                      <div class="custom-control custom-radio custom-control-inline">
                        <input onClick={() => this.setState({userType: 'publisher'})} type="radio" class="custom-control-input" id="publisher" name="usertype" checked={this.state.userType === 'publisher'} />
                        <label class="custom-control-label" for="publisher">Publisher</label>
                      </div>
                       <div class="custom-control custom-radio custom-control-inline">
                        <input onClick={() => this.setState({userType: 'author'})} type="radio" class="custom-control-input" id="author" name="usertype" checked={this.state.userType === 'author'} />
                        <label class="custom-control-label" for="author">Author</label>
                      </div>
        
                      <p class="red-text" style={{fontSize: 10,marginTop: '0.5em',}}>Tip: Publishers need to comply all necessary business requirements.</p>
                    </div>
                   </div> 
                   
              </div>
              <div class="modal-footer justify-content-center">
                <button type="button" onClick={this.props.closeModal} class="btn red lighten-1 white-text btn-md" data-dismiss="modal" style={{width: 160}}>Close</button>
                <button type="button" onClick={this.handleRegistration} class="btn cyan white-text btn-md" disabled={(!this.state.username) || (!this.state.password) || (this.state.password !== this.state.confirmPass)}>Create Account</button>
              </div>
            </div>
          </div>
        </div>
        );
    }
}


const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
    registerAuthor: (username, password) => dispatch(AuthService.registerAuthor(username,password)),
    registerPublisher: (username, password) => dispatch(AuthService.registerPublisher(username,password)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);

import React from 'react';
import { connect } from 'react-redux';
import AuthService from '../../services/auth.service';
import RegistrationModal from './modals/RegistrationModal';
import ForgotPasswordModal from './modals/ForgotPasswordModal';

class Container extends React.PureComponent<> {
    state = {
        username: 'test@test.com',
        password: 'testtest',
        isLoggingIn: false,
        forgotPassword: false,
    }

    handleLogin = () => {
        this.props.login(this.state.username, this.state.password)
        .catch(err => alert(err.message));
    }

    handleRegistrationAuthor = () => {
        this.props.registerAuthor(this.state.username, this.state.password)
        .catch(err => alert(err.message));
    }

    handleRegistrationPublisher = () => {
        this.props.registerPublisher(this.state.username, this.state.password)
        .catch(err => alert(err.message));
    }
    render() {
        return (
            <>
            <RegistrationModal
                isOpen={this.state.isLoggingIn}
                closeModal={() => {
                    this.setState({ isLoggingIn: false });
                }}
            />
            <ForgotPasswordModal
                isOpen={this.state.forgotPassword}
                closeModal={() => {
                    this.setState({ forgotPassword: false });
                }}
            />
          <nav class=" navbar fixed-top navbar-expand-sm" style={{height: '5em',backgroundColor: 'white'}}>
              <a id="logo-container" href="#" class="brand-logo">
                <img src="assets-3/images/sulatroniko_logo.png" style={{width: 150,marginTop: '0.15em'}} />
              </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent-4"
              aria-controls="navbarSupportedContent-4" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent-4">
              <ul class="navbar-nav ml-auto">
                <li class="nav-item active">
                  <div class="md-form form-sm">
                    <i class="fas fa-envelope prefix" style={{fontSize: '15px',marginTop: '0.6em',marginLeft: '0.5em',}}></i>
                    <input type="text" value={this.state.username} onChange={ev => this.setState({ username: ev.target.value })} class="form-control" placeholder="Email" />  
                  </div>
                </li>
                <li class="nav-item" style={{marginLeft: '1em',marginRight: '.5em'}}>
                  <div class="md-form form-sm">
                    <i class="fas fa-lock prefix"style={{fontSize: '15px',marginTop: '0.6em',marginLeft: '0.5em',}}></i> 
                    <input type="password" value={this.state.password} onChange={ev => this.setState({ password: ev.target.value })} class="form-control" placeholder="Password" />
                    <a data-toggle="modal" data-target="#forgotpass" class="blue-text" onClick={() => this.setState({forgotPassword: true})} style={{marginLeft: '2.5em', fontSize: 12}}>Forgot Password?</a>
                    
                  </div>
                </li>
                <li class="nav-item" style={{marginTop: '1.7em'}}>
                  <a class="waves-effect cyan btn btn-sm" onClick={this.handleLogin}>Login</a>
                </li>
                <li class="nav-item" style={{marginTop: '1.7em'}}>
                  <a data-toggle="modal" onClick={() => this.setState({isLoggingIn: true})} class="waves-effect btn btn-primary btn-sm">Sign Up</a>
                </li>
              </ul>
            </div>
          </nav>
          <div class="parallax-container" style={{minHeight: "100vh"}}>
            <div class="container parallax-header" style={{fontFamily: "'Libre Baskerville', serif"}}>
                  <br /><br />
                  <h1 class="text-center white-text" style={{fontSize: 50,textShadow: '-1px 1px 0 #000,  1px 1px 0 #000, 1px -1px 0 #000,-1px -1px 0 #000'}}>SulaTroniko</h1>
              
                    <h5 class="text-center white-text" style={{fontSize: 50,textShadow: '-1px 1px 0 #000,  1px 1px 0 #000, 1px -1px 0 #000,-1px -1px 0 #000', letterSpacing: 2}}>Discover new user-generated stories spanning across different genres written
                    by Philippine authors.</h5>
               
                  <div class="text-center">
                   <a class="waves-effect btn cyan btn-lg">Get Started</a>
                </div>
              </div>
          </div>
          
           <div class="container">
              <div class="section">
                <h6 class="text-center" style={{margin: '2em 0', fontSize: 25, fontWeight: 'bold'}}>LATEST PUBLISHED</h6>
                 <div class="row ">
                <div class="col-sm d-flex justify-content-center">
                 <img class="responsive-img z-depth-3" src="assets-2/images/book1.jpg" width="250" height= "300" /> 
                </div>
                <div class="col-sm d-flex justify-content-center">
                 <img class="responsive-img z-depth-3" src="assets-2/images/book1.jpg" width="250" height= "300" /> 
                </div>
                <div class="col-sm d-flex justify-content-center">
                 <img class="responsive-img z-depth-3" src="assets-2/images/book1.jpg" width="250" height= "300" /> 
                </div>
                <div class="col-sm d-flex justify-content-center">
                 <img class="responsive-img z-depth-3" src="assets-2/images/book1.jpg" width="250" height= "300" /> 
                </div>
              </div>
          
              <div class="row book-row ">
                <div class="col-sm d-flex justify-content-center">
                 <img class="responsive-img z-depth-3" src="assets-2/images/book2.jpg" width="250" height= "300" /> 
                </div>
                <div class="col-sm d-flex justify-content-center">
                 <img class="responsive-img z-depth-3" src="assets-2/images/book2.jpg" width="250" height= "300" /> 
                </div>
                <div class="col-sm d-flex justify-content-center">
                 <img class="responsive-img z-depth-3" src="assets-2/images/book2.jpg" width="250" height= "300" /> 
                </div>
                <div class="col-sm d-flex justify-content-center">
                 <img class="responsive-img z-depth-3" src="assets-2/images/book2.jpg" width="250" height= "300" /> 
                </div>
              </div>
          
                <div class="row book-row">
                  <div class="col-sm">
                  <a href="../../views/homepage/allbooks.html"style={{float: 'right',marginBottom: '2em'}}><b>See All Published Books</b></a>
                  </div>
                </div>
              
          
              </div>
           </div>
          
          
          <footer class="white-text font-small blue-grey darken-4">
          
            <div class="container">
          
              <div class="row text-center d-flex justify-content-center pt-5 mb-3">
          
                <div class="col-md-2 mb-3">
                  <h6 class="text-uppercase font-weight-bold">
                    <a href="#!" class="white-text">About us</a>
                  </h6>
                </div>
          
                <div class="col-md-2 mb-3">
                  <h6 class="text-uppercase font-weight-bold">
                    <a href="#!" class="white-text">FAQ</a>
                  </h6>
                </div>
          
                <div class="col-md-2 mb-3">
                  <h6 class="text-uppercase font-weight-bold">
                    <a href="#!" class="white-text">Contact Us</a>
                  </h6>
                </div>
          
                <div class="col-md-2 mb-3">
                  <h6 class="text-uppercase font-weight-bold">
                    <a href="#!" class="white-text">Terms</a>
                  </h6>
                </div>
          
               
          
              </div>
              <hr class="rgba-white-light" style={{margin: '0 15%'}} />
          
              <div class="row d-flex text-center justify-content-center mb-md-0 mb-4">
          
                <div class="col-md-8 col-12 mt-5">
                  <p style={{lineHeight: '1.7rem'}}>Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                    accusantium doloremque laudantium, totam rem
                    aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt
                    explicabo.
                    Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur.</p>
                </div>
          
              </div>
              <hr class="clearfix d-md-none rgba-white-light" style={{margin: '10% 15% 5%',}} />
            </div>
          
          
            <div class="footer-copyright text-center py-3" style={{background: '#1e282d'}}>© 2019 Copyright:
              <a href="https://mdbootstrap.com/education/bootstrap/" class="grey-text"> SulaTroniko. All Rights Reserved.</a>
            </div>
          
          </footer>
            </>
        );
        return (
            <div>
                login/index.js
                <input value={this.state.username} onChange={event => this.setState({username: event.target.value})} />
                <input value={this.state.password} onChange={event => this.setState({password: event.target.value})} />
                <button onClick={this.handleLogin}>login</button>


                <br />
                <br />
                <br />
                <br />
                <br />
                <input value={this.state.username} onChange={event => this.setState({username: event.target.value})} />
                <input value={this.state.password} onChange={event => this.setState({password: event.target.value})} />
                <button onClick={this.handleRegistrationAuthor}>login/register author</button>




                <br />
                <br />
                <br />
                <br />
                <br />
                <input value={this.state.username} onChange={event => this.setState({username: event.target.value})} />
                <input value={this.state.password} onChange={event => this.setState({password: event.target.value})} />
                <button onClick={this.handleRegistrationPublisher}>login/register publisher</button>
            </div>
        );
    }
}


const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    login: (username, password) => dispatch(AuthService.login(username,password)),
    registerAuthor: (username, password) => dispatch(AuthService.registerAuthor(username,password)),
    registerPublisher: (username, password) => dispatch(AuthService.registerPublisher(username,password)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);

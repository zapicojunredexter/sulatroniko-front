import React from 'react';
import { connect } from 'react-redux';
import AuthService from '../../services/auth.service';

class Container extends React.PureComponent<> {
    state = {
        username: 'test@test.com',
        password: 'testtest',
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
    <link href="assets-2/css/materialize.css" type="text/css" rel="stylesheet" media="screen,projection"/>
    <link href="assets-2/css/style.css" type="text/css" rel="stylesheet" media="screen,projection"/>
<div class="navbar-fixed">
  <nav class="blue-grey darken-4" role="navigation">
    <div class="nav-wrapper container" style={{width: '70%'}}>
      <a id="logo-container" href="#" class="brand-logo">
      Logo
    </a>
      <ul class="right hide-on-med-and-down">
        <li><a class="waves-effect cyan btn" onClick={() => alert('clicked')}>Login</a></li>
        <li><a class="waves-effect cyan btn" onClick={() => alert('clicked')}>Sign Up</a></li>
      </ul>

      <ul id="nav-mobile" class="sidenav">
        <li><a>Navbar Link</a></li>
      </ul>
      <a href="#" data-target="nav-mobile" class="sidenav-trigger right"><i class="material-icons">menu</i></a>
    </div>
  </nav>
</div>
  <div id="index-banner" class="parallax-container">
    <div class="section no-pad-bot">
      <div class="container parallax-header" style={{width: '70%'}}>
        <br /><br />
        <h1 class="header center light">SulaTroniko</h1>
        <div class="row center">
          <h5 class="header col s12 light">Discover new user-generated stories, spanning across different genres written
          by Philippine authors.</h5>
        </div>
        <div class="row center">
          <a href="#l" id="download-button" class="btn-large waves-effect waves-light cyan">Get Started</a>
        </div>
        <br /><br />

      </div>
    </div>
  </div>


  <div class="container" style={{width: '70%'}}>
    <div class="section">
      <h6 class="header center book-header">LATEST PUBLISHED</h6>
      <div class="row book-row">
        <div class="col s12 m3">
          <div class="icon-block">
           <img class="responsive-img z-depth-3" src="../../assets-2/images/book1.jpg" /> 
          </div>
        </div>

         <div class="col s12 m3">
          <div class="icon-block">
           <img class="responsive-img z-depth-3" src="../../assets-2/images/book1.jpg" /> 
          </div>
        </div>


        <div class="col s12 m3">
          <div class="icon-block">
            <img class="responsive-img z-depth-3" src="../../assets-2/images/book1.jpg" /> 
          </div>
        </div>

        <div class="col s12 m3">
          <div class="icon-block">
           <img class="responsive-img z-depth-3" src="../../assets-2/images/book1.jpg" /> 
          </div>
        </div>
      </div>

       <div class="row book-row">
        <div class="col s12 m3">
          <div class="icon-block">
           <img class="responsive-img z-depth-3" src="../../assets-2/images/book2.jpg" /> 
          </div>
        </div>

         <div class="col s12 m3">
          <div class="icon-block">
           <img class="responsive-img z-depth-3" src="../../assets-2/images/book2.jpg" /> 
          </div>
        </div>


        <div class="col s12 m3">
          <div class="icon-block">
            <img class="responsive-img z-depth-3" src="../../assets-2/images/book2.jpg" /> 
          </div>
        </div>

        <div class="col s12 m3">
          <div class="icon-block">
           <img class="responsive-img z-depth-3" src="../../assets-2/images/book2.jpg" /> 
          </div>
        </div>
      </div>

    </div>
  </div>


  <footer class="page-footer blue-grey darken-4" style={{paddingLeft: 0}}>
    <div class="footer-copyright">
      <div class="container">
       <a href="#" class="white-text footer-navigation">About Us</a>
       <a href="#" class="white-text footer-navigation">FAQ</a>
       <a href="#" class="white-text footer-navigation">Contact Us</a>
       <a href="#" class="white-text footer-navigation">Terms</a>
       <a class="right white-text">Copyright 2019 SulaTroniko. All Rights Reserved.</a>
      </div>
    </div>
  </footer>



  <script src="assets-2/js/materialize.js"></script>
    <script src="assets-2/js/init.js"></script>
    <script src="assets-2/js/index.js"></script>
            </>
        );
        return (
            <div>
                <div class="navbar-fixed">
                    <nav class="blue-grey darken-4" role="navigation">
                        <div class="nav-wrapper container">
                        <a id="logo-container" href="#" class="brand-logo">
                        </a>
                        <ul class="right hide-on-med-and-down">
                            <li><a class="waves-effect cyan btn modal-trigger">Login</a></li>
                            <li><a class="waves-effect cyan btn modal-trigger">Sign Up</a></li>
                        </ul>

                        <ul id="nav-mobile" class="sidenav">
                            <li><a href="#">Navbar Link</a></li>
                        </ul>
                        <a href="#" data-target="nav-mobile" class="sidenav-trigger right"><i class="material-icons">menu</i></a>
                        </div>
                    </nav>
                </div>


                <div id="index-banner" class="parallax-container">
                    <div class="section no-pad-bot">
                        <div class="container parallax-header">
                            <br /><br />
                            <h1 class="header center light">SulaTroniko</h1>
                            <div class="row center">
                            <h5 class="header col s12 light">Discover new user-generated stories, spanning across different genres written
                            by Philippine authors.</h5>
                            </div>
                            <div class="row center">
                            </div>
                            <br /><br />

                        </div>
                    </div>
                </div>







                <div class="container">
                    <div class="section">
                        <h6 class="header center book-header">LATEST PUBLISHED</h6>
                        <div class="row book-row">
                            <div class="col s12 m3">
                                <div class="icon-block">
                                    <img class="responsive-img z-depth-3" src="../../assets-2-2/images/book1.jpg" /> 
                                </div>
                            </div>

                            <div class="col s12 m3">
                                <div class="icon-block">
                                    <img class="responsive-img z-depth-3" src="../../assets-2-2/images/book1.jpg" /> 
                                </div>
                            </div>


                            <div class="col s12 m3">
                                <div class="icon-block">
                                    <img class="responsive-img z-depth-3" src="../../assets-2-2/images/book1.jpg" /> 
                                </div>
                            </div>

                            <div class="col s12 m3">
                                <div class="icon-block">
                                    <img class="responsive-img z-depth-3" src="../../assets-2-2/images/book1.jpg" /> 
                                </div>
                            </div>
                        </div>

                        <div class="row book-row">
                            <div class="col s12 m3">
                                <div class="icon-block">
                                    <img class="responsive-img z-depth-3" src="../../assets-2-2/images/book2.jpg" /> 
                                </div>
                            </div>

                            <div class="col s12 m3">
                                <div class="icon-block">
                                    <img class="responsive-img z-depth-3" src="../../assets-2-2/images/book2.jpg" />
                                </div>
                            </div>


                            <div class="col s12 m3">
                                <div class="icon-block">
                                    <img class="responsive-img z-depth-3" src="../../assets-2-2/images/book2.jpg" /> 
                                </div>
                            </div>

                            <div class="col s12 m3">
                                <div class="icon-block">
                                    <img class="responsive-img z-depth-3" src="../../assets-2-2/images/book2.jpg" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



                <div class="modal login-modal">
                    <div class="modal-content">
                        <h4 class="header center">Login to SulaTroniko</h4>
                        <div class="row">
                            <div class="input-field col s12">
                            <input id="email" type="email" class="validate" />
                            <label for="email_inline">Email</label>
                            <span class="helper-text" data-error="Invalid Email"></span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s12">
                            <input id="password" type="password" class="validate" />
                            <label for="password">Password</label>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <a href="#!" class="modal-close waves-effect cyan btn">Login</a>
                            <a href="#!" class="modal-close waves-effect red lighten-1 btn" style={{marginRight: '2em'}}>Cancel</a>
                        </div>
                    </div>
                </div> 
            </div>
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

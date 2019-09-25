import React from 'react';
import { connect } from 'react-redux';
import AuthService from '../../services/auth.service';
import RegistrationModal from './modals/RegistrationModal';
import ForgotPasswordModal from './modals/ForgotPasswordModal';
import AuthorService from '../../services/authors.service';
import PublisherService from '../../services/publishers.service';
import TransactionService from '../../services/transactions.service';
import Books from '../books';
import DetailsModal from '../books/DetailsModal';

class Container extends React.PureComponent<> {
    state = {
        username: '',
        password: '',
        isLoggingIn: false,
        forgotPassword: false,
        isHomeView: true,
        transactions: [],
        selectedBook: null
    }

    componentDidMount() {
        this.snapData()
    }

    snapData = async () => {
        const [,,transactions] = await Promise.all([
            await this.props.fetchAuthors(),
            await this.props.fetchPublishers(),
            await this.props.fetchTransaction(),
        ]);
        if(transactions && transactions.length) {
            this.setState({transactions: transactions.filter((item, index) => index < 8)});
        }
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

        const mapped = this.state.transactions.reduce((acc, cur, index) => {
            const categoryIndex = Math.floor(index / 4);
            if(acc[categoryIndex]) {
                acc[categoryIndex].push(cur);
            } else {
                acc[categoryIndex] = [cur];
            }
            return acc;
        }, []);
        return (
            <>

            <DetailsModal book={this.state.selectedBook} onClose={() => this.setState({selectedBook: null})} />
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
              <a id="logo-container" onClick={() => this.setState({isHomeView: true})} class="brand-logo">
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
                    <i class="fas fa-user prefix" style={{fontSize: '15px',marginTop: '0.6em',marginLeft: '0.5em',}}></i>
                    <input type="text" value={this.state.username} onChange={ev => this.setState({ username: ev.target.value })} class="form-control" placeholder="Username" />  
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
          {this.state.isHomeView ? (
              <>
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
                <h6 class="text-center" style={{margin: '2em 0', fontSize: 25, fontWeight: 'bold'}}>LATEST PUBLISHED</h6>
                
               {mapped.map((map) => {
                   return (
                    <div class="row book-row">
                        {map.map((daa) => {
                            return (
                                <div onClick={() => this.setState({selectedBook: daa})} class="col-sm d-flex justify-content-center">
                                    <img class="responsive-img z-depth-3" alt={daa.manuscript && daa.manuscript.title} src={daa.cover} width="250" height= "300" /> 
                                </div>
                            );
                        })}
                    </div>
                   );
               })}

<div class="row book-row">
        <div class="col-sm">
                    <a onClick={() => this.setState({isHomeView: false})} style={{float: 'right',marginBottom: '2em'}}><b>See All Published Books</b></a>
                    </div>
                </div>
           </div>


            <div class="faq-section" style={{minHeight: '60vh', background: '#f0f0f0',}} id="faq">
                <div class="container" style={{color: '#212121'}}>
                    <h3 style={{paddingTop: '2em'}}>Frequently Asked Questions</h3>
                    <p style={{textIndent: 50,margin: '2em 0'}}>Have a burning question for our team? Chances are, you're not the first to ask! Take a look at some of the most common questions from across our community. Still looking for answers? Reach out to our team. </p>
                    <ul>
                    <li style={{marginBottom: '1em'}}>You own your story and Sulatroniko is another venue to share your voice and create more exposure and opportunities for you to get your story published.</li>
                    <li style={{marginBottom: '1em'}}>You own all the rights to the content you create and post on the Sulatroniko.</li>
                    <li style={{marginBottom: '1em'}}>Posting on Sulatroniko doesn’t mean you lose First Rights nor would it be viewed as a reprint by a publisher.</li>
                    <li style={{marginBottom: '1em'}}>You can remove your story whenever you want, unless you already signed a contract you agreed on with a publisher.</li>
                    </ul>
                </div>
            </div>

          


            <div class="about-us-section" style={{minHeight: '100vh'}} id="about-us">
                <div class="container">
                    <h3 style={{paddingTop: '2em'}}>About Us</h3>
                    <p class="text-center" style={{marginTop: '3em'}}>Sulatroniko is an online writing platform catered toward helping local authors and publishers meet in one community to help them discover and create contents with audience near you. With Sulatroniko, members of publishing industries can directly connect to potential authors without hassle.</p>
                    <div class="row" style={{marginTop: '2em'}}>
                    <div class="col-md-4">
                    <div class="view overlay zoom" style={{borderRadius: '70%',width: 250, height: 250,margin: '0 auto'}}>
                        <img src="dianne.jpg" class="img-fluid " alt="zoom" style={{width: 250, height: 250, borderRadius: '50%'}} />
                        <div class="mask flex-center waves-effect waves-light">
                        <p class="white-text" style={{marginTop: '5em'}}>Dianne Gimenez</p>
                        </div>
                    </div>   
                    <p class="text-center" style={{fontSize: 12, color: 'gray',marginTop: '2em'}}>Dianne is currently connected to publishing companies and does freelance copyediting. She is exposed in student media organizations and often participates in pitching ideas for magazine contents.</p>
                    </div>

                    <div class="col-md-4">
                    <div class="view overlay zoom" style={{borderRadius: '70%',width: 250, height: 250,margin: '0 auto'}}>
                        <img src="osabel.jpg" class="img-fluid " alt="zoom" style={{width: 250, height: 250, borderRadius: '50%'}} />
                        <div class="mask flex-center waves-effect waves-light">
                        <p class="white-text" style={{marginTop: '5em'}}>Christine Jesusa Osabel</p>
                        </div>
                    </div>   
                    <p class="text-center" style={{fontSize: 12, color: 'gray',marginTop: '2em'}}>Christine is into website development and is open to new ideas, especially in the field of user interface designing. </p>
                    </div>

                    <div class="col-md-4">
                    <div class="view overlay zoom" style={{borderRadius: '70%',width: 250, height: 250,margin: '0 auto'}}>
                        <img src="jerome.jpg" class="img-fluid " alt="zoom" style={{width: 250, height: 250, borderRadius: '50%'}} />
                        <div class="mask flex-center waves-effect waves-light">
                        <p class="white-text" style={{marginTop: '5em'}}>Jerome Lapiña</p>
                        </div>
                    </div>   
                    <p class="text-center" style={{fontSize: 12, color: 'gray',marginTop: '2em'}}>A passionate graphics artist/UX designer accustomed to performing in a deadline-driven environment with emphasis on working with within-budget requirements, attentive to details, and most importantly, a fast learner.</p>
                    </div>
                    </div>
                </div>
            </div>
            </>
            ) : (
                <div>
                    <Books disableSnap />
                </div>
                )}
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


const mapStateToProps = state => ({
    genres: state.genresStore.genres,
    authors: state.authorsStore.authors,
    publishers: state.publishersStore.publishers,
});

const mapDispatchToProps = dispatch => ({
    login: (username, password) => dispatch(AuthService.login(username,password)),
    registerAuthor: (username, password) => dispatch(AuthService.registerAuthor(username,password)),
    registerPublisher: (username, password) => dispatch(AuthService.registerPublisher(username,password)),

    fetchAuthors: () => dispatch(AuthorService.fetchAll()),
    fetchPublishers: () => dispatch(PublisherService.fetchAll()),
    fetchTransaction: () => dispatch(TransactionService.fetchAll()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);

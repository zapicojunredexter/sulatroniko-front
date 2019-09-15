import React from 'react';
import { connect } from 'react-redux';
import Author from './forms/Author';
import Publisher from './forms/Publisher';
import CopyWriter from './forms/CopyWriter';
import Admin from './forms/Admin';
import UserService from '../../services/user.service';
import CopywriterService from '../../services/copywriters.service';
import PublisherService from '../../services/publishers.service';
import Navigation from '../../components/navigation';
import "./styles.scss"

class Container extends React.PureComponent<> {

    getCardData = () => {
        try {
            const userType = `${this.props.userType.charAt(0).toUpperCase()}${this.props.userType.slice(1).toLowerCase()}`;

            return {
                imgUrl: 'default-user.png',
                userType,
                name: this.props.user.name
            }
        } catch (err) {
            console.error(err);
            return {};
        }
    }
    renderForm = () => {
        switch(this.props.userType){
            case 'author':
                return (
                    <Author
                        setAuthor={this.props.setAuthor}
                        user={this.props.user}
                        credentials={this.props.credentials}
                    />
                );
            case 'publisher':
                return (
                    <Publisher
                        setPublisher={this.props.setPublisher}
                        user={this.props.user}
                        credentials={this.props.credentials}
                    />
                );
            case 'copywriter':
                return (
                    <CopyWriter
                        setCopywriter={this.props.setCopywriter}
                        user={this.props.user}
                        credentials={this.props.credentials}
                    />
                );
            case 'admin':
                return (
                    <Admin />
                );
            default:
                return null;
        }
    }
    render() {
        const cardData = this.getCardData();
        return (
            <main class="pt-5 mx-lg-5" style={{minHeight: '90vh'}}>
                <div class="row wow fadeIn">
                    {this.renderForm()}
                </div>
            </main>
        );
        return (
            <div className="profile-page">

                <Navigation />
                <div className="row">
                    <div className="col-sm-3">
                        <div className="profile-page__form-wrapper">
                            <div className="profile-page__card">
                                <img src={cardData.imgUrl} />
                                <h5>{cardData.name}</h5>
                                <h6>{cardData.userType}</h6>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-9">
                        <div className="profile-page__form-wrapper">
                        
                        {this.renderForm()}
                        </div>
                        
                    </div>
                </div>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    userType: state.userStore.type,
    user: state.userStore.user,
    credentials: state.userStore.credentials,
});

const mapDispatchToProps = dispatch => ({
    setAuthor: (params) => dispatch(UserService.setAuthor(params)),
    setCopywriter: (params) => dispatch(CopywriterService.setCopywriter(params)),
    setPublisher: (params) => dispatch(PublisherService.setPublisher(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);

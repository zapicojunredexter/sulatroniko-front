import React from 'react';
import { connect } from 'react-redux';
import Author from './forms/Author';
import Publisher from './forms/Publisher';
import CopyWriter from './forms/CopyWriter';
import UserService from '../../services/user.service';
import CopywriterService from '../../services/copywriters.service';
import PublisherService from '../../services/publishers.service';

class Container extends React.PureComponent<> {
    renderForm = () => {
        console.log('aray',this.props.userType);
        switch(this.props.userType){
            case 'author':
                return <Author setAuthor={this.props.setAuthor} user={this.props.user} />;
            case 'publisher':
                return <Publisher setPublisher={this.props.setPublisher} user={this.props.user} />;
            case 'copywriter':
                return <CopyWriter setCopywriter={this.props.setCopywriter} user={this.props.user} />;
            default:
                return null;
        }
    }
    render() {
        return (
            <div>
                profile/index.js
                {this.renderForm()}
            </div>
        );
    }
}


const mapStateToProps = state => ({
    userType: state.userStore.type,
    user: state.userStore.user,
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

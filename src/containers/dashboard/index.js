import React from 'react';
import { connect } from 'react-redux';
import AuthService from '../../services/auth.service';
import StorageService from '../../services/storage.service';

class Container extends React.PureComponent<> {
    state = {
        file: null,
    }
    handleFileUpload = () => {
        const filesList = Object.values(this.state.files);
        this.props.testUpload(filesList).then(() => alert('SUBMIT CHAT MESSAGE TO SERVER')).catch(err => alert('ERROR' + err.message));
    }
    render() {
        return (
            <div>
                dashboard/index.js
                <button onClick={this.props.logout}>logout</button>

                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <input type="file" onChange={event => {

                    const selectedFiles = event.target.files;
                    this.setState({files: selectedFiles});
                }} multiple />
                <button onClick={this.handleFileUpload}>SUBMIT FILE</button>
            </div>
        );
    }
}


const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(AuthService.logout()),
    testUpload: (file) => dispatch(StorageService.uploadFile(file))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);

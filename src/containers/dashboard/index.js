import React from 'react';
import { connect } from 'react-redux';
import AuthService from '../../services/auth.service';
import StorageService from '../../services/storage.service';
import { getPublicManuscripts } from '../../redux/manuscripts/manuscripts.selector';
import "./styles.scss"

class Container extends React.PureComponent<> {
    state = {
        file: null,
    }
    handleFileUpload = () => {
        const filesList = Object.values(this.state.files);
        this.props.testUpload(filesList).then(() => alert('SUBMIT CHAT MESSAGE TO SERVER')).catch(err => alert('ERROR' + err.message));
    }
    render() {
        const published = this.props.manuscripts.filter(manuscript => manuscript.status === 'published');
        const unpublished = this.props.manuscripts.filter(manuscript => manuscript.status === 'unpublished');
        return (
            <div className="dashboard__container">
                <div className="dashboard__list-wrapper">
                    <button className="btn btn-info dashboard__button">Unpublished</button>
                    <div className="row">
                        {unpublished.map(manuscript => {
                            return (
                                <div className="col-sm-3">
                                    <div className="dashboard__manuscript-card__container">
                                        <a href={manuscript.manuscript} target="_blank">
                                            
                                            <img alt={manuscript.title} src={manuscript.cover} />

                                        </a>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <button className="btn btn-info dashboard__button">Published</button>
                    <div className="row">
                        {published.map(manuscript => {
                            return (
                                <div className="col-sm-3">
                                    <div className="dashboard__manuscript-card__container">
                                        <a href={manuscript.manuscript} target="_blank">
                                            
                                            <img alt={manuscript.title} src={manuscript.cover} />

                                        </a>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                {
                    /*JSON.stringify(this.props.manuscripts)
                */
                }
            </div>
        );
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


const mapStateToProps = state => ({
    manuscripts: getPublicManuscripts(state),
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(AuthService.logout()),
    testUpload: (file) => dispatch(StorageService.uploadFile(file))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);

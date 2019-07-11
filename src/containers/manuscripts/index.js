import React from 'react';
import { connect } from 'react-redux';
import ManuscriptsService from '../../services/manuscripts.service';
import StorageService from '../../services/storage.service';
import { getOwnManuscripts } from '../../redux/manuscripts/manuscripts.selector';

class Container extends React.PureComponent<> {

    state = {
        title: null,
        genre: null,
        manuscript: null,
        synopsis: null,
        cover: null,
    }

    componentDidMount() {
        this.props.fetchAll();
    }

    handleSubmit = async () => {
        try {
            // todo upload file to storage
            const manuscriptFiles = Object.values(this.state.manuscript);
            const manuscriptPaths = await this.props.uploadManuscripts(manuscriptFiles);
            const coverFiles = Object.values(this.state.cover);
            const coverPaths = await this.props.uploadManuscripts(coverFiles);
            
            const params = {
                title: this.state.title,
                genre: this.state.genre,
                manuscript: manuscriptPaths[0],
                cover: coverPaths[0],
                synopsis: this.state.synopsis,
            };
            // adding manuscript
            
            await this.props.addManuscript(params);
            alert('uploaded');
        } catch (err) {
            alert(err.message);
        }
    }

    render() {
        return (
            <div>
                <ul>
                    {this.props.manuscripts.map(manuscript => {
                        return (
                            <li>{JSON.stringify(manuscript)}</li>
                        );
                    })}
                </ul>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                manuscripts/index.js

                title
                <input placeholder="title" onChange={(event) => this.setState({title: event.target.value})} value={this.state.title} type="text" />
                genre
                <input placeholder="genre" onChange={(event) => this.setState({genre: event.target.value})} value={this.state.genre} type="text" />
                
                cover
                <input placeholder="cover" onChange={(event) => this.setState({cover: event.target.files})} type="file" />
                
                manuscript
                <input placeholder="manuscript" onChange={(event) => this.setState({manuscript: event.target.files})} type="file" />
                
                synopsis
                <input placeholder="synopsis" onChange={(event) => this.setState({synopsis: event.target.value})} value={this.state.synopsis} type="text" />
                
                <button type="button" onClick={this.handleSubmit}>submit</button>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    manuscripts: state.manuscriptsStore.manuscripts,
    ownManuscripts: getOwnManuscripts(state),
});

const mapDispatchToProps = dispatch => ({
    fetchAll: () => dispatch(ManuscriptsService.fetchAll()),
    addManuscript: (params) => dispatch(ManuscriptsService.add(params)),
    uploadManuscripts: (file) => dispatch(StorageService.uploadFile(file))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);

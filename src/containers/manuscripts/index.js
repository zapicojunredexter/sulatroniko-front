import React from 'react';
import { connect } from 'react-redux';
import ManuscriptsService from '../../services/manuscripts.service';
import Navigation from '../../components/navigation';
import StorageService from '../../services/storage.service';
import { getOwnManuscripts } from '../../redux/manuscripts/manuscripts.selector';
import AddManuscript from './AddManuscript';
import EditManuscript from './EditManuscript';
import config from '../../config/config';
import "./styles.scss";

class Container extends React.PureComponent<> {

    state = {
        title: null,
        genre: null,
        manuscript: null,
        synopsis: null,
        cover: null,

        isAddingManuscript: false,
        isEditingManuscript: null,
    }

    componentDidMount() {
        this.fetchAll();
    }

    fetchAll = async () => {
        await this.props.fetchAll();
    }

    cancel = () => this.setState({
        isAddingManuscript: false,
        isEditingManuscript: null,
    })

    handleAdd = async (params) => {
        try {
            // todo upload file to storage
            const manuscriptFiles = Object.values(params.manuscript);
            const manuscriptPaths = await this.props.uploadManuscripts(manuscriptFiles);
            const coverFiles = Object.values(params.cover);
            const coverPaths = await this.props.uploadManuscripts(coverFiles);
            
            const payload = {
                title: params.title,
                genre: params.genre,
                genres: params.genres,
                manuscript: manuscriptPaths[0],
                cover: coverPaths[0],
                synopsis: params.synopsis,
            };
            // adding manuscript
            
            await this.props.addManuscript(payload);
            alert('succcess');
            this.setState({
                isAddingManuscript: false,
            })
        } catch (err) {
            alert(err.message);
        }
    }

    handleEdit = async (params) => {
        try {
            // todo upload file to storage
            const manuscriptFiles = Object.values(params.manuscript);
            const manuscriptPaths = await this.props.uploadManuscripts(manuscriptFiles);
            const coverFiles = Object.values(params.cover);
            const coverPaths = await this.props.uploadManuscripts(coverFiles);
            
            const payload = {
                id: params.id,
                title: params.title,
                genre: params.genre,
                genres: params.genres,
                manuscript: manuscriptPaths[0],
                cover: coverPaths[0],
                synopsis: params.synopsis,
            };
            // adding manuscript
            await this.props.updateManuscript(payload);
            alert('success');
            this.setState({
                isEditingManuscript: null,
            })
        } catch (err) {
            alert(err.message);
        }
    }

    renderManuscript = (manuscript) => {
        return (

            <div
                class="card manuscript-card"

                onClick={() => {
                    const toEdit = {
                        id: manuscript.id,
                        title: manuscript.title,
                        genre: manuscript.genre,
                        manuscript: manuscript.manuscript,
                        synopsis: manuscript.synopsis,
                        cover: manuscript.cover,
                    }
                    this.setState({
                        isEditingManuscript: toEdit,
                    });
                }}
            >
                <img class="card-img-top" src={manuscript.cover} alt={manuscript.title} />
                <div class="card-footer">
                    {manuscript.title}
                </div>
            </div>
        )
        return (
            <div
                className="manuscript-card"
            >
                
                <img src={manuscript.cover} alt={manuscript.title} title={manuscript.title} />
            </div>
        );
    }

    renderAddManuscript = () => {
        return <AddManuscript genres={this.props.genres} handleAdd={this.handleAdd} cancel={this.cancel} />;
        return (
            <div className="manuscript-form-wrapper">
                <div className="row">
                    <div className="col-sm-6">
                        <h5>Title</h5>
                        <input className="form-control" placeholder="title" onChange={(event) => this.setState({title: event.target.value})} value={this.state.title} type="text" />
                        <h5>Genre</h5>
                        <input className="form-control" placeholder="genre" onChange={(event) => this.setState({genre: event.target.value})} value={this.state.genre} type="text" />
                        <h5>Synopsis</h5>
                        <textarea className="form-control" placeholder="synopsis" onChange={(event) => this.setState({synopsis: event.target.value})} value={this.state.synopsis} type="text" rows="3"></textarea>
                    </div>
                    <div className="col-sm-6">

                        <h5>Manuscript</h5>
                        <input className="form-control" placeholder="manuscript" onChange={(event) => this.setState({manuscript: event.target.files})} type="file" />
                    
                        <h5>Cover</h5>
                        <input className="form-control" placeholder="cover" onChange={(event) => this.setState({cover: event.target.files})} type="file" />
                        
                        <br /><br />
                        <button type="button" onClick={this.cancel} className="btn btn-danger">Cancel</button>
                        {'      '}
                        <button type="button" className="btn btn-success" onClick={this.handleAdd}>Submit</button>
                        
                    </div>
                </div>
            </div>
        );
    }

    renderEditManuscript = () => {
        return <EditManuscript genres={this.props.genres} toBeUpdated={this.state.isEditingManuscript} handleEdit={this.handleEdit} setFreeFieldsManuscript={this.props.setFreeFieldsManuscript} cancel={this.cancel} fetchAll={this.fetchAll} />;
        return (
            <div>
                <div className="manuscript-form-wrapper">
                    <div className="row">
                        <div className="col-sm-6">
                            <h5>Title</h5>
                            <input className="form-control" placeholder="title" onChange={(event) => this.setState({title: event.target.value})} value={this.state.title} type="text" />
                            <h5>Genre</h5>
                            <input className="form-control" placeholder="genre" onChange={(event) => this.setState({genre: event.target.value})} value={this.state.genre} type="text" />
                            <h5>Synopsis</h5>
                            <textarea className="form-control" placeholder="synopsis" onChange={(event) => this.setState({synopsis: event.target.value})} value={this.state.synopsis} type="text" rows="3"></textarea>
                        </div>
                        <div className="col-sm-6">

                            <h5>Manuscript</h5>
                            <input className="form-control" placeholder="manuscript" onChange={(event) => this.setState({manuscript: event.target.files})} type="file" />
                        
                            <h5>Cover</h5>
                            <input className="form-control" placeholder="cover" onChange={(event) => this.setState({cover: event.target.files})} type="file" />
                            
                            <br /><br />
                            <button type="button" onClick={this.cancel} className="btn btn-danger">Cancel</button>
                            {'      '}
                            <button type="button" className="btn btn-success" onClick={this.handleEdit}>Edit</button>
                            
                        </div>
                    </div>
                </div>
            </div>
        );
    }
a
    renderMainContents = () => {
        // const published = this.props.ownManuscripts;
        // const unpublished = this.props.ownManuscripts;
        const published = this.props.ownManuscripts.filter(manuscript => manuscript.status === 'published');
        const unpublished = this.props.ownManuscripts.filter(manuscript => manuscript.status === 'unpublished');

        return (
            <div className="row">
                <div className="col-md-12"></div>
                <div className="col-md-6">
                    Unpublished <button type="button" class="btn btn-md btn-primary" onClick={() => this.setState({isAddingManuscript: true})}>ADD NEW MANUSCRIPT</button>
                    <div className="manuscripts-list-wrapper">
                        {unpublished.map(manuscript => this.renderManuscript(manuscript))}
                    </div>
                </div>
                <div className="col-md-6">
                    Published
                    <div className="manuscripts-list-wrapper">
                        {published.map(manuscript => this.renderManuscript(manuscript))}
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <main class="pt-5 mx-lg-5 threads-page-container">
                <div class="container-fluid mt-5">
                    {
                        (this.state.isAddingManuscript && this.renderAddManuscript()) ||
                        (this.state.isEditingManuscript && this.renderEditManuscript()) ||
                        this.renderMainContents()
                    }
                </div>
            </main>
        );
        return (
            <div className="manuscripts">
                <Navigation />
                <div className="manuscripts__wrapper">
                    {
                        (this.state.isAddingManuscript && this.renderAddManuscript()) ||
                        (this.state.isEditingManuscript && this.renderEditManuscript()) ||
                        this.renderMainContents()
                    }
                </div>
                {/*
                <ul>
                    {this.props.manuscripts.map(manuscript => {
                        return (
                            <li>{JSON.stringify(manuscript)}</li>
                        );
                    })}
                </ul>
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
                */}
            </div>
        );
    }
}


const mapStateToProps = state => ({
    manuscripts: state.manuscriptsStore.manuscripts,
    ownManuscripts: getOwnManuscripts(state),
    genres: state.genresStore.genres,
});

const mapDispatchToProps = dispatch => ({
    fetchAll: () => dispatch(ManuscriptsService.fetchAll()),
    addManuscript: (params) => dispatch(ManuscriptsService.add(params)),
    updateManuscript: (params) => dispatch(ManuscriptsService.edit(params)),
    setFreeFieldsManuscript: (id, params) => dispatch(ManuscriptsService.setFreeFields(id,params)), 
    uploadManuscripts: (file) => dispatch(StorageService.uploadFile(file))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);

import React from 'react';
import Select from "react-select";
import './styles.scss';

export default class Container extends React.PureComponent<> {
    
    state = {
        id: null,
        title: null,
        genre: null,
        genres: [],
        manuscript: null,
        synopsis: null,
        cover: null,
    }

    static getDerivedStateFromProps = (props, state) => {
        return {
            id: state.id || props.toBeUpdated.id,
            title: state.title || props.toBeUpdated.title,
            genre: state.genre || props.toBeUpdated.genre,
            genres: state.genres || props.toBeUpdated.genres,
            manuscript: state.manuscript || props.toBeUpdated.manuscript,
            synopsis: state.synopsis || props.toBeUpdated.synopsis,
            cover: state.cover || props.toBeUpdated.cover,
        };
    }

    handleEdit = () => {
        this.props.handleEdit(this.state);
    }

    render() {
        return (
            <div class="card">
                    <div class="card-body">
                        <div className="row" style={{margin: 15}}>
                            <div className="col-sm-6">
                                <div class="md-form" class="mb-5">
                                    <input onChange={(event) => this.setState({title: event.target.value})} value={this.state.title} type="text" id="field" class="form-control"/>
                                    {/*
                                    <label class={this.state.title && 'active'} for="field">Title</label>
                                    
                                    */}
                                </div>
                                <div class="md-form" class="mb-5">
                                    {/*
                                    <input onChange={(event) => this.setState({genre: event.target.value})} value={this.state.genre} type="text" id="field" class="form-control"/>
                                    
                                    <label class={this.state.genre && 'active'} for="field">Genre</label>
                                    
                                    */}
                                    <Select
                                        placeholder="Genres"
                                        isMulti
                                        onChange={value =>
                                            this.setState({
                                            genres: value ? value.map(val => val.value) : []
                                            })
                                        }
                                        options={[
                                            { value: "chocolate", label: "Chocolate" },
                                            { value: "strawberry", label: "Strawberry" },
                                            { value: "vanilla", label: "Vanilla" }
                                        ]}
                                        options={this.props.genres.map(genre => ({
                                            value: genre.name,
                                            label: genre.name
                                        }))}
                                    />
                                </div>
                                <div class="md-form" class="mb-5">
                                    <textarea value={this.state.synopsis} onChange={(event) => this.setState({synopsis: event.target.value})} id="field" class="md-textarea form-control" rows="2"></textarea>
                                    {/*
                                    <label class={this.state.synopsis && 'active'} for="field">Short Summary</label>
                                    
                                    */}
                                </div>
                            </div>
                            <div className="col-sm-6">

                                <div class="md-form">
                                    <input style={{borderColor: 'transparent'}} onChange={(event) => this.setState({manuscript: event.target.files})} type="file" id="field" class="form-control" />
                                    <label class={'active'} for="field">Manuscript File</label>
                                </div>
                                <div class="md-form">
                                    <input style={{borderColor: 'transparent'}} onChange={(event) => this.setState({cover: event.target.files})} type="file" id="field" class="form-control" accept="image/jpg, image/jpg, image/png,"/>
                                    <label class={'active'} for="field">Proposed Cover</label>
                                    
                                </div>
                                <button type="button" onClick={() => {
                                    this.props.setFreeFieldsManuscript(this.state.id, { deleted: true })
                                        .then(() => {
                                            alert('success');
                                            this.props.fetchAll().catch(() => {});
                                            this.props.cancel();
                                        })
                                        .catch(err => alert(err.message));
                                }} className="btn btn-danger">Delete</button>
                                {'      '}
                                <button type="button" onClick={this.props.cancel} className="btn btn-danger">Cancel</button>
                                {'      '}
                                <button disabled={!this.state.id || !this.state.title || !this.state.genres.length || !!this.state.manuscript || !this.state.synopsis || !this.state.cover} type="button" className="btn btn-success" onClick={this.handleEdit}>Submit</button>
                                
                            </div>
                        </div>
                    </div>
                </div>
        );
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
                            {'      '}
                            <button type="button" onClick={this.props.cancel} className="btn btn-danger">Cancel</button>
                            {'      '}
                            <button type="button" className="btn btn-success" onClick={this.handleEdit}>Edit</button>
                            
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


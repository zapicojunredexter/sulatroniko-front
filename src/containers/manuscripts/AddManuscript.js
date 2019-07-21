import React from 'react';
import './styles.scss';

export default class Container extends React.PureComponent<> {
    
    state = {
        title: null,
        genre: null,
        manuscript: null,
        synopsis: null,
        cover: null,
    }

    handleAdd = () => {
        this.props.handleAdd(this.state);
    }

    render() {
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
                        <input className="form-control" placeholder="cover" onChange={(event) => this.setState({cover: event.target.files})} type="file" accept="image/jpg, image/jpg, image/png," />
                        
                        <br /><br />
                        <button type="button" onClick={this.props.cancel} className="btn btn-danger">Cancel</button>
                        {'      '}
                        <button type="button" className="btn btn-success" onClick={this.handleAdd}>Submit</button>
                        
                    </div>
                </div>
            </div>
        );
    }
}


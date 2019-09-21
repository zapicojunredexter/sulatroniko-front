import React from 'react';
import { connect } from 'react-redux';
import PublisherService from '../../../services/publishers.service';
import UserService from '../../../services/user.service';
class Container extends React.PureComponent<> {
    state = {
        data: [],
        type: 'Publisher', // Copywriter, Author
    }
    componentDidMount(){
        this.fetchAllUserTypes()
    }

    fetchAllUserTypes = () => {
        // this.props.fetchAll();
        this.props.fetchAllUserTypes()
            .then((res) => {
                this.setState({data: res});
            })
            .catch(err => {});
    }
    render() {
        const publishers = this.state.data.filter(dat => dat.type === 'Publisher');
        const authors = this.state.data.filter(dat => dat.type === 'Author');
        const copywriters = this.state.data.filter(dat => dat.type === 'Copywriter');
        
        return (

            <div class="col-md-12 mb-12">
                <div style={{marginTop: '4em'}}>
                    <div class="card">
                        <div class="card-body">
                            <select onChange={ev => this.setState({type: ev.target.value})} class="form-control" style={{width: 200}}>
                                <option value="Publisher">Publisher</option>
                                <option value="Copywriter">Copywriter</option>
                                <option value="Author">Author</option>
                            </select>
                            <br />
                            <br />
                            {this.state.type === 'Publisher'  && (
                                <table class="table">
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Submission Date</th>
                                        <th>Actions</th>
                                    </tr>
                                    {publishers.map((publisher, index) => {
                                        return (
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>{publisher.name}</td>
                                                <td>{new Date(publisher.createdAt._seconds * 1000).toLocaleString()}</td>
                                                <td>
                                                    {publisher.status !== 'approved' && (
                                                        <button class="btn btn-success" onClick={() => {
                                                            this.props.approvePublisher(publisher.id)
                                                                .then(() => {
                                                                    alert('success');
                                                                    this.fetchAllUserTypes();
                                                                })
                                                                .catch(err => alert(err.message))
                                                        }}>approve</button>

                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </table>
                            )}
                            {this.state.type === 'Copywriter' && (
                                <table class="table">
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Date Registered</th>
                                        <th>Publisher</th>
                                        <th>Actions</th>
                                    </tr>
                                    {publishers.map((copywriter, index) => {
                                        return (
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>{copywriter.name}</td>
                                                <td>{new Date(copywriter.createdAt._seconds * 1000).toLocaleString()}</td>
                                                <td>
                                                    {copywriter.publisherId}
                                                </td>
                                                <td></td>
                                            </tr>
                                        );
                                    })}
                                </table>
                            )}
                            {this.state.type === 'Author' && (
                                <table class="table">
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Date Registered</th>
                                        <th>Actions</th>
                                    </tr>
                                    {publishers.map((author, index) => {
                                        return (
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>{author.name}</td>
                                                <td>{new Date(author.createdAt._seconds * 1000).toLocaleString()}</td>
                                                <td></td>
                                            </tr>
                                        );
                                    })}
                                </table>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            
        
        );
    }
}

const mapStateToProps = state => ({
    publishers: state.publishersStore.publishers,
});
const mapDispatchToProps = dispatch => ({
    fetchAll: () => dispatch(PublisherService.fetchAll()),
    approvePublisher: (id) => dispatch(PublisherService.approvePublisher(id)),
    fetchAllUserTypes: () => dispatch(UserService.fetchAllUserTypes()),
    setUser: (id,params) => dispatch(UserService.setUser(id, params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);
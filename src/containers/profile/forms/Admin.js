import React from 'react';
import { connect } from 'react-redux';
import PublisherService from '../../../services/publishers.service';
import UserService from '../../../services/user.service';
class Container extends React.PureComponent<> {
    state = {
        data: [],
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
        const publishers = this.state.data.filter(dat => dat.type === 'Publisher' && dat.status !== 'approved');
        return (

            <div class="col-md-12 mb-12">
                <div style={{marginTop: '4em'}}>
                    <div class="card">
                        <div class="card-body">
                            
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
                                                
                                                <button class="btn btn-success" onClick={() => {
                                                    this.props.approvePublisher(publisher.id)
                                                        .then(() => {
                                                            alert('success');
                                                            this.fetchAllUserTypes();
                                                        })
                                                        .catch(err => alert(err.message))
                                                }}>approve</button>
                                                {/*
                                                <button class="btn btn-danger">decline</button>
                                                */}
                                                
                                            </td>
                                        </tr>
                                    );
                                })}
                            </table>
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
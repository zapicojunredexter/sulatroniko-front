import React from 'react';
import { connect } from 'react-redux';
import PublisherService from '../../../services/publishers.service';
class Container extends React.PureComponent<> {
    componentDidMount(){
        this.props.fetchAll();
    }
    render() {
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
                                {this.props.publishers.map((publisher, index) => {
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
                                                            this.props.fetchAll()
                                                                .catch(err => {});
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
    approvePublisher: (id) => dispatch(PublisherService.approvePublisher(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);
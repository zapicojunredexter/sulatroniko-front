import React from 'react';
import { connect } from 'react-redux';
import Dropdown from '../../components/dropdown';
import UserService from '../../services/user.service';
import ThreadsService from '../../services/threads.service';
import config from '../../config/config';

import AssignManuscriptModal from './modals/AssignManuscriptModal';
import "./styles.scss"

const testData = [
    {
        name: 'cop',
        type: 'Copywriter',
        dpUrl: 'default-user.jpg'
    },
    {
        name: 'cop1',
        type: 'Copywriter',
        dpUrl: 'default-user.jpg'
    },
    {
        name: 'cop2',
        type: 'Copywriter',
        dpUrl: 'default-user.jpg'
    },
    {
        name: 'pub1',
        type: 'Publisher',
        dpUrl: 'default-user.jpg'
    },
    {
        name: 'pub2',
        type: 'Publisher',
        dpUrl: 'default-user.jpg'
    },
];
const sampleCopywriter = {"id":"y9J0jda9Lf0I7Axzjb6M","type":"Copywriter","deleted":false,"username":"copywriter","createdAt":{"_seconds":1566395553,"_nanoseconds":154000000},"password":"copywriter","updatedAt":{"_seconds":1566395553,"_nanoseconds":154000000},"jobDesc":"copywriter","email":"copywriter","name":"copywriter","phone":"copywriter","publisherId":"ZBDiz1PISsxJa7aUbOfT"};
const sampleAuthor = {"id":"54KlBSn6Ly9HXGO3cS9J","type":"Author","deleted":false,"username":"author","createdAt":{"_seconds":1566396445,"_nanoseconds":159000000},"displayPic":"https://firebasestorage.googleapis.com/v0/b/sulatroniko-6c3bd.appspot.com/o/user-uploads%2F1566396442427-chant.png?alt=media&token=9bdcdfd2-07f0-4fe3-ac01-8c361edaafd2","password":"author","updatedAt":{"_seconds":1566396084,"_nanoseconds":77000000},"location":"author","ccv":"author","phone":"author","ccnum":"authro","dob":"2019-08-21","email":"author","name":"author","biography":"author"};
const samplePublisher = {"id":"ZBDiz1PISsxJa7aUbOfT","createdAt":{"_seconds":1566395459,"_nanoseconds":654000000},"password":"publisher","updatedAt":{"_seconds":1566395459,"_nanoseconds":654000000},"type":"Publisher","deleted":false,"username":"publisher","email":"publisher","name":"publisher","contactPerson":"publisher","pubCCV":"publisher","services":"publisher","publisherId":"ZBDiz1PISsxJa7aUbOfT","pubCCNum":"publisher","website":"publisher","address":"publisher"};

class Container extends React.PureComponent<> {
    state = {
        selectedClub: 'Publisher',
        fetchedData: [],
        selectedData: null,
        selectedPublisher: null,
    };

    componentDidMount(){
        this.fetchData();
    }


    handleClickMessage = (recipientId) => {
        this.props.createThread(recipientId)
            .then((result) => {
                // window.location.href=`threads/#${result.id}`;
                window.location.href=`${config.front_url}/threads#${result.id}`;
            })
            .catch(err => alert(err.message));
    }

    handleClickManuscript = (publisher) => {
        this.setState({selectedPublisher: publisher});
    }


    fetchData = () => {
        this.props.fetchAllUserTypes()
        .then((res) => {
            this.setState({fetchedData: res});
        })
        .catch(err => alert(err.message))
    }

    renderCard = (data) => {
        return (
            <div onClick={() => this.setState({selectedData: data})} class="col-sm-4" style={{marginTop: 15}}>
                <div class="card">
                    <img class="card-img-top" src={data.displayPic || "default-user.jpg"} alt="display" />
                    <div class="card-body">
                        <h5 class="card-title">{data.name}</h5>
                        <p class="card-text"><small class="text-muted">{data.type}</small></p>
                    </div>
                </div>
            </div>
        );
    }

    renderCopywriterFields = () => {
        return (
            <>
                <div class="md-form col-sm-3">
                    <input value={this.state.selectedData.type} style={{borderColor: 'transparent'}} type="text" id="field" class="form-control" disabled/>
                    <label class={'active'} for="field">Type</label>
                </div>
                <div class="md-form col-sm-9">
                    <input value={this.state.selectedData.name} style={{borderColor: 'transparent'}} type="text" id="field" class="form-control" disabled/>
                    <label class={'active'} for="field">Name</label>
                </div>
                <div class="md-form col-sm-4">
                    <input value={this.state.selectedData.email} style={{borderColor: 'transparent'}} type="text" id="field" class="form-control" disabled/>
                    <label class={'active'} for="field">Email</label>
                </div>
                <div class="md-form col-sm-4">
                    <input value={this.state.selectedData.phone} style={{borderColor: 'transparent'}} type="text" id="field" class="form-control" disabled/>
                    <label class={'active'} for="field">Phone</label>
                </div>
                <div class="md-form col-sm-4">
                    <input value={this.state.selectedData.publisherId} style={{borderColor: 'transparent'}} type="text" id="field" class="form-control" disabled/>
                    <label class={'active'} for="field">Publisher</label>
                </div>
                <div class="md-form col-sm-12">
                    <input value={this.state.selectedData.jobDesc} style={{borderColor: 'transparent'}} type="text" id="field" class="form-control" disabled/>
                    <label class={'active'} for="field">Description</label>
                </div>
            </>
        );
    }

    renderAuthorFields = () => {
        return (
            <>
                <div class="md-form col-sm-3">
                    <input value={this.state.selectedData.type} style={{borderColor: 'transparent'}} type="text" id="field" class="form-control" disabled/>
                    <label class={'active'} for="field">Type</label>
                </div>
                <div class="md-form col-sm-9">
                    <input value={this.state.selectedData.name} style={{borderColor: 'transparent'}} type="text" id="field" class="form-control" disabled/>
                    <label class={'active'} for="field">Name</label>
                </div>
                <div class="md-form col-sm-4">
                    <input value={this.state.selectedData.dob} style={{borderColor: 'transparent'}} type="text" id="field" class="form-control" disabled/>
                    <label class={'active'} for="field">Date of Birth</label>
                </div>
                <div class="md-form col-sm-4">
                    <input value={this.state.selectedData.ccv} style={{borderColor: 'transparent'}} type="text" id="field" class="form-control" disabled/>
                    <label class={'active'} for="field">CCV</label>
                </div>
                <div class="md-form col-sm-4">
                    <input value={this.state.selectedData.phone} style={{borderColor: 'transparent'}} type="text" id="field" class="form-control" disabled/>
                    <label class={'active'} for="field">Phone</label>
                </div>
                <div class="md-form col-sm-4">
                    <input value={this.state.selectedData.email} style={{borderColor: 'transparent'}} type="text" id="field" class="form-control" disabled/>
                    <label class={'active'} for="field">Email</label>
                </div>
                <div class="md-form col-sm-4">
                    <input value={this.state.selectedData.location} style={{borderColor: 'transparent'}} type="text" id="field" class="form-control" disabled/>
                    <label class={'active'} for="field">Location</label>
                </div>
                <div class="md-form col-sm-12">
                    <input value={this.state.selectedData.biography} style={{borderColor: 'transparent'}} type="text" id="field" class="form-control" disabled/>
                    <label class={'active'} for="field">Bio</label>
                </div>
            </>
        );
    }

    renderPublisherFields = () => {
        return (
            <>
                <div class="md-form col-sm-3">
                    <input value={this.state.selectedData.type} style={{borderColor: 'transparent'}} type="text" id="field" class="form-control" disabled/>
                    <label class={'active'} for="field">Type</label>
                </div>
                <div class="md-form col-sm-9">
                    <input value={this.state.selectedData.name} style={{borderColor: 'transparent'}} type="text" id="field" class="form-control" disabled/>
                    <label class={'active'} for="field">Company</label>
                </div>
                <div class="md-form col-sm-4">
                    <input value={this.state.selectedData.email} style={{borderColor: 'transparent'}} type="text" id="field" class="form-control" disabled/>
                    <label class={'active'} for="field">Email</label>
                </div>
                <div class="md-form col-sm-4">
                    <input value={this.state.selectedData.contactPerson} style={{borderColor: 'transparent'}} type="text" id="field" class="form-control" disabled/>
                    <label class={'active'} for="field">Contact Person</label>
                </div>
                <div class="md-form col-sm-4">
                    <input value={this.state.selectedData.website} style={{borderColor: 'transparent'}} type="text" id="field" class="form-control" disabled/>
                    <label class={'active'} for="field">Website</label>
                </div>
                <div class="md-form col-sm-4">
                    <input value={this.state.selectedData.publisherId} style={{borderColor: 'transparent'}} type="text" id="field" class="form-control" disabled/>
                    <label class={'active'} for="field">Publisher</label>
                </div>
                <div class="md-form col-sm-8">
                    <input value={this.state.selectedData.address} style={{borderColor: 'transparent'}} type="text" id="field" class="form-control" disabled/>
                    <label class={'active'} for="field">Address</label>
                </div>
                <div class="md-form col-sm-6">
                    <input value={this.state.selectedData.pubCCV} style={{borderColor: 'transparent'}} type="text" id="field" class="form-control" disabled/>
                    <label class={'active'} for="field">CCV</label>
                </div>
                <div class="md-form col-sm-6">
                    <input value={this.state.selectedData.pubCCNum} style={{borderColor: 'transparent'}} type="text" id="field" class="form-control" disabled/>
                    <label class={'active'} for="field">CCNumber</label>
                </div>
                <div class="md-form col-sm-12">
                    <input value={this.state.selectedData.services} style={{borderColor: 'transparent'}} type="text" id="field" class="form-control" disabled/>
                    <label class={'active'} for="field">Services</label>
                </div>
                <div class="md-form col-sm-12">
                    <hr />
                    somethingg
                </div>
            </>
        );
    }

    render() {
        const displayData = this.state.fetchedData.filter(data => data.type === this.state.selectedClub);
        return (
            <main class="pt-5 mx-lg-5 threads-page-container">
                <AssignManuscriptModal
                    selectedPublisher={this.state.selectedPublisher}
                    closeModal={() => this.setState({selectedPublisher: null})}
                />
                <div class="container-fluid mt-5">
                    {this.state.selectedData ? (
                        <>
                        <div class="card card-outline-danger">
                            <div class="card-header">
                                {this.state.selectedData.name}
                                <button onClick={() => this.setState({selectedData: null})} type="button" class="close">
                                    <span>&times;</span>
                                </button>
                            </div>
                            
                            <div class="profile-image">
                                <img src={this.state.selectedData.displayPic || "default-user.jpg"} alt="profile_img" class="img-fluid rounded-circle mx-auto d-block" style={{margin: '0.5em', width: 200, height: 200}} />
                                
                                <div class="d-flex justify-content-center">
                                <i onClick={() => this.handleClickMessage(this.state.selectedData.id)} class="fa fa-envelope mr-3 ml-3 mt-3"></i>
                                {this.state.selectedData.type === 'Publisher' && (
                                    <i onClick={() => this.handleClickManuscript(this.state.selectedData)} class="fas fa-newspaper mr-3 ml-3 mt-3"></i>
                                )}
                                </div>
                            </div>
                            <div class="card-body row" style={{margin: 20}}>
                                {this.state.selectedData.type ==='Copywriter' && this.renderCopywriterFields()}
                                {this.state.selectedData.type ==='Author' && this.renderAuthorFields()}
                                {this.state.selectedData.type ==='Publisher' && this.renderPublisherFields()}
                                
                            </div>
                        </div>
                        </>
                        ) : (
                        <>
                                <Dropdown title="Clubs">
                                    <a class="dropdown-item" onClick={() => this.setState({selectedClub: 'Publisher'})}>Publisher</a>
                                    <a class="dropdown-item" onClick={() => this.setState({selectedClub: 'Author'})}>Author</a>
                                    <a class="dropdown-item" onClick={() => this.setState({selectedClub: 'Copywriter'})}>Copywriter</a>
                                </Dropdown>

                                <div class="row wow fadeIn">
                                    {displayData.map(this.renderCard)}
                                </div>
                        </>
                    )}
                </div>
            </main>
        );
    }
}


const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
    fetchAllUserTypes: () => dispatch(UserService.fetchAllUserTypes()),
    createThread: (userId) => dispatch(ThreadsService.createThread(userId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);
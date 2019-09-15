import React from 'react';
import { Link, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import StorageService from '../../services/storage.service';
import UserService from '../../services/user.service';
import { capitalizeFirstChar } from '../../utils/generic.helpers';

class Container extends React.PureComponent<> {

    isPathActive = path => {
        return path === this.props.location.pathname;
    }

    renderPublisherNav = () => {
        if(this.props.type !== 'Publisher')
        return null;
        return (
            <>
                <Link class={`list-group-item waves-effect ${this.isPathActive('/') && 'active'}`} to="/"><i class="fas fa-chart-pie mr-3"></i>Dashboard</Link>
                <Link class={`list-group-item list-group-item-action waves-effect ${this.isPathActive('/threads') && 'active'}`} to="/threads"><i class="fa fa-envelope mr-3"></i>Message</Link>
                <Link class={`list-group-item list-group-item-action waves-effect ${this.isPathActive('/progress') && 'active'}`} to="/progress"> <i class="fas fa-gavel mr-3"></i>Work in Progress</Link>
                <Link class={`list-group-item list-group-item-action waves-effect ${this.isPathActive('/copywriters') && 'active'}`} to="/copywriters"> <i class="fas fa-gavel mr-3"></i>Copywriters</Link>
                <Link class={`list-group-item list-group-item-action waves-effect ${this.isPathActive('/clubs') && 'active'}`} to="/clubs"> <i class="fas fa-gavel mr-3"></i>Clubs</Link>
                <a href="#" class="list-group-item list-group-item-action waves-effect">
                <i class="fas fa-money-bill-alt mr-3"></i>Transaction</a>
            </>
        );
    }
    renderAuthorNav = () => {
        if(this.props.type !== 'Author')
        return null;
        return (
            <>
                <Link class={`list-group-item waves-effect ${this.isPathActive('/') && 'active'}`} to="/"><i class="fas fa-chart-pie mr-3"></i>Dashboard</Link>
                <Link class={`list-group-item list-group-item-action waves-effect ${this.isPathActive('/manuscripts') && 'active'}`} to="/manuscripts"><i class="fas fa-newspaper mr-3"></i>Manuscript</Link>
                <Link class={`list-group-item list-group-item-action waves-effect ${this.isPathActive('/threads') && 'active'}`} to="/threads"><i class="fa fa-envelope mr-3"></i>Message</Link>
                <Link class={`list-group-item list-group-item-action waves-effect ${this.isPathActive('/progress') && 'active'}`} to="/progress"> <i class="fas fa-gavel mr-3"></i>Work in Progress</Link>
                <Link class={`list-group-item list-group-item-action waves-effect ${this.isPathActive('/clubs') && 'active'}`} to="/clubs"> <i class="fas fa-gavel mr-3"></i>Clubs</Link>
                
                <a href="#" class="list-group-item list-group-item-action waves-effect">
                <i class="fas fa-money-bill-alt mr-3"></i>Transaction</a>
            </>
        );
    }
    renderCopywriterNav = () => {
        if(this.props.type !== 'Copywriter')
        return null;
        return (
            <>
                <Link class={`list-group-item waves-effect ${this.isPathActive('/') && 'active'}`} to="/"><i class="fas fa-chart-pie mr-3"></i>Dashboard</Link>
                <Link class={`list-group-item list-group-item-action waves-effect ${this.isPathActive('/threads') && 'active'}`} to="/threads"><i class="fa fa-envelope mr-3"></i>Message</Link>
                <Link class={`list-group-item list-group-item-action waves-effect ${this.isPathActive('/progress') && 'active'}`} to="/progress"> <i class="fas fa-gavel mr-3"></i>Work in Progress</Link>
                <Link class={`list-group-item list-group-item-action waves-effect ${this.isPathActive('/clubs') && 'active'}`} to="/clubs"> <i class="fas fa-gavel mr-3"></i>Clubs</Link>
                
                <a href="#" class="list-group-item list-group-item-action waves-effect">
                <i class="fas fa-money-bill-alt mr-3"></i>Transaction</a>
            </>
        );
    }

    render() {
        return (     
            <div class="sidebar-fixed position-fixed">

                <div class="profile-image">
                    <label for="file-input" style={{width:'100%'}}>
                        <img src={this.props.dp} alt="profile_img" class="img-fluid rounded-circle mx-auto d-block" style={{margin: '0.5em', width: 200, height: 200}} />
                    </label>
                    <input
                        id="file-input"
                        onChange={async (event) => {
                            try {
                                const selectedFiles = event.target.files;
                                const filesArray = Object.values(selectedFiles);

                                const images = await this.props.uploadPic(filesArray);

                                if(images && images.length === 1){
                                    this.props.updatePicUrl(images[0]);
                                }
                            } catch (err) {
                                alert(err.message);
                            }
                        }}
                        type="file"
                        style={{display: 'none'}} />
                    <p class="text-center">{this.props.name}</p>
                    <p class="text-center" style={{marginTop: '-1em'}}>{this.props.type}</p>
                </div>
            
                <div class="list-group list-group-flush">
                    {this.renderAuthorNav()}
                    {this.renderCopywriterNav()}
                    {this.renderPublisherNav()}
                    {/*
                    */}
                    <a href="#" class="list-group-item list-group-item-action waves-effect teal-text">
                    <i class="fas fa-arrow-left mr-3"></i>Back to HomePage</a>
                    
                </div>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    dp: state.userStore.credentials && state.userStore.credentials.displayPic || 'default-user.jpg',
    name: state.userStore.user && state.userStore.user.name,
    type: capitalizeFirstChar(state.userStore.type),
});

const mapDispatchToProps = dispatch => ({
    uploadPic: (path) => dispatch(StorageService.uploadFile(path)),
    updatePicUrl: (path) => dispatch(UserService.updateProfileImageUrl(path)),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container));

// export default withRouter(Container);

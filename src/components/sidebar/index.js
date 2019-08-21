import React from 'react';
import { Link, withRouter } from "react-router-dom";

class Container extends React.PureComponent<> {

    isPathActive = path => {
        return path === this.props.location.pathname;
    }

    render() {
        console.log('ayaya', this.props);
        return (     
            <div class="sidebar-fixed position-fixed">

                <div class="profile-image">
                    <img src="../../assets/images/profile_img.jpg" class="img-fluid rounded-circle mx-auto d-block" alt="" style={{margin: '0.5em', width: 200, height: 200}} />
                    <p class="text-center">Owen Rama</p>
                    <p class="text-center" style={{marginTop: '-1em'}}>Author</p>
                    <hr />
                </div>
            
                <div class="list-group list-group-flush">
                    <Link class={`list-group-item waves-effect ${this.isPathActive('/') && 'active'}`} to="/"><i class="fas fa-chart-pie mr-3"></i>Dashboard</Link>
                    <Link class={`list-group-item list-group-item-action waves-effect ${this.isPathActive('/manuscripts') && 'active'}`} to="/manuscripts"><i class="fas fa-newspaper mr-3"></i>Manuscript</Link>
                    <Link class={`list-group-item list-group-item-action waves-effect ${this.isPathActive('/threads') && 'active'}`} to="/threads"><i class="fa fa-envelope mr-3"></i>Message</Link>
                    <Link class={`list-group-item list-group-item-action waves-effect ${this.isPathActive('/progress') && 'active'}`} to="/progress"> <i class="fas fa-gavel mr-3"></i>Work in Progress</Link>
                    <a href="#" class="list-group-item list-group-item-action waves-effect">
                        <i class="fas fa-money-bill-alt mr-3"></i>Transaction</a>
                    <a href="#" class="list-group-item list-group-item-action waves-effect teal-text">
                    <i class="fas fa-arrow-left mr-3"></i>Back to HomePage</a>
                </div>
            </div>
        );
        return (
            <div style={{backgroundColor:'orange',width:200}}>
                side bar
                <ul>
                    <li><Link to="/">dashboard</Link></li>
                    <li><Link to="/authors">authors</Link></li>
                    <li><Link to="/publishers">publishers</Link></li>
                    <li><Link to="/profile">profile</Link></li>
                    <li><Link to="/threads">threads</Link></li>
                    <li><Link to="/manuscripts">manuscripts</Link></li>
                    <li><Link to="/copywriters">copywriters</Link></li>
                </ul>
            </div>
        );
    }
}

export default withRouter(Container);

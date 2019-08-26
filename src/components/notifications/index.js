import React from 'react';
import { Link, withRouter } from "react-router-dom";
import { MDBNotification, MDBContainer } from "mdbreact";
import { connect } from 'react-redux';
import StorageService from '../../services/storage.service';
import UserService from '../../services/user.service';
import { capitalizeFirstChar } from '../../utils/generic.helpers';

class Container extends React.PureComponent<> {
    render(){
        return null;
        return (
            <MDBContainer
                style={{
                width: "auto",
                position: "fixed",
                top: "10px",
                right: "10px",
                zIndex: 9999
                }}
            >
                <MDBNotification
                show
                fade
                iconClassName="text-primary"
                icon="envelope"
                title="Bootstrap"
                message="See? Just like this."
                text="just now"
                />
                <MDBNotification
                show
                fade
                iconClassName="text-primary"
                title="Bootstrap"
                message="See? Just like this."
                text="just now"
                />
                <MDBNotification
                show
                fade
                iconClassName="text-primary"
                title="Bootstrap"
                message="Heads up, toasts will stack automatically"
                text="2 seconds ago"
                />
            </MDBContainer>
        );
    }
}


const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);

// export default withRouter(Container);

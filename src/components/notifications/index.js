import React from 'react';
import { Link, withRouter } from "react-router-dom";
import { MDBNotification, MDBContainer } from "mdbreact";
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { connect } from 'react-redux';
import StorageService from '../../services/storage.service';
import UserService from '../../services/user.service';
import NotificationService from '../../services/notification.service';
import FirebaseClient from '../../modules/FirebaseClient';

class Container extends React.PureComponent<> {
    listener = null;
    currentUser = null;
    componentDidMount() {
        this.startListening(this.props.userId);
    }

    componentWillReceiveProps(props){
        this.startListening(props.userId);
    }

    startListening = (id) => {
        this.unlisten();
        if(!id) {
            return;
        }
        const doc = FirebaseClient.instance
            .firestore()
            .collection('users')
            .doc(id);


        this.listener = 
            doc
            .collection('notifications')
            .onSnapshot(data => {
                    const result = data.docs.map(data => ({id: data.id, cardId: data.id, ...data.data()}));
                    const unread = result.filter(res => !res.isRead);
                    unread.forEach(element => {
                        this.showNotification(element); 
                    });
                }
            );

    }

    unlisten = () => {
        if(this.listener) {
            this.listener();
        }
    }

    componentWillUnmount() {
        this.unlisten();
    }

    showNotification = (notification) => {
        const { id, title, message } = notification;
        NotificationManager.info(message, title, 20000, () => {
            this.props.setNotifIsRead(id);
        });
    }
    createNotification = (type) => {
        return () => {
          switch (type) {
            case 'info':
              NotificationManager.info('Info message');
              break;
            case 'success':
              NotificationManager.success('Success message', 'Title here');
              break;
            case 'warning':
              NotificationManager.warning('Warning message', 'Close after 3000ms', 10000, () => {
                alert('callback');
              });
              break;
            case 'error':
              NotificationManager.error('Error message', 'Click me!', 5000, () => {
                alert('callback');
              });
              break;
          }
        };
    };

    render(){
        return <NotificationContainer/>;
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
    userId: state.userStore.uid
});

const mapDispatchToProps = dispatch => ({
    setNotifIsRead: (id) => dispatch(UserService.setNotifIsRead(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);

// export default withRouter(Container);

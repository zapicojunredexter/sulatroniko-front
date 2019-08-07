import React from 'react';
import { connect } from 'react-redux';
import AuthorsService from '../../services/authors.service';
import ThreadsService from '../../services/threads.service';
import config from '../../config/config';

class Container extends React.PureComponent<> {
    componentDidMount(){
        this.props.fetchAll();
    }

    
    handleClickMessage = (copywriterId) => {
        this.props.createThread(copywriterId)
            .then((result) => {
                // window.location.href=`threads/#${result.id}`;
                window.location.href=`${config.front_url}/threads#${result.id}`;
            })
            .catch(err => alert(err.message));
    }


    render() {
        return (
            <div>

                <table class="table m-3">
                    <tr>
                        <th>PUBLISHER</th>
                        <th></th>
                    </tr>
                    {this.props.authors.map(author => {
                        return (
                            <tr>
                                <td>
                                    <img src="default-user.png" style={{width: 50}} />
                                    {author.name}
                                </td>
                                <td><button onClick={() => this.handleClickMessage(author.id)} className="btn btn-secondary">message</button></td>
                                
                            </tr>
                        );
                    })}
                </table>
            </div>
        );
        return (
            <div>
                authors/index.js

                <ul>
                    {this.props.authors.map(publisher => {
                        return (
                            <li>{JSON.stringify(publisher)}</li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    authors: state.authorsStore.authors
});

const mapDispatchToProps = dispatch => ({
    fetchAll: () => dispatch(AuthorsService.fetchAll()),
    createThread: (userId) => dispatch(ThreadsService.createThread(userId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);

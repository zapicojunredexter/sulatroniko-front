import React from 'react';
import { connect } from 'react-redux';
import AuthService from '../../services/auth.service';
import StorageService from '../../services/storage.service';
import { getPublicManuscripts } from '../../redux/manuscripts/manuscripts.selector';
import Books from '../books';
import "./styles.scss"

const arrContains = (str, substr) => {
    try {
        const lowerStr = str.toLowerCase();
        const lowerSubstr = substr.toLowerCase();

        return lowerStr.indexOf(lowerSubstr) > -1;
    } catch (err) {
        return false;
    }

}
class Container extends React.PureComponent<> {
    state = {
        filterManuscripts: '',
        filterBooks: '',
    }
    componentDidMount(){

    }
    render() {
        const published = this.props.manuscripts.filter(manuscript => manuscript.status === 'published');
        const unpublished = this.props.manuscripts.filter(manuscript => manuscript.status === 'unpublished');
        const manuscripts = this.props.manuscripts;
        const transactions = this.props.transactions.filter(transaction => transaction.status === 'published');

        const keyedManuscripts = manuscripts.filter(manuscript => (
            !this.state.filterManuscripts
            || arrContains(manuscript.title,this.state.filterManuscripts)
            || arrContains(manuscript.createdAt,this.state.filterManuscripts)
            || arrContains(manuscript.author && manuscript.author.name,this.state.filterManuscripts)
        ));
        const keyedBooks = transactions.filter(({manuscript, author} )=> (
            !this.state.filterBooks
            || arrContains(manuscript.title,this.state.filterBooks)
            || arrContains(manuscript.createdAt,this.state.filterBooks)
            || arrContains(author && author.name,this.state.filterBooks)
        ));

        return (
            <main class="pt-5 mx-lg-5 threads-page-container">
                <div class="container-fluid mt-5">
                    <Books />
                    {/*
                    <div className="dashboard__container">
                        <div className="dashboard__list-wrapper">
                            <h4 style={{fontWeight: 'bold'}}>MANUSCRIPTS</h4>
                            <input value={this.state.filterManuscripts} onChange={ev => this.setState({filterManuscripts: ev.target.value})} class="form-control" style={{width: 200}} placeholder="Search..." />
                            <div className="row">
                                {keyedManuscripts.map(manuscript => {
                                    return (
                                        <div className="col-sm-3">
                                            <div className="dashboard__manuscript-card__container">
                                                <a href={manuscript.manuscript} target="_blank">
                                                    
                                                    <img alt={manuscript.title} src={manuscript.cover} />

                                                </a>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <h4 style={{fontWeight: 'bold'}}>BOOKS</h4>
                            <input value={this.state.filterBooks} onChange={ev => this.setState({filterBooks: ev.target.value})} class="form-control" style={{width: 200}} placeholder="Search..." />
                            <div className="row">
                                {keyedBooks.map(({manuscript}) => {
                                    return (
                                        <div className="col-sm-3">
                                            <div className="dashboard__manuscript-card__container">
                                                <a href={manuscript.manuscript} target="_blank">
                                                    
                                                    <img alt={manuscript.title} src={manuscript.cover} />

                                                </a>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    */}
                </div>
            </main>
        );
    }
}


const mapStateToProps = state => ({
    manuscripts: getPublicManuscripts(state),
    transactions: state.transactionsStore.transactions,
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(AuthService.logout()),
    testUpload: (file) => dispatch(StorageService.uploadFile(file))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);

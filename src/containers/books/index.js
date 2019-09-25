import React from 'react';
import { connect } from 'react-redux';

import AuthorService from '../../services/authors.service';
import PublisherService from '../../services/publishers.service';
import TransactionService from '../../services/transactions.service';
import DetailsModal from './DetailsModal';

class Container extends React.PureComponent<> {
    state = {
        selectedGenres: [],
        selectedAuthors: [],
        selectedPublishers: [],
        transactions: [],
        filterableTitle: '',
        orderType: 'desc',
        selectedBook: null,
    }
    componentDidMount() {

        this.snapData();
        return;
        // if(this.props.disableSnap) {

        // } else {
        //     this.snapData()
        // }
    }

    toggleState = (keyState, value) => {
        const oldValues = this.state[keyState];
        let newValues = [];
        if(oldValues.includes(value)) {
            newValues = oldValues.filter(val => val !== value);
        } else {
            newValues = [...oldValues, value];
        }
        this.setState({[keyState]: newValues});
    }

    snapData = async () => {
        const [,,transactions] =await Promise.all([
            await this.props.fetchAuthors(),
            await this.props.fetchPublishers(),
            await this.props.fetchTransaction(),
        ]);
        if(transactions && transactions.length) {
            this.setState({transactions: [
                ...transactions,
                //... transactions, ... transactions
            ]});
        }
    }
    render() {
        const {
            selectedGenres,
            selectedAuthors,
            selectedPublishers,
            transactions,
            filterableTitle,
            orderType
        } = this.state;
        const sorted = transactions.sort((transactionA, transactionB) => {
            const secondsA = transactionA.updatedAt._seconds;
            const secondsB = transactionB.updatedAt._seconds;
            if(orderType==='asc') {
                return secondsA - secondsB;
            }
            return secondsB - secondsA;
        });
        const filtered = sorted.filter(transaction => {
            const genres = (transaction && transaction.manuscript && transaction.manuscript.genres) || [];
            const author = transaction && transaction.author && transaction.author.name;
            const publisher = transaction && transaction.publisher && transaction.publisher.name;

            const title = transaction && transaction.manuscript && transaction.manuscript.title && transaction.manuscript.title.toLowerCase();
            const isGenre = this.state.selectedGenres.reduce((acc, cur) => {
                return genres.includes(cur);
            }, true);
            const isAuthor = !selectedAuthors.length || selectedAuthors.includes(author);
            const isPublisher = !selectedPublishers.length || selectedPublishers.includes(publisher);

            const isTitle = !filterableTitle || (title && title.toLowerCase().indexOf(filterableTitle.toLowerCase()) > -1);
            return isGenre && isAuthor && isPublisher && isTitle;
        });
        const mapped = filtered.reduce((acc, cur, index) => {
            const categoryIndex = Math.floor(index / 3);
            if(acc[categoryIndex]) {
                acc[categoryIndex].push(cur);
            } else {
                acc[categoryIndex] = [cur];
            }
            return acc;
        }, []);
        return (
            <>
    <DetailsModal book={this.state.selectedBook} onClose={() => this.setState({selectedBook: null})} />
  <div class="container-fluid" style={{minHeight: '100vh',marginTop: '7em'}}>
    <div class="section">
     
      <div class="row" style={{margin: '0 4em -2em 4em'}}>
        <div class="col-md-7">
          {/*
          <a href="../../views/homepage/index.html" style={{fontSize: 20,marginLeft: '1em'}}>Homepage</a>
        */}
        </div>
        <div class="col-md-3">
         <p style={{fontSize: 14, color: 'gray', float:'right'}}>{filtered.length} Published Books Found |<span style={{fontWeight: 'bold',color: 'black'}}> Sort By: </span> </p>
        </div>
        <div class="col-md-1" style={{marginTop: '-.4em'}}>
          <select onChange={ev => this.setState({orderType: ev.target.value})} class="browser-default custom-select custom-select-sm">
            <option value="desc">Latest</option>
            <option value="asc">Oldest</option>
          </select>
        </div>
      </div>
      <div class="row" style={true ? {} : {margin: '0 4em 4em 4em'}}>
        <div class="col-md-3" style={{marginTop: '2em'}}>
            <div class="card">
              <div class="card-body">

                <div class="row">
                  <div class="col-md-12">
                    <input type="text" class="form-control" value={this.state.filterableTitle} onChange={ev => this.setState({filterableTitle: ev.target.value})} placeholder="Search Book Title" style={{marginLeft: ".7em;"}} />
                  </div>
                  {/*
                  <div class="col-md-3">
                    <button class="btn btn-md cyan white-text" style={{marginTop: 0}}>Search</button>
                  </div>*/}
                
                </div>
                <h4 class="card-title">Filter By</h4>
                <hr />
                 <div>
                  <p>Genre</p>
                   <div class="genre-group" style={{overflowY: 'scroll'}}>
                     {this.props.genres.map((genre) => {
                         return (
                            <div class="custom-control custom-checkbox">
                                <input checked={this.state.selectedGenres.includes(genre.name)} onClick={() => this.toggleState('selectedGenres', genre.name)} type="checkbox" class="custom-control-input" id={genre.id} /> 
                                <label class="custom-control-label" for={genre.id}>{genre.name}</label> 
                            </div>
                         );
                     })}
                   </div>
                 </div>
                 {/*
                 <hr />
                  <div>
                  <p>Author</p>
                   <div class="genre-group" style={{height: '20vh',overflowY: 'scroll'}}>

                     {this.props.authors.map((author) => {
                         return (
                            <div class="custom-control custom-checkbox">
                                <input checked={this.state.selectedAuthors.includes(author.name)} onClick={() => this.toggleState('selectedAuthors', author.name)} type="checkbox" class="custom-control-input" id={author.id} /> 
                                <label class="custom-control-label" for={author.id}>{author.name}</label> 
                            </div>
                         );
                     })}
                   </div>
                 </div>
                
                 <hr />
                <div>
                  <p>Publisher</p>
                   <div class="genre-group" style={{height: '20vh',overflowY: 'scroll'}}>
                     
                        {this.props.publishers.map((publisher) => {
                            return (
                                <div class="custom-control custom-checkbox">
                                    <input  checked={this.state.selectedPublishers.includes(publisher.name)} onClick={() => this.toggleState('selectedPublishers', publisher.name)} type="checkbox" class="custom-control-input" id={publisher.id} /> 
                                    <label class="custom-control-label" for={publisher.id}>{publisher.name}</label> 
                                </div>
                            );
                        })}
                   </div>
                 </div>
                 */}
              </div>

            </div>
        </div>
        <div class="col-md-8" style={{marginLeft: '2em'}}>
        {mapped.map(mappedObj => {
            return (
                <div class="row book-row">
                    {mappedObj.map(subMappedObj => {
                        return (
                            <div class="col-md-4" onClick={() => this.setState({selectedBook: subMappedObj})}>
                                <div class="icon-block">
                                <img class="responsive-img z-depth-4" src={subMappedObj.cover} alt={subMappedObj.title} width="220" height="300" /> 
                                <p class="text-center" style={{margin: '1em 0 0 0',fontWeight: 'bold'}}>{(subMappedObj.manuscript && subMappedObj.manuscript.title)}</p>
                                <p class="text-center" style={{fontSize: 14}}>{(subMappedObj.author && subMappedObj.author.name)}</p>
                                
                                </div>
                            </div>
                        );
                    })}
                </div>
            );
        })}
        {/*
          <div class="row book-row">
            <div class="col-md-3">
              <div class="icon-block">
               <img class="responsive-img z-depth-3" src="assets-2/images/book1.jpg" width="220" height="300" /> 
              </div>
            </div>

           <div class="col-md-3">
            <div class="icon-block">
             <img class="responsive-img z-depth-3" src="assets-2/images/book1.jpg" width="220" height="300" /> 
            </div>
           </div>

          <div class="col-md-3">
            <div class="icon-block">
              <img class="responsive-img z-depth-3" src="assets-2/images/book1.jpg" width="220" height="300" /> 
            </div>
          </div>

          <div class="col-md-3">
            <div class="icon-block">
             <img class="responsive-img z-depth-3" src="assets-2/images/book1.jpg" width="220" height="300" /> 
            </div>
          </div>
        </div>

         <div class="row book-row">
          <div class="col-md-3">
            <div class="icon-block">
             <img class="responsive-img z-depth-3" src="assets-2/images/book2.jpg" width="220" height="300" /> 
            </div>
          </div>

          <div class="col-md-3">
            <div class="icon-block">
             <img class="responsive-img z-depth-3" src="assets-2/images/book2.jpg" width="220" height="300" /> 
            </div>
          </div>


          <div class="col-md-3">
            <div class="icon-block">
              <img class="responsive-img z-depth-3" src="assets-2/images/book2.jpg" width="220" height="300" /> 
            </div>
          </div>

          <div class="col-md-3">
            <div class="icon-block">
             <img class="responsive-img z-depth-3" src="assets-2/images/book2.jpg" width="220" height="300" /> 
            </div>
          </div>
         </div>
        
        */}
         <div class="row book-row">
           <div class="col s12">
               {/*
              <nav aria-label="Page navigation example" class="books-pagination">
                <ul class="pagination pg-blue" style={{float: 'right'}}>
                  <li class="page-item">
                    <a class="page-link" aria-label="Previous">
                      <span aria-hidden="true">&laquo;</span>
                      <span class="sr-only">Previous</span>
                    </a>
                  </li>
                  <li class="page-item"><a class="page-link">1</a></li>
                  <li class="page-item"><a class="page-link">2</a></li>
                  <li class="page-item"><a class="page-link">3</a></li>
                  <li class="page-item">
                    <a class="page-link" aria-label="Next">
                      <span aria-hidden="true">&raquo;</span>
                      <span class="sr-only">Next</span>
                    </a>
                  </li>
                </ul>
              </nav>
              */}
            
           </div>
         </div>
        </div>
      </div>
    </div>
  </div>
     


            </>
        );
    }
}


const mapStateToProps = state => ({
    genres: state.genresStore.genres,
    authors: state.authorsStore.authors,
    publishers: state.publishersStore.publishers,
});

const mapDispatchToProps = dispatch => ({
    fetchAuthors: () => dispatch(AuthorService.fetchAll()),
    fetchPublishers: () => dispatch(PublisherService.fetchAll()),
    fetchTransaction: () => dispatch(TransactionService.fetchAll()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);

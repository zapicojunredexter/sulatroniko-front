import React from "react";
import { connect } from "react-redux";
class Container extends React.PureComponent<> {
  render() {
    const { book } = this.props;
    const isOpen = !!book || false;
    console.log('DURS', book);
    return (
      <div
      class="modal-dialog modal-lg" 
        class={`modal fade ${isOpen && `show`}`}
        style={isOpen ? { display: "block" } : {}}
        tabindex="-1"
        role="dialog"
        aria-hidden="true"
        onClick={this.props.closeModal}
      >
          
  <div class="modal-dialog modal-lg" role="document">
      
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title w-100" id="myModalLabel">{book && book.manuscript && book.manuscript.title}</h4>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={this.props.onClose}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-md-6" >
            <img class="responsive-img z-depth-3" src={book && book.cover} alt={book && book.manuscript && book.manuscript.title} width="250" height= "300" style={{margin: 'auto', display: 'block',marginTop: '2em'}} />
          </div>
          <div class="col-md-6">
          <p style={{fontWeight: 'bold'}}>{book && book.author && book.author.name}</p>
          <hr />
          <p style={{textIndent: 50,fontSize: 14}}>
              {book && book.synopsis}
          </p>
          <p>
              Tags: {((book && book.manuscript && book.manuscript.genres) || []).map(genr => (
                <span class="badge badge-primary mr-1">{genr}</span>
              ))}
          </p>
          
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn red lighten-1 white-text btn-sm" data-dismiss="modal" onClick={this.props.onClose}>Close</button>
      </div>
    </div>

  </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);

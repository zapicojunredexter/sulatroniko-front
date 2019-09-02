import { MDBInputSelect } from "mdbreact";
import React from "react";
import { connect } from "react-redux";
import TransactionService from '../../../services/transactions.service';
import StorageService from '../../../services/storage.service';

class Container extends React.PureComponent<> {
  state = {
    cover: null,
    synopsis: '',
  };

  finishManuscript = async () => {
    const coverFiles = Object.values(this.state.cover);
    const coverPaths = await this.props.uploadManuscript(coverFiles);
    const cover = coverPaths[0];

    const transactionId = this.props.publishManuscriptTransaction && this.props.publishManuscriptTransaction.id;
    const params = {
        status: 'published',
        cover,
        synopsis: this.state.synopsis,
    };
    this.props.updateTransaction(transactionId, params)
        .then(() => {
            alert('success');
            this.props.fetchAll()
                .then(this.props.closeModal)
        })
        .catch(err => alert(err.message));
    // const coverFiles = Object.values(params.cover);
    // const coverPaths = await this.props.uploadManuscripts(coverFiles);
  }

  render() {
    const isOpen = !!this.props.publishManuscriptTransaction;
    return (
      <div
        class={`modal fade ${isOpen && `show`}`}
        style={isOpen ? { display: "block" } : {}}
        tabindex="-1"
        role="dialog"
        aria-hidden="true"
        onClick={this.props.closeModal}
      >
        <div
          onClick={ev => ev.stopPropagation()}
          class="modal-dialog modal-sm"
          role="document"
        >
          <div class="modal-content">
            <div class="modal-header">
                <h2>Publish Book</h2>
            </div>
            <div class="modal-body text-center">
              <div class="md-form">
                  <input style={{borderColor: 'transparent', marginBottom: 100}} onChange={(event) => this.setState({cover: event.target.files})} type="file" id="field" class="form-control" />
                                    
                  <label class="active" for="card-details">Cover Photo</label>
                  
              </div>
              <div class="md-form">
                  <textarea value={this.state.synopsis} onChange={(event) => this.setState({synopsis: event.target.value})} id="field" class="md-textarea form-control" rows="2"></textarea>
                  <label class={this.state.synopsis && 'active'} for="field">Official Synopsis</label>
              </div>

              

              <div class="text-center">
                <button
                    onClick={this.finishManuscript}
                    type="button"
                    class="btn btn-cyan"
                >
                    Finalize Transaction
                </button>
              </div>
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
    uploadManuscript: (files) => dispatch(StorageService.uploadFile(files)),
    fetchAll: () => dispatch(TransactionService.fetchAll()),
    updateTransaction: (id, params) => dispatch(TransactionService.updateTransaction(id, params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);

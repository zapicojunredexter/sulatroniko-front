import { MDBInputSelect } from "mdbreact";
import React from "react";
import { connect } from "react-redux";
import TransactionService from '../../../services/transactions.service';
import StorageService from '../../../services/storage.service';

class Container extends React.PureComponent<> {
  state = {
    manuscript: null,
  };

  finishManuscript = async () => {
    const manuscriptFiles = Object.values(this.state.manuscript);
    const manuscriptPaths = await this.props.uploadManuscript(manuscriptFiles);
    const manuscript = manuscriptPaths[0];

    const transactionId = this.props.finishManuscriptTransaction && this.props.finishManuscriptTransaction.id;
    const params = {
        status: 'finished',
        manuscript,
    };
    this.props.updateTransaction(transactionId, params)
        .then(() => {
            alert('success');
            this.props.fetchAll();
            this.props.closeModal();
        })
        .catch(err => alert(err.message));
    // const coverFiles = Object.values(params.cover);
    // const coverPaths = await this.props.uploadManuscripts(coverFiles);
  }

  render() {
    const isOpen = !!this.props.finishManuscriptTransaction; 
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
                <h2>Finalize Transaction</h2>
            </div>
            <div class="modal-body text-center">
              <div class="md-form">
                  <input style={{borderColor: 'transparent', marginBottom: 100}} onChange={(event) => this.setState({manuscript: event.target.files})} type="file" id="field" class="form-control" />
                                    
                  <label class="active" for="card-details">Final Manuscript File</label>
                  
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
    fetchAll: () => dispatch(TransactionService.fetchAll()),
    uploadManuscript: (files) => dispatch(StorageService.uploadFile(files)),
    updateTransaction: (id, params) => dispatch(TransactionService.updateTransaction(id, params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);

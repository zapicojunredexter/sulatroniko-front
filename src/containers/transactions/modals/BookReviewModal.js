import React from "react";
import { connect } from "react-redux";
import { getMyCopywriters } from '../../../redux/copywriters/copywriters.selector';
import TransactionService from '../../../services/transactions.service';
import NotificationService from '../../../services/notification.service';
class Container extends React.PureComponent<> {
  state = {
    bookReview: null,
  };

  render() {
    const { reviewManuscriptTransaction } = this.props;
    const isOpen = !!reviewManuscriptTransaction;
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
          class="modal-dialog cascading-modal modal-avatar modal-sm"
          role="document"
        >
          <div class="modal-content">
            <div class="modal-body text-center mb-1">
              <h7 class="mt-1 mb-2">
                  Book Review for
              </h7>
              <h5 class="mt-1 mb-2">
                  <b>
                  {reviewManuscriptTransaction && reviewManuscriptTransaction.manuscript && reviewManuscriptTransaction.manuscript.title}
                  </b>
              </h5>
              <div class="md-form">
                  <textarea value={this.state.bookReview} onChange={(event) => this.setState({bookReview: event.target.value})} id="field" class="md-textarea form-control" rows="2"></textarea>
                  <label for="field">Book Review</label>
              </div>


              <div class="text-center mt-4">
                <button
                    type="button"
                    onClick={() => {
                        const params = {
                            bookReview: this.state.bookReview,
                        };
                        this.props.updateTransaction(reviewManuscriptTransaction.id, params)
                            .then(() => {
                                alert('success');
                                this.props.closeModal();
                            })
                            .catch(err => alert(err.message))

                    }}
                    class="btn btn-cyan"
                >
                    Submit Review
                  <i class="fas fa-sign-in-alt ml-1" />
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
    copywriters: getMyCopywriters(state),
});

const mapDispatchToProps = dispatch => ({
    fetchAll: () => dispatch(TransactionService.fetchAll()),
    updateTransaction: (transacId, params) => dispatch(TransactionService.updateTransaction(transacId, params))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);

import React from "react";
import { connect } from "react-redux";
import { getMyCopywriters } from '../../../redux/copywriters/copywriters.selector';
import TransactionService from '../../../services/transactions.service';
import NotificationService from '../../../services/notification.service';
import ReviewService from '../../../services/reviews.service';
import Ratings from '../../../components/ratings';
class Container extends React.PureComponent<> {
  state = {
    comment: null,
    score: 1,
  };

  render() {
    const { reviewPublisherTransaction } = this.props;
    const isOpen = !!reviewPublisherTransaction || false;
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
                  Rate Transaction with Publisher
              </h7>
              <h5 class="mt-1 mb-2">
                  <b>
                    {reviewPublisherTransaction && reviewPublisherTransaction.publisher && reviewPublisherTransaction.publisher.name}
                  </b>
              </h5>
              <div class="md-form">
                  <textarea value={this.state.comment} onChange={(event) => this.setState({comment: event.target.value})} id="field" class="md-textarea form-control" rows="2"></textarea>
                  <label for="field">Comments</label>
              </div>
              <div class="md-form" style={{display: 'flex', justifyContent: 'center'}}>
                  <Ratings score={this.state.score} setScore={score => this.setState({score})} />
              </div>

              


              <div class="text-center mt-4">
                <button
                    type="button"
                    onClick={() => {
                        console.log('dasdas', reviewPublisherTransaction);
                        const params = {
                            comment: this.state.comment,
                            score: this.state.score,
                            revieweeId: reviewPublisherTransaction && reviewPublisherTransaction.publisherId,
                        };
                        this.props.rateUser(params)
                            .then(() => {
                                alert('success');
                                NotificationService.sendNotif(reviewPublisherTransaction && reviewPublisherTransaction.publisherId,
                                    {
                                        title: 'New rating',
                                        message: `You have been rated by ${reviewPublisherTransaction && reviewPublisherTransaction.author && reviewPublisherTransaction.author.name}`,
                                    });
                                this.props.closeModal();
                            })
                            .catch(err => alert(err.message));
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
    rateUser: (params) => dispatch(ReviewService.rateUser(params)),
    fetchAll: () => dispatch(TransactionService.fetchAll()),
    updateTransaction: (transacId, params) => dispatch(TransactionService.updateTransaction(transacId, params))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);

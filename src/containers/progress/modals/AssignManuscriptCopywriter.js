import React from "react";
import { connect } from "react-redux";
import { getMyCopywriters } from '../../../redux/copywriters/copywriters.selector';
import TransactionService from '../../../services/transactions.service';

class Container extends React.PureComponent<> {
  state = {
    visible: true,
    selctedCopywriter: null,
  };


  render() {
    const isOpen = !!this.props.assignCopywriterTransaction;
    const { assignCopywriterTransaction, copywriters } = this.props;
    const copywriter = copywriters.find(cw => cw.id === this.state.selctedCopywriter);
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
            <div class="modal-header">
              <img
                src={copywriter && copywriter.displayPic || "default-user.jpg"}
                class="rounded-circle img-responsive"
                alt="Avatar photo"
              />
            </div>
            <div class="modal-body text-center mb-1">
              <h7 class="mt-1 mb-2">
                  Assigning Manuscript to:
              </h7>
              <h5 class="mt-1 mb-2">
                {copywriter && copywriter.name}
              </h5>

              <div class="md-form ml-0 mr-0">
                  
                    <select onChange={ev => this.setState({ selctedCopywriter: ev.target.value })} className="browser-default custom-select">
                    <option>Choose your option</option>
                        {copywriters.map(cw => (
                            <option value={cw.id}>{cw.name}</option>
                        ))}
                    </select>
        
              </div>

              <div class="text-center mt-4">
                <button
                    type="button"
                    onClick={() => {
                        const params = {
                            copywriterId: this.state.selctedCopywriter,
                        };
                        this.props.assignCopywriter(assignCopywriterTransaction.id, params)
                            .then(res => {
                                alert('success');
                                this.props.fetchAll()
                                    .then(this.props.closeModal);
                            })
                            .catch(err => {
                                alert(err.message)
                            });
                    }}
                    class="btn btn-cyan"
                >
                  Assign Manuscript
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
    assignCopywriter: (transacId, params) => dispatch(TransactionService.assignCopywriter(transacId, params))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);

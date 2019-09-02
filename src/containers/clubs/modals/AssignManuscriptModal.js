import { MDBInputSelect } from "mdbreact";
import React from "react";
import { connect } from "react-redux";
import TransactionService from '../../../services/transactions.service';
import NotificationService from '../../../services/notification.service';

import { getOwnManuscripts } from '../../../redux/manuscripts/manuscripts.selector';
import "./styles.scss";

class Container extends React.PureComponent<> {
  state = {
    visible: true,
    selectedManuscript: null,
  };


  render() {
    const isOpen = !!this.props.selectedPublisher;
    const { selectedPublisher, ownManuscripts } = this.props;
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
                src={selectedPublisher && selectedPublisher.displayPic || "default-user.jpg"}
                class="rounded-circle img-responsive"
                alt="Avatar photo"
              />
            </div>
            <div class="modal-body text-center mb-1">
              <h7 class="mt-1 mb-2">
                  Assigning Manuscript to:
              </h7>
              <h5 class="mt-1 mb-2">
                {selectedPublisher && selectedPublisher.name}
              </h5>

              <div class="md-form ml-0 mr-0">
                  
                    <select onChange={ev => this.setState({ selectedManuscript: ev.target.value })} className="browser-default custom-select">
                        <option>Choose your option</option>
                        {ownManuscripts.map(manuscript => (
                            <option value={manuscript.id}>{(manuscript.title)}</option>
                        ))}
                    </select>
        
              </div>

              <div class="text-center mt-4">
                <button
                    type="button"
                    onClick={() => {
                        const params = {
                            manuscriptId: this.state.selectedManuscript,
                            publisherId: selectedPublisher.id
                        };
                        this.props.addTransaction(params)
                        .then(res => {
                            alert('success');
                            NotificationService.sendNotif(selectedPublisher.id, {
                                title: 'New Proposal',
                                message: 'You have a new Proposal Request'
                            });
                            this.props.closeModal();
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
    ownManuscripts: getOwnManuscripts(state),
});

const mapDispatchToProps = dispatch => ({
    addTransaction: (params) => dispatch(TransactionService.createTransaction(params))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);

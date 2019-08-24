import { MDBInputSelect } from "mdbreact";
import React from "react";
import { connect } from "react-redux";
import "./styles.scss";

class Container extends React.PureComponent<> {
  state = {
    cardDescription: null,
  };

  render() {
    const isOpen = this.props.visible;
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
          class="modal-dialog modal-sm"
          role="document"
        >
          <div class="modal-content">
            <div class="modal-header">
                <h2>Add Pending Card</h2>
            </div>
            <div class="modal-body text-center">
              <div class="md-form">
                  <input onChange={(event) => this.setState({cardDescription: event.target.value})} id="card-details" value={this.state.cardDescription} type="text" class="form-control"/>
                  <label for="card-details">Progress Description</label>
              </div>

              <div class="text-center">
                <button
                    onClick={() => {
                        this.props.closeModal();
                        this.props.handleAddCard(this.state.cardDescription);
                    }}
                    type="button"
                    class="btn btn-cyan"
                >
                    Add Card
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);

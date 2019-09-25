import React from "react";
import { connect } from "react-redux";
import AuthService from "../../../services/auth.service";

const initialState = {
  username: ""
};
class Container extends React.PureComponent<> {
  state = {
    ...initialState
  };
  render() {
    const isOpen = this.props.isOpen;
    return (
      <div
        class="modal fade right show"
        id="signup"
        tabindex="-1"
        role="dialog"
        aria-labelledby="myModalLabel"
        style={isOpen ? { display: "block", paddingRight: 16 } : {}}
        aria-modal="true"
      >
        <div class="modal-dialog modal-side modal-top-right" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title w-100" id="myModalLabel">
                Reset your password
              </h4>
              <button
                type="button"
                class="close"
                onClick={this.props.closeModal}
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              Please enter your username and we will send you a link to reset
              your password.
              <div class="md-form form-sm">
                <i
                  class="fas fa-user prefix"
                  style={{
                    fontSize: 15,
                    marginTop: "0.6em",
                    marginLeft: "0.5em"
                  }}
                ></i>
                <input
                  type="email"
                  value={this.state.username}
                  onChange={ev => this.setState({ username: ev.target.value })}
                  id="emailadd"
                  class="form-control"
                />
                <label for="emailadd">Username</label> <br />
              </div>
              <button
                type="button"
                class="btn cyan white-text btn-md reset-password"
                style={{ float: "right", marginTop: "-2em" }}
                data-dismiss="modal"
                onClick={() => {
                    this.props.sendEmail(this.state.username)
                        .then(() => {
                            alert('success');
                        })
                        .catch(err => alert(err.message))
                }}
              >
                Send Email
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    sendEmail: (username) => dispatch(AuthService.requestAppRetrieval(username))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);

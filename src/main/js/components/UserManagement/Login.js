import classnames from "classnames";
import { MDBAnimation, MDBCol, MDBContainer, MDBInput, MDBRow } from "mdbreact";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { login } from "../../actions/securityActions";
class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    if (this.props.security.validToken) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.security.validToken) {
      this.props.history.push("/dashboard");
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  onSubmit(e) {
    e.preventDefault();
    const LoginRequest = {
      username: this.state.username,
      password: this.state.password,
    };
    this.props.login(LoginRequest);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="login">
        <MDBContainer>
          <MDBRow>
            <MDBCol md="8 m-auto">
              <h1 className="display-4 text-center scrumLobster">Log In</h1>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <MDBInput
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.username
                    })}
                    style={{ color: "Chartreuse" }}
                    material label="Email Address"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChange}
                  />
                  {errors.username && (
                    <MDBAnimation className="scrumFlash" infinite>
                      <h1 className="scrumRockError" append="invalid-feedback ">{errors.username}</h1>
                    </MDBAnimation>
                  )}
                </div>
                <div className="form-group">
                  <MDBInput
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.password
                    })}
                    style={{ color: "Chartreuse" }}
                    material label="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                  {errors.password && (
                    <MDBAnimation className="scrumFlash" infinite>
                      <h1 className="scrumRockError" append="invalid-feedback ">{errors.password}</h1>
                    </MDBAnimation>
                  )}
                </div>
                <input type="submit" className="scrumLabel scrumBtn btn-block" style={{ maxWidth: '1000px', maxHeight: '50px', minWidth: '30px', minHeight: '45px' }} />
              </form>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div >
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  security: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  security: state.security,
  errors: state.errors,
});

export default connect(mapStateToProps, { login })(Login);

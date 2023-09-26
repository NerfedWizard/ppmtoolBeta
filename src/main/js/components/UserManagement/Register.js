import classnames from "classnames";
import { MDBAnimation, MDBCol, MDBContainer, MDBInput, MDBRow } from "mdbreact";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { createNewUser } from "../../actions/securityActions";
class Register extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      fullName: "",
      password: "",
      confirmPassword: "",
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
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  onSubmit(e) {
    e.preventDefault();
    const newUser = {
      username: this.state.username,
      fullName: this.state.fullName,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
    };

    this.props.createNewUser(newUser, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="register">
        <MDBContainer>
          <MDBRow>
            <MDBCol md="8 m-auto">
              <h1 className="display-4 text-center scrumLobster">Sign Up</h1>
              <p className="lead text-center scrumLobster">
                Create your Account
              </p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <MDBInput
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.fullName
                    })}
                    style={{ color: "Chartreuse" }}
                    material label="Full Name"
                    name="fullName"
                    value={this.state.fullName}
                    onChange={this.onChange}
                  />
                  {errors.fullName && (
                    <MDBAnimation className="scrumFlash" infinite>
                      <h1 className="scrumRockError" append="invalid-feedback ">{errors.fullName}</h1>
                    </MDBAnimation>
                  )}
                </div>
                <div className="form-group">
                  <MDBInput
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.username
                    })}
                    style={{ color: "Chartreuse" }}
                    material label="Email Address (Username)"
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
                <div className="form-group" >
                  <MDBInput
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.confirmPassword
                    })}
                    style={{ color: "Chartreuse" }}
                    material label="Confirm Password"
                    name="confirmPassword"
                    value={this.state.confirmPassword}
                    onChange={this.onChange}
                  />
                  {errors.confirmPassword && (
                    <MDBAnimation className="scrumFlash" infinite>
                      <h1 className="scrumRockError" append="invalid-feedback ">{errors.confirmPassword}</h1>
                    </MDBAnimation>
                  )}
                </div>
                <input type="submit" className="scrumLabel scrumBtn btn-block" style={{ maxWidth: '1000px', maxHeight: '50px', minWidth: '30px', minHeight: '45px' }} />
              </form >
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
}
Register.propTypes = {
  createNewUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  security: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  security: state.security,
});
export default connect(mapStateToProps, { createNewUser })(Register);

import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
class Landing extends Component {
  componentDidMount() {
    if (this.props.security.validToken) {
      this.props.history.push("/dashboard");
    }
  }
  render() {
    return (
      <div className="landing">
        <div className="landing-inner">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className=" scrumCharmon">
                  Personal Project Management Tool
                </h1>
                <p className="scrumFuzzyBubbles">
                  Create your account to join active projects or start your own
                </p>
                <hr />
                <Link
                  className="btn scrumLabel scrumBtn mr-2"
                  style={{ maxWidth: '1000px', maxHeight: '50px', minWidth: '250px', minHeight: '45px', color: "goldenRod" }}
                  to="/register"
                >
                  Sign Up
                </Link>
                <Link
                  className="btn scrumLabel scrumBtn mr-2"
                  style={{ maxWidth: '1000px', maxHeight: '50px', minWidth: '250px', minHeight: '45px', color: "goldenRod" }}
                  to="/login"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  security: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  security: state.security,
});

export default connect(mapStateToProps)(Landing);

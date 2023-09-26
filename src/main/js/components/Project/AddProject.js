import classnames from "classnames";
import { MDBAnimation, MDBCol, MDBContainer, MDBInput, MDBRow } from "mdbreact";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { createProject } from "../../actions/projectActions";
//Work on handling the errors through css
class AddProject extends Component {
  constructor() {
    super();

    this.state = {
      projectName: "",
      projectIdentifier: "",
      description: "",
      startDate: "",
      endDate: "",
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  //life cycle hooks
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    const newProject = {
      projectName: this.state.projectName,
      projectIdentifier: this.state.projectIdentifier,
      description: this.state.description,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
    };

    this.props.createProject(newProject, this.props.history);
  }
  render() {
    const { errors } = this.state;
    return (
      <div>
        <div className="projects">
          <MDBContainer>
            <MDBRow>
              <MDBCol md="9">
                <h5 className="display-4 text-center scrumYujiMai">
                  Create Project form
                </h5>
                <hr />
                <form onSubmit={this.onSubmit}>
                  <div className="form-group scrumOffside">
                    <MDBInput
                      type="text"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.projectName
                      })}
                      style={{ color: "Chartreuse" }}
                      material label="Project Name"
                      name="projectName"
                      value={this.state.projectName}
                      onChange={this.onChange}
                    />
                    {errors.projectName && (
                      <MDBAnimation className="scrumFlash" infinite>
                        <h1 className="scrumRockError" append="invalid-feedback ">{errors.projectName}</h1>
                      </MDBAnimation>
                    )}
                  </div>
                  <div className="form-group scrumOffside">
                    <MDBInput
                      type="text"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.projectIdentifier
                      })}
                      style={{ color: "Chartreuse" }}
                      material label="Unique Project ID"
                      name="projectIdentifier"
                      value={this.state.projectIdentifier}
                      onChange={this.onChange}
                    />
                    {errors.projectIdentifier && (
                      <MDBAnimation className="scrumFlash" infinite>
                        <h1 className="scrumRockError" append="invalid-feedback ">{errors.projectIdentifier}</h1>
                      </MDBAnimation>
                    )}
                  </div>
                  <div className="form-group scrumOffside">
                    <MDBInput type="textarea"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.description
                      })}
                      style={{ color: "Chartreuse" }}
                      material label="Project Description"
                      name="description"
                      value={this.state.description}
                      onChange={this.onChange}
                    />
                    {errors.description && (
                      <MDBAnimation className="scrumFlash" infinite>
                        <h1 className="scrumRockError" append="invalid-feedback ">{errors.description}</h1>
                      </MDBAnimation>
                    )}
                  </div>
                  <h6 style={{ color: "YellowGreen" }}>Start Date</h6>
                  <div className="form-group scrumOffside">
                    <MDBInput
                      type="date"
                      className="md-form mdb-react-date__picker"
                      name="start_date"
                      value={this.state.start_date}
                      onChange={this.onChange}
                    />
                  </div>
                  <h6 style={{ color: "YellowGreen" }}>Estimated End Date</h6>
                  <div className="form-group scrumOffside">
                    <MDBInput
                      type="date"
                      className="md-form mdb-react-date__picker"
                      name="end_date"
                      value={this.state.end_date}
                      onChange={this.onChange}
                    />
                  </div>

                  <input
                    type="submit" className="scrumLabel scrumBtn btn-block" style={{ maxWidth: '1000px', maxHeight: '50px', minWidth: '30px', minHeight: '45px' }}
                  />
                </form>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>
      </div>
    );
  }
}
AddProject.propTypes = {
  createProject: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default connect(mapStateToProps, { createProject })(AddProject);

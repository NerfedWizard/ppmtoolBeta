import classnames from "classnames";
import { MDBAnimation, MDBCol, MDBContainer, MDBInput, MDBRow } from "mdbreact";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { createProject, getProject } from "../../actions/projectActions";
class UpdateProject extends Component {
  //set state
  constructor() {
    super();

    this.state = {
      id: "",
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    const {
      id,
      projectName,
      projectIdentifier,
      description,
      startDate,
      endDate,
    } = nextProps.project;

    this.setState({
      id,
      projectName,
      projectIdentifier,
      description,
      startDate,
      endDate,
    });
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getProject(id, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    const updatedProject = {
      id: this.state.id,
      projectName: this.state.projectName,
      projectIdentifier: this.state.projectIdentifier,
      description: this.state.description,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
    };
    this.props.createProject(updatedProject, this.props.history);
  }
  render() {
    const { errors } = this.state;
    return (
      <div className="projects">
        <MDBContainer>
          <MDBRow>
            <MDBCol md="9">
              <h5 className="display-4 text-center scrumYujiMai">
                Update Project
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
                    style={{ color: "Chartreuse" }}
                    material label="ID cannot be changed"
                    name="projectIndentifier"
                    value={this.state.projectIndentifier}
                    disabled
                  />
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
                <h6 style={{ color: "Chartreuse" }}>Start Date</h6>
                <div className="form-group scrumOffside">
                  <MDBInput
                    type="date"
                    className="md-form mdb-react-date__picker"
                    name="start_date"
                    value={this.state.start_date}
                    onChange={this.onChange}
                  />
                </div>
                <h6 style={{ color: "Chartreuse" }}>Estimated End Date</h6>
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
                  type="submit"
                  type="submit" className="scrumLabel scrumBtn btn-block" style={{ maxWidth: '2000px', maxHeight: '50px', minWidth: '50px', minHeight: '45px' }}
                />
              </form>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
}

UpdateProject.propTypes = {
  getProject: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
  createProject: PropTypes.func.isRequired,
  errors: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  project: state.project.project,
  errors: state.errors,
});

export default connect(mapStateToProps, { getProject, createProject })(
  UpdateProject
);

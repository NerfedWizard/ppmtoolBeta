import classnames from "classnames";
import { MDBAnimation, MDBCol, MDBContainer, MDBInput, MDBRow } from "mdbreact";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  getProjectTask, updateProjectTask
} from "../../../actions/backlogActions";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { FormHelperText } from "@mui/material";

class UpdateProjectTask extends Component {
  constructor() {
    super();

    this.state = {
      id: "",
      projectSequence: "",
      summary: "",
      acceptanceCriteria: "",
      status: "",
      priority: "",
      dueDate: "",
      projectIdentifier: "",
      create_At: "",
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChangeStatus = this.handleChangeStatus.bind(this);
    this.handleChangePriority = this.handleChangePriority.bind(this);
  }

  componentDidMount() {
    const { backlog_id, pt_id } = this.props.match.params;
    this.props.getProjectTask(backlog_id, pt_id, this.props.history);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    const {
      id,
      projectSequence,
      summary,
      acceptanceCriteria,
      status,
      priority,
      dueDate,
      projectIdentifier,
      create_At,
    } = nextProps.project_task;

    this.setState({
      id,
      projectSequence,
      summary,
      acceptanceCriteria,
      status,
      priority,
      dueDate,
      projectIdentifier,
      create_At,
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  //handleChange
  //handleChange
  handleChangeStatus(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleChangePriority(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();

    const UpdateProjectTask = {
      id: this.state.id,
      projectSequence: this.state.projectSequence,
      summary: this.state.summary,
      acceptanceCriteria: this.state.acceptanceCriteria,
      status: this.state.status,
      priority: this.state.priority,
      dueDate: this.state.dueDate,
      projectIdentifier: this.state.projectIdentifier,
      create_At: this.state.create_At,
    };

    // console.log(UpdateProjectTask);
    this.props.updateProjectTask(
      this.state.projectIdentifier,
      this.state.projectSequence,
      UpdateProjectTask,
      this.props.history
    );
  }

  render() {
    const { errors } = this.state;
    return (
      <div>
        <div className="add-PBI">
          <MDBContainer>
            <MDBRow>
              <MDBCol md="12">
                <Link
                  to={`/projectBoard/${this.state.projectIdentifier}`}
                  className="btn scrumBtn "
                  style={{ color: "#FF8C00" }}
                >
                  Back to Project Board
                </Link>
                <h4 className="display-4 text-center scrumLobster">
                  Update Project Task
                </h4>
                <p className="lead text-center scrumBioRhyme">
                  Project Name: {this.state.projectIdentifier} | Project Task ID:{" "}
                  {this.state.projectSequence}{" "}
                </p>
                <form onSubmit={this.onSubmit}>
                  <div className="form-group scrumOffside">
                    <MDBInput
                      type="text"
                      className={classnames(
                        "form-control form-control-lg scrumBioRhyme",
                        {
                          "is-invalid": errors.summary,
                        }
                      )}
                      style={{ color: "Chartreuse" }}
                      material label="Project Task summary"
                      name="summary"
                      value={this.state.summary}
                      onChange={this.onChange}
                    />
                    {errors.summary && (
                      <MDBAnimation className="scrumFlash" infinite>
                        <h1 className="scrumRockError" append="invalid-feedback ">{errors.summary}</h1>
                      </MDBAnimation>
                    )}
                    <label style={{ color: "#98FB98" }}>
                      Summary
                    </label>
                  </div>
                  <div className="form-group scrumOffside">
                    <MDBInput
                      type="textarea"
                      style={{ color: "Chartreuse" }}
                      material label="Acceptance Criteria"
                      name="acceptanceCriteria"
                      value={this.state.acceptanceCriteria}
                      onChange={this.onChange}
                    />
                    <label style={{ color: "#98FB98" }}>
                      Acceptance Criteria
                    </label>
                  </div>
                  <h6 className="scrumLabel" style={{ color: "#98FB98" }}>Due Date</h6>
                  <div className="form-group scrumOffside">
                    <MDBInput
                      type="date"
                      className="md-form mdb-react-date_picker"
                      name="dueDate"
                      value={this.state.dueDate}
                      onChange={this.onChange}
                      style={{ color: "#98FB98" }}
                    />
                  </div>
                  <FormControl fullWidth>
                    <Select
                      labelId="scrum-select-label"
                      id="scrum-select"
                      name="priority"
                      value={this.state.priority}
                      onChange={this.handleChangePriority}
                    >
                      <MenuItem value={0} style={{ color: "white" }}>
                        Select Priority
                      </MenuItem>
                      <MenuItem value={1} style={{ color: "firebrick" }}>HIGH</MenuItem>
                      <MenuItem value={2} style={{ color: "GoldenRod" }}>MEDIUM</MenuItem>
                      <MenuItem value={3} style={{ color: "limegreen" }}>LOW</MenuItem>
                    </Select>
                    <FormHelperText style={{ color: "MediumSpringGreen" }}>Select Priority</FormHelperText>
                  </FormControl>
                  <FormControl fullWidth>
                    <Select
                      labelId="scrum-select-status"
                      id="scrum-select"
                      name="status"
                      value={this.state.status}
                      onChange={this.handleChangeStatus}
                    >
                      <MenuItem value=" " style={{ color: "firebrick" }}>
                        Select Status
                      </MenuItem>
                      <MenuItem value="TO_DO" style={{ color: "GoldenRod" }}>TO DO</MenuItem>
                      <MenuItem value="IN_PROGRESS" style={{ color: "DodgerBlue" }}>IN PROGRESS</MenuItem>
                      <MenuItem value="DONE" style={{ color: "Green" }}>DONE</MenuItem>
                    </Select>
                    <FormHelperText style={{ color: "MediumSpringGreen" }}>Select Status</FormHelperText>
                  </FormControl>
                  <input
                    type="submit" className="scrumLabel scrumBtn btn-block" style={{ maxWidth: '2000px', maxHeight: '50px', minWidth: '50px', minHeight: '45px' }}
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

UpdateProjectTask.propTypes = {
  getProjectTask: PropTypes.func.isRequired,
  project_task: PropTypes.object.isRequired,
  updateProjectTask: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  project_task: state.backlog.project_task,
  errors: state.errors,
});

export default connect(mapStateToProps, { getProjectTask, updateProjectTask })(
  UpdateProjectTask
);
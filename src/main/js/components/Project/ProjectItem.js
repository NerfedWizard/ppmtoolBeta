import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProject } from "../../actions/projectActions";
class ProjectItem extends Component {
  onDeleteClick = (id) => {
    this.props.deleteProject(id);
  };

  render() {
    const { project } = this.props;
    return (
      <div className="container">
        <div className="card card-body mb-3 bg-scrummaster">
          <div className="row">
            <div className="col-2">
              <span className="mx-auto scrumSource">
                {project.projectIdentifier}
              </span>
            </div>
            <div className="col-lg-6 col-md-4 col-8 scrumOffside">
              <h3>{project.projectName}</h3>
              <p className="scrumBioRhyme">{project.description}</p>
            </div>
            <div className="col-md-4 d-none d-lg-block ">
              <ul className="list-group ">
                <Link to={`/projectBoard/${project.projectIdentifier}`}>
                  <li className="list-group-item board projectScrum">
                    <i
                      className="fa fa-flag-checkered pr-1 scrumLabel"
                      style={{ color: "indigo" }}
                    >
                      {" "}
                      Project Board{" "}
                    </i>
                  </li>
                </Link>
                <Link to={`/updateProject/${project.projectIdentifier}`}>
                  <li className="list-group-item board update">
                    <i
                      className="fa fa-edit pr-1 scrumLabel"
                      style={{ color: "MidnightBlue" }}
                    >
                      Update Project Info
                    </i>
                  </li>
                </Link>

                <li
                  className="list-group-item board delete"
                  onClick={this.onDeleteClick.bind(
                    this,
                    project.projectIdentifier
                  )}
                >
                  <i className="fa fa-minus-circle pr-1 scrumLabel" style={{ color: "black" }}> Delete Project</i>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProjectItem.propTypes = {
  deleteProject: PropTypes.func.isRequired,
};

export default connect(null, { deleteProject })(ProjectItem);

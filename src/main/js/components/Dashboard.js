import { MDBAnimation, MDBCol, MDBContainer, MDBRow } from "mdbreact";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { getProjects } from "../actions/projectActions";
import CreateProjectButton from "./Project/CreateProjectButton";
import ProjectItem from "./Project/ProjectItem";


class Dashboard extends Component {
  componentDidMount() {
    this.props.getProjects();
  }
  render() {
    const { projects } = this.props.project;
    return (
      <div className="projects">
        <MDBContainer>
          <MDBRow>
            <MDBCol md="12 m-auto" style={{ margin: 0 }}>
              <MDBAnimation className="scrumAnimateRubberBand">
                <h2 className="display-2 text-center scrumCharmon">
                  Kanban Project
                </h2>
                <h1 className="display-9 text-center scrumRockSalt">
                  Scrum As You Are
                </h1>
              </MDBAnimation>
              <br />
              <CreateProjectButton />
              <br />
              <hr />
              {projects.map((project) => (
                <ProjectItem key={project.id} project={project} />
              ))}
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
}

Dashboard.propTypes = {
  project: PropTypes.object.isRequired,
  getProjects: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  project: state.project,
});

export default connect(mapStateToProps, { getProjects })(Dashboard);

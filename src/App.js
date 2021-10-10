import React, { Component } from "react";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Layout } from "./components/Layout";
import { Main } from "./components/Main";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projects: [],
      loading: true,
      nameSearch: "",
    };
  }

  componentDidMount() {
    fetch("projects.json")
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          projects: data,
          loading: false,
        });
      });
  }

  render() {
    return (
      <Layout>
        <Header>ScratchBackup</Header>
        <Main>
          <h2>What is ScratchBackup?</h2>
          <p>
            ScratchBackup is a tool that automatically pulls your code every 30
            minutes and publishes it to GitHub.
          </p>

          <h2>What's backed up?</h2>
          <p>
            Only your <i>code</i> is backed up by this service. No assets are
            backed up - This is just for your convenience to revert to a
            previous copy. Previous assets are already saved by Scratch, and
            should automatically reappear, as long as you're connected to the
            internet.
          </p>

          <p>
            Restoring your previous project should be as easy as redownloading
            the project as a ".sb", ".sb2" or ".sb3" file and importing it into
            Scratch.
          </p>

          <h3>How do I get signed up?</h3>
          <p>
            We have a{" "}
            <a href="https://docs.google.com/forms/d/e/1FAIpQLScMXAtkgyMDAWvrDvLAg6D0elCOWg1mrBEFsi1AcwtE0zD3vw/viewform">
              web form
            </a>{" "}
            that you can fill out.
          </p>

          <h2>Projects</h2>

          <h3>Search Options</h3>
          <div className="form">
            <div className="form-item">
              <label htmlFor="name">Name of Project</label>
              <input
                name="name"
                placeholder="Enter a name of a project to search for"
                value={this.state.nameSearch}
                onChange={(e) => this.setState({ nameSearch: e.target.value })}
              ></input>
            </div>
          </div>

          <h3>Results</h3>

          {this.state.loading ? (
            <p>Loading...</p>
          ) : (
            <table class="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Created</th>
                  <th>Modified</th>
                  <th>Project File</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.state.projects
                  .filter((project) =>
                    project.title.toLowerCase().includes(this.state.nameSearch.toLowerCase())
                  )
                  .map((project) => {
                    const created = new Date(project.created);
                    const modified = new Date(project.modified);

                    return (
                      <tr key={project.id}>
                        <td>{project.id}</td>
                        <td>{project.title}</td>
                        <td>
                          {created.toLocaleDateString()}{" "}
                          {created.toLocaleTimeString()}
                        </td>
                        <td>
                          {modified.toLocaleDateString()}{" "}
                          {modified.toLocaleTimeString()}
                        </td>
                        <td>
                          <div className="actions">
                            {project.version === "1.4" ? (
                              <a
                                href={`projects/${project.id}/project.sb`}
                                target="_blank"
                              >
                                project.sb
                              </a>
                            ) : (
                              <a
                                href={`projects/${project.id}/project.json`}
                                target="_blank"
                              >
                                project.json
                              </a>
                            )}
                            {project.version === "2.0" && (
                              <a
                                href={`projects/${project.id}/project.json`}
                                download="project.sb2"
                                target="_blank"
                              >
                                (as .sb2)
                              </a>
                            )}
                            {project.version === "3.0" && (
                              <a
                                href={`projects/${project.id}/project.json`}
                                download="project.sb3"
                                target="_blank"
                              >
                                (as .sb3)
                              </a>
                            )}
                          </div>
                        </td>
                        <td>
                          <div className="actions">
                            <a
                              href={`https://scratch.mit.edu/projects/${project.id}/`}
                              target="_blank"
                            >
                              View in Scratch
                            </a>
                            <a
                              href={`projects/${project.id}/api-res.json`}
                              target="_blank"
                            >
                              View full metadata
                            </a>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          )}
          <p>
            <small>All date/times are for your region.</small>
          </p>
        </Main>
        <Footer>
          <p>
            ScratchBackup is a website unrelated to Scratch and/or MIT. We're
            open source at{" "}
            <a href="https://github.com/scratchbackup/scratchbackup.github.io">
              GitHub
            </a>
            !
          </p>
        </Footer>
      </Layout>
    );
  }
}

export { App };

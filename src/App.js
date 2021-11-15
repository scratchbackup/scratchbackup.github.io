import React, { Component } from "react";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Layout } from "./components/Layout";
import { Main } from "./components/Main";
function preventTags(str) {
    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;') ;
}
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
    const projects = this.state.projects
      .filter((project) =>
        project.title
          .toLowerCase()
          .includes(this.state.nameSearch.toLowerCase())
      )

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
            the project as a ".sb", ".json" or ".sbcomp" file and importing it into
            Scratch.
          </p>

          <h3>How do I get my project added?</h3>
          <p>
            We have a{" "}
            <a href="https://docs.google.com/forms/d/e/1FAIpQLScMXAtkgyMDAWvrDvLAg6D0elCOWg1mrBEFsi1AcwtE0zD3vw/viewform">
              web form
            </a>{" "}
            that you can fill out.
          </p>
          <h3>What is the .sbcomp format?</h3>
          <p>.sbcomp is a custom file extension name that stands for "Scratch Binary Compression", so you don't accidentally open your file in a different application. You can still upload the file to a Scratch online editor, and all your project's code and assets will be there.
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
                type="search"
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
                {projects.length === 0 && (
                  <tr>
                    <td colSpan="6">
                      There are no results to your search query. Consider
                      broadening your search.
                    </td>
                  </tr>
                )}
                {
                  projects.map((project) => {
                    const created = new Date(project.created);
                    const modified = new Date(project.modified);

                    return (
                      <tr key={project.id}>
                        <td>{project.id}</td>
                        <td>{preventTags(project.title)}</td>
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
                                target="_blank" download={`${project.id}.sb`}
                              >
                                project.sb
                              </a>
                            ) : (
                              <a
                                href={`projects/${project.id}/project.json`}
                                target="_blank" download={`${project.id}.json`}
                              >
                                project.json
                              </a>
                            )}
                            {project.version === "2.0" && (
                              <a
                                href={`projects/${project.id}/project.json`}
                                download={`${project.id}.json`}
                                target="_blank"
                              >
                              </a>
                            )}
                            {project.version === "3.0" && (
                              <a
                                href={`projects/${project.id}/project.json`}
                                download={`${project.id}.json`}
                                target="_blank"
                              >
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

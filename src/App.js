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
    fetch("./projects.json")
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          projects: data,
          loading: false,
        });
      });
  }

  render() {
    const checkTitle = function(project) {
      try {
        return project.title.toLowerCase().includes(this.state.nameSearch.toLowerCase() } catch {
        return false;      
      }
    }
    const projects = this.state.projects
      .filter(project => checkTitle(project))

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
            the project as a ".sb" or ".json" file and importing it into
            Scratch.
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
            <p>Loading... This shouldn't take too long.</p>
          ) : (
            <table class="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Creator</th>
                  <th>Created</th>
                  <th>Modified</th>
                  <th>Project File</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.length === 0 && (
                  <tr>
                    <td colSpan="7">
                      There are no results to your search query. Consider
                      broadening your search.
                    </td>
                  </tr>
                )}
                {
                  projects.map((project) => {
                    const created = new Date(project.created);
                    const modified = new Date(project.modified);
                    const author = project.author;

                    return (
                      <tr key={project.id}>
                        <td>{project.id}</td>
                        <td><span className="scrolling maxwidth" style={{alignContent: 'center'}}>{project.title}</span>
                          <hr />
                          <img src={`projects/${project.id}/thumbnail.png`} style={{width: 240, height: 180}}></img>
                        </td>
                        <td style={{backgroundColor: project.color}}><a href={`https://scratch.mit.edu/users/${project.author}`}><img src={project.pfp.replace("60x60", "45x45").replace("50x50", "45x45")} className="pfp"></img><span className="verticalcenter">{" "}{author}</span></a></td>  
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
                              <a rel="noopener noreferrer"
                                href={`projects/${project.id}/project.sb`}
                                target="_blank" download={`${project.id}.sb`}
                              >
                                project.sb
                              </a>
                            ) : (
                              <a rel="noopener noreferrer"
                                href={`projects/${project.id}/project.json`}
                                target="_blank" download={`${project.id}.json`}
                              >
                                project.json
                              </a>
                            )}
                            {project.version === "2.0" && (
                              <a rel="noopener noreferrer"
                                href={`projects/${project.id}/project.json`}
                                download={`${project.id}.json`}
                                target="_blank"
                              >
                              </a>
                            )}
                            {project.version === "3.0" && (
                              <a rel="noopener noreferrer"
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
                            <a rel="noopener noreferrer"
                              href={`https://scratch.mit.edu/projects/${project.id}/`}
                              target="_blank"
                            >
                              view on scratch
                            </a>
                            <a rel="noopener noreferrer"
                              href={`projects/${project.id}/api-res.json`}
                              target="_blank"
                            >
                              view full metadata
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
            <a rel="noopener noreferrer" href="https://github.com/scratchbackup/scratchbackup.github.io">
              GitHub
            </a>
            .
          </p>
        </Footer>
      </Layout>
    );
  }
}

export { App };

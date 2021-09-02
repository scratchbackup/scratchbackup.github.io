function search() {
  let parameter = document.forms["srch"]["param"].value;
  window.location = "https://scratchbackup.github.io/projects/" + parameter + "/project.json";
}

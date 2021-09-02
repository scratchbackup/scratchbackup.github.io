function search() {
  let parameter = document.forms["srch"]["param"].value;
  window.location = "https://scratchbackup.github.io/projects/" + parameter + "/project.json";
  document.open("index.html", "replace");
  document.write("<p>bruh you're not supposed to see this</p>");
  document.close();
}

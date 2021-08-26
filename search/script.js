window.setTimeout(search, 1000);

function search() {
  let parameter = prompt("Please enter a Project ID (keep the slash)", "/");
  window.location = "https://scratchbackup.github.io/projects" + parameter;
  document.open("index.html", "replace");
  document.write("<p>bruh you're not supposed to see this</p>");
  document.close();
}

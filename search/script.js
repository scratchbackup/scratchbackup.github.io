var linky = window.location.href
var url = new URL(linku);
var res = url.searchParams.get("param");
if res.length > 1
  window.location = "https://scratchbackup.github.io/projects/" + res + "/project.json";
}

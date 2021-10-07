console.log("script loaded");

$(document).ready(function(){
  $.get("https://scratchbackup.github.io/src/projects.json", function(data){
    const projects = json.parse(data);
  });
  
  const thumblists = [];
  
  const links = [];
  for (let projectID of projects) {
    var projectthumburl = new URL("https://scratchbackup.github.io/projects/" + projectID + "/thumbnail.png");
    var projectfile = new URL("https://scratchbackup.github.io/projects/" + projectID + "/project.json");
    thumblists.push(projectthumburl);
    links.push(projectfile);
  }
  var indexx = 0;
  for (let link of links) {
    var indexx += 1
    document.getElementById("project" + indexx + "link").href = link;
  }
  var indexx = 0;
  for (let thumb of thumblists) {
    var indexx += 1
    document.getElementById("project" + indexx + "thumb").src = thumb;
  }
  console.log("complete");

});

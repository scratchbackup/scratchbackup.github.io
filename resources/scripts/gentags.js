fetch("https://scratchbackup.github.io/resources/other/sitedep.txt").then((r)=>{r.text().then((d)=>{var CONTENT = d})})
document.getElementById("favihead").innerHTML = CONTENT

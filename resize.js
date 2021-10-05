const viewport = document.querySelectorAll("meta.v"); // selects the viewport
viewport.innerHTML = "<meta class="v" name="viewport" content="width=" + screen.availWidth + ", initial-scale=1.0">"; // changes viewport to available width

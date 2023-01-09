var song = new Audio("audio/devonshire_waltz.mp3");

function no_music() {
    song.play();
    song.currentTime = 0;
    document.getElementById("audioControls").onclick = function() { yes_music(); }
    document.getElementById("container_icon").classList.remove("fa-play")
    document.getElementById("container_icon").classList.add("fa-music")
    document.getElementById("nested_icon").style.display = "block"
    music = false
}

function yes_music() {
    song.pause();
    document.getElementById("audioControls").onclick = function() { no_music(); }
    document.getElementById("container_icon").classList.remove("fa-music")
    document.getElementById("container_icon").classList.add("fa-play")
    document.getElementById("nested_icon").style.display = "none"
    music = true
}


const play = document.querySelector(".play"),
    previus = document.querySelector(".prev"),
    next = document.querySelector(".next"),
    //

    trackImage = document.querySelector(".track-image"),
    title = document.querySelector(".title"),
    artist = document.querySelector(".artist"),
    //
    trackCurrentTime = document.querySelector(".current-time"),
    trackDuration = document.querySelector(".duration-time"),
    slider = document.querySelector(".duration-slider"),
    //
    showVolume = document.querySelector("#show-volume"),
    volumeIcon = document.querySelector("#volume-icon"),
    currentVolume = document.querySelector("#volume"),
    //
    autoPlay = document.querySelector(".play-all "),
    //
    hamBurger = document.querySelector(".fa-bars"),
    closeIcone = document.querySelector(".fa-times"),
    //
    musicPlaylist = document.querySelector(".music-playlist"),
    playList = document.querySelector(".playlist");

let timer;
let autoplay = 0;
let indexTrack = 0;
let songIsPlaying = false;
let track = document.createElement("audio");

// All Event Listener
play.addEventListener("click", justPlay);

//Load Tracks
function loadTrack(indexTrack) {
    artist.innerHTML = trackList[indexTrack].singer;
    trackImage.src = trackList[indexTrack].img;
    title.innerHTML = trackList[indexTrack].name;
    track.src = trackList[indexTrack].path;
    artist.innerHTML.src = trackList[indexTrack].singer;
    track.load();
}
loadTrack(indexTrack);

//Play song or Pause song
function justPlay() {
    if (songIsPlaying == false) {
        playSong();

    }else {
        pauseSong();

    }
}

//Play Song
function playSong() {
    track.play();
    songIsPlaying = true;
    play.innerHTML = '<i class="fas fa-pause "></i>';
   
}
//Pause Song
function pauseSong() {
    track.pause();
    songIsPlaying = false;
    play.innerHTML = '<i class="fas fa-play "></i>';
   
}

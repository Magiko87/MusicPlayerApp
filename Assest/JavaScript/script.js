const play = document.querySelector(".play"),
    previous = document.querySelector(".prev"),
    next = document.querySelector(".next"),
    

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
    autoPlayBtn = document.querySelector(".play-all "),
    //
    hamBurger = document.querySelector(".fa-bars"),
    closeIcone = document.querySelector(".fa-times"),
    //
    musicPlaylist = document.querySelector(".music-playlist"),
    pDiv = document.querySelector(".playlist-div"),
    playList = document.querySelector(".playlist");



let timer;
let autoplay = 0;
let indexTrack = 0;
let songIsPlaying = false;
let track = document.createElement("audio");
let previousVolume = currentVolume.value;

// All Event Listener
play.addEventListener("click", justPlay);
next.addEventListener("click", nextSong);
previous.addEventListener("click", prevSong);
autoPlayBtn.addEventListener("click", autoPlayToggle);
volumeIcon.addEventListener("click", function() {
    muteSound();
    toggleVolume();
  });
currentVolume.addEventListener("change", changeVolume);
slider.addEventListener("change", changeDuration);
track.addEventListener("timeupdate", songTimeUpdate);
hamBurger.addEventListener("click", showPlayList);
closeIcone.addEventListener("click", hidePlayList);

//Load Tracks
function loadTrack(indexTrack) {
    clearInterval(timer);
    resetSlider();

    artist.innerHTML = trackList[indexTrack].singer;
    trackImage.src = trackList[indexTrack].img;
    title.innerHTML = trackList[indexTrack].name;

    track.src = trackList[indexTrack].path;
    track.load();
    track.addEventListener("loadedmetadata", function() {
        trackDuration.innerHTML = formatTime(track.duration);
    });


    timer = setInterval(updateSlider, 1000);
}
loadTrack(indexTrack);

//Play song or Pause song
function justPlay() {
    if (songIsPlaying == false) {
        playSong();

    } else {
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
//Next Song
function nextSong() {
    if (indexTrack < trackList.length - 1) {
        indexTrack++;
        loadTrack(indexTrack);
        playSong()

    } else {
        indexTrack = 0
        loadTrack(indexTrack);
        playSong();

    }

}

// Prev song 
function prevSong() {
    if (indexTrack > 0) {
        indexTrack--;
        loadTrack(indexTrack);
        playSong()

    } else {
        indexTrack = trackList.length - 1;
        loadTrack(indexTrack);
        playSong();

    }

}

// Mute Sound
function muteSound() {
    if (track.volume === 0) {
        // Restore the previous volume
        track.volume = currentVolume.value / 100;
        showVolume.innerHTML = currentVolume.value;
        
    } else {
        // Mute the sound (set the volume to 0)
        track.volume = 0;
        showVolume.innerHTML = 0;
        
    }
}

// Format Time
function formatTime(time) {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    return (minutes < 10 ? "0" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

// Change Volume
function changeVolume() {
    let volume = currentVolume.value;
    showVolume.innerHTML = volume;
    track.volume = volume / 100;

 //Icon Mute
 if (volume > 0) {
    volumeIcon.classList.remove("fa-volume-mute");
    volumeIcon.classList.add("fa-volume-up");
} else {
    volumeIcon.classList.remove("fa-volume-up");
    volumeIcon.classList.add("fa-volume-mute");
}
   
}
function toggleVolume() {
    if (currentVolume.value > 0) {
      previousVolume = currentVolume.value;
      track.volume = 0;
      currentVolume.value = 0;
      showVolume.innerHTML = "0";
      volumeIcon.classList.remove("fa-volume-up");
      volumeIcon.classList.add("fa-volume-mute");
    } else {
      track.volume = previousVolume / 100;
      currentVolume.value = previousVolume;
      showVolume.innerHTML = previousVolume;
      volumeIcon.classList.remove("fa-volume-mute");
      volumeIcon.classList.add("fa-volume-up");
    }
  }
// Real-time volume slidee
currentVolume.addEventListener("input", changeVolume);




//Change Duration
function changeDuration() {
    let sliderPosition = track.duration * (slider.value /
        100);
    track.currentTime = sliderPosition;
}


//Auto Play    
function autoPlayToggle() {
    if (autoplay == 0) {
        autoplay = 1;
        autoPlayBtn.classList.add("play-all-selected");
        autoPlayBtn.style.background = "#ccc";
        autoPlayBtn.color = "#000";
        
        
        

    } else {
        autoplay = 0
        autoPlayBtn.classList.remove("play-all-selected");;
        autoPlayBtn.style.background = "rgb(81, 83, 81)";
        autoPlayBtn.color = "#ffffff";

    }
}

// Reset Slider
function resetSlider() {
    slider.value = 0;

}

// Update Slider
function updateSlider() {
    let position = 0;

    if (!isNaN(track.duration)) {
        position = track.currentTime * (100 / track.duration);
        slider.value = position;

    }

    if (track.ended) {
        play.innerHTML = '<i class="fas fa-play "></i>';
        if (autoplay == 1 && indexTrack < trackList.length - 1) {
            indexTrack++;
            loadTrack(indexTrack);
            playSong();

        } else if (autoplay == 1 && indexTrack == trackList.length - 1) {
            indexTrack = 0;
            loadTrack(indexTrack);
            playSong();

        }

    }
}

// Update Current song time
function songTimeUpdate() {
    
    
    
    if (track.duration) {
        let curmins = Math.floor(track.currentTime / 60);
        let cursecs = Math.floor(track.currentTime - curmins * 60);

        let durmins = Math.floor(track.duration / 60);
        let dursecs = Math.floor(track.duration - durmins * 60);

        if (dursecs < 10) {
            dursecs = "0" + dursecs;
        }
        if (durmins < 10) {
            durmins = "0" + durmins;
        }

        if (curmins < 10) {
            curmins = "0" + curmins;
        }
        if (cursecs < 10) {
            cursecs = "0" + cursecs;
        }
        trackCurrentTime.innerHTML = curmins + ":" + cursecs;
        trackDuration.innerHTML = durmins + ":" + dursecs;
    } else {
        trackCurrentTime.innerHTML = "00" + ":" + "00";
        trackDuration.innerHTML = "00" + ":" + "00";

    }

}

// Show PlayList
function showPlayList() {
    musicPlaylist.style.transform = "translateX(-2%)";

}
// Hide PlayList
function hidePlayList() {
    musicPlaylist.style.transform = "translateX(-100%)";

}

//Display Tracks in playlist
let counter = 1;
function displayTracks() {
    for (let i = 0; i < trackList.length; i++) {
        console.log(trackList[i].name);
        let div = document.createElement("div");
        div.classList.add("playlist");
        div.innerHTML = `
             <span class="song-index">${counter++}</span>
             <p class="single-song">${trackList[i].name}</p>

        `;
        pDiv.appendChild(div);
    }
    playFromPlaylist ();
}
displayTracks();

// Play song from playlist
function playFromPlaylist() {
    pDiv.addEventListener("click" , (e) => {
        if (e.target.classList.contains("single-song")) {
            // alert(e.target.innerHTML);
            const indexNum =  trackList.findIndex((item, index) => {
                if (item.name === e.target.innerHTML) {
                    return true;

                }
            });
            loadTrack(indexNum);
            playSong();
            hidePlayList();

        }
    })
}


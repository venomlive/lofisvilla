let currentSong = new Audio();
let songs;
async function getSongs() {
   try {
      const res = await fetch("/public/songs.json");
      const songList = await res.json(); // array of filenames like ["lofi1.mp3", ...]
      return songList;
   } catch (err) {
      console.error("Failed to load songs.json", err);
      return [];
   }
}



const playMusic = (track, pause = false) => {
   console.log(track)
   currentSong.src = "/public/songs/" + track;
   if (!pause) {
      currentSong.play();
      play.src = "/assetes/image/pause.svg"
   }
   document.querySelector(".songinfo").innerHTML = decodeURI(track)
   document.querySelector(".songtime").innerHTML = "00.00/00.00"
   // audio.play();
}



async function main() {
   //get the song list
   songs = await getSongs()
   playMusic(songs[0], true)
   console.log(songs);
   let songul = document.querySelector(".songlist").getElementsByTagName("ul")[0];
   for (const song of songs) {
      songul.innerHTML = songul.innerHTML +
         `<li>
                        <img src="assetes/image/music-note-circle-svgrepo-com.svg" alt="music-note-circle"
                            class="invert">
                        <div class="info">
                            <div>${song.replaceAll("%20", " ")}</div>
                        
                        </div>
                        <div>
                        <img  src="assetes/image/play-button.png" alt="play-button" class="invert ply-btn"></div>
                        </div>
         </li>`;

   }

   Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
      e.addEventListener("click", element => {
         //playfirst song
         console.log(e.querySelector(".info").firstElementChild.innerHTML);
         playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim());
      });
   }
   )
}
//atach event listener to play pause and privous btn
play.addEventListener("click", () => {
   if (currentSong.paused) {
      currentSong.play()
      play.src = "/assetes/image/pause.svg"
   }
   else {
      currentSong.pause()
      play.src = "/assetes/image/play-button.png"
   }
})
// duration
function secondsToMinutesSeconds(seconds) {
   if (isNaN(seconds) || seconds < 0) {
      return "00:00";
   }

   const minutes = Math.floor(seconds / 60);
   const remainingSeconds = Math.floor(seconds % 60);

   const formattedMinutes = String(minutes).padStart(2, '0');
   const formattedSeconds = String(remainingSeconds).padStart(2, '0');

   return `${formattedMinutes}:${formattedSeconds}`;
}


currentSong.addEventListener("timeupdate", () => {
   document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)}/${secondsToMinutesSeconds(currentSong.duration)}`
})

//seekbaar
// Add an event listener to seekbar
document.querySelector(".seekbar").addEventListener("click", e => {
   let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
   document.querySelector(".circle").style.left = percent + "%";
   currentSong.currentTime = ((currentSong.duration) * percent) / 100
})
// for previous the song
previous.addEventListener("click", () => {
   currentSong.pause()
   console.log("Previous clicked")
   let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
   if ((index - 1) >= 0) {
      playMusic(songs[index - 1])
   }
})

// Add an event listener to next
next.addEventListener("click", () => {
   currentSong.pause()
   console.log("Next clicked")

   let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
   if ((index + 1) < songs.length) {
      playMusic(songs[index + 1])
   }
})
// Add an event to volume
document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e) => {
   console.log("Setting volume to", e.target.value, "/ 100")
   currentSong.volume = parseInt(e.target.value) / 100
   if (currentSong.volume > 0) {
      document.querySelector(".volume>img").src = document.querySelector(".volume>img").src.replace("mute.svg", "volume.svg")
   }
})
// for hamburger
document.querySelector(".hamburger").addEventListener("click", () => {
   document.querySelector(".left").style.left = "0"

})
//close the hamburger

document.querySelector(".close").addEventListener("click", () => {
   document.querySelector(".left").style.left = "-120%"
})
// anotrher
document.querySelector(".ham2 img").addEventListener("click", () => {
   document.querySelector(".navlist").style.left = "0"

})
document.querySelector(".close2").addEventListener("click", () => {
   document.querySelector(".navlist").style.left = "-485%"
})


main();



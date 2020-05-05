// var vid, rewindButton, playbtn, fastForwardButton, seekslider, curtimetext, durtimetext, mutebtn, volumeslider, fullscreenbtn;
// // const rewindButton = document.querySelector('.rewind');
// // const fastForwardButton = document.querySelector('.fast-forward');
// function intializePlayer(){
	
// 	vid = document.getElementById("my_video");
// 	rewindButton = document.getElementById("rewind");
// 	playbtn = document.getElementById("playpausebtn");
// 	fastForwardButton = document.getElementById("fast-forward");
// 	seekslider = document.getElementById("seekslider");
// 	curtimetext = document.getElementById("curtimetext");
// 	durtimetext = document.getElementById("durtimetext");
// 	mutebtn = document.getElementById("mutebtn");
// 	volumeslider = document.getElementById("volumeslider");
// 	fullscreenbtn = document.getElementById("fullscreenbtn");
	
// 	rewindButton.addEventListener("click",rewindForward,false);
// 	playbtn.addEventListener("click", playPause, false);
// 	fastForwardButton.addEventListener("click",fastForward,false);
// 	mutebtn.addEventListener("click",vidmute,false);
// 	fullscreenbtn.addEventListener("click",toggleFullScreen,false);
//     vid.addEventListener("ended", function() {
// 	playbtn.className = "play";
// 	mutebtn.className = 'mute';
// 	});
// 	seekslider.addEventListener("change",vidSeek,false);
// 	vid.addEventListener("timeupdate",seektimeupdate,false);
// 	volumeslider.addEventListener("change",setvolume,false);
// }

// window.onload = intializePlayer;

// function playPause() {
// 	if(vid.paused) {
// 		vid.play();
//         playbtn.className = "pause";
        
// 	} else {
// 		vid.pause();
// 		playbtn.className = "play";
// 	}
// }

// function fastForward() {
// 	vid.currentTime += 10;
// }

// function rewindForward() {
// 	vid.currentTime -= 10;
// }

// function vidSeek() {
// 	var seekto = vid.duration * (seekslider.value / 100);
// 	vid.currentTime = seekto;
// }

// function seektimeupdate() {
// 	var nt = vid.currentTime * (100 / vid.duration);
// 	seekslider.value = nt;
// 	var curmins = Math.floor(vid.currentTime / 60);
// 	var cursecs = Math.floor(vid.currentTime - curmins * 60);
// 	var durmins = Math.floor(vid.duration / 60);
// 	var dursecs = Math.floor(vid.duration - durmins * 60);
// 	if(cursecs < 10){ cursecs = "0"+cursecs; }
// 	if(dursecs < 10){ dursecs = "0"+dursecs; }
// 	if(curmins < 10){ curmins = "0"+curmins; }
// 	if(durmins < 10){ durmins = "0"+durmins; }
// 	curtimetext.innerHTML = curmins+":"+cursecs;
// 	durtimetext.innerHTML = durmins+":"+dursecs;
// }

// function vidmute() {
// 	if (vid.muted) {
// 		vid.muted = false;
// 		mutebtn.className = 'mute';
        
// 	} else {
// 		vid.muted = true;
// 		mutebtn.className = 'unmute';
// 	}
// }

function setvolume() {
	vid.volume = volumeslider.value / 100;
}

// function toggleFullScreen() {
// 	if (vid.requestFullScreen) {
//         vid.requestFullScreen();
        
// 	} else if (vid.webkitRequestFullScreen) {
//         vid.webkitRequestFullScreen();
        
// 	} else if (vid.mozRequestFullScreen) {
// 		vid.mozRequestFullScreen();
// 	}
// }

// new player

const player = document.querySelector('.player');

const viewer = player.querySelector('.viewer');

const progress = player.querySelector('.progress');

const progressBar = player.querySelector('.progress__filled');

const toggle = player.querySelector('.toggle');

const skipButtons = player.querySelectorAll('[data-skip]');

const ranges = player.querySelectorAll('.player__slider');

const fullscreenbtn = player.querySelector('.fullscreen');

const submitBtn = player.querySelector('.submit');

const mutebtn = document.querySelector("#mutebtn");


fullscreenbtn.addEventListener('click', () => {
  return player.requestFullscreen()
})

const togglePlay = () =>  viewer.paused ? viewer.play() : viewer.pause();

const playPause = () => viewer.paused ? toggle.textContent = '►' : toggle.textContent = '||';


viewer.addEventListener('click', togglePlay)
toggle.addEventListener('click', togglePlay)

viewer.addEventListener('play', playPause);
viewer.addEventListener('pause', playPause);

skipButtons.forEach(e =>{
e.addEventListener('click', () => {
viewer.currentTime+=Number(e.dataset.skip);
                    })});


ranges.forEach(e => {
  e.addEventListener('change', () => {
    viewer[e.name] = e.value;
  })
  
})

setInterval(() => {
  let x = (viewer.currentTime / viewer.duration) * 100;
  progressBar.style.flexBasis = `${x}%`
}, 1000)

progress.addEventListener('click', (click) => {
  console.log(click);
let x = (click.offsetX / progress.offsetWidth) * viewer.duration;
  viewer.currentTime = x;
    console.log(x);
})

mutebtn.addEventListener("click", function() {
  if (viewer.muted) {
      viewer.muted = false;
      mutebtn.className = 'mute';
            
  } else {
      viewer.muted = true;
      mutebtn.className = 'unmute';
  }
});

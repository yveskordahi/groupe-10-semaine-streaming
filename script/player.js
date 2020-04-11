var vid, rewindButton, playbtn, fastForwardButton, seekslider, curtimetext, durtimetext, mutebtn, volumeslider, fullscreenbtn;
// const rewindButton = document.querySelector('.rewind');
// const fastForwardButton = document.querySelector('.fast-forward');
function intializePlayer(){
	
	vid = document.getElementById("my_video");
	rewindButton = document.getElementById("rewind");
	playbtn = document.getElementById("playpausebtn");
	fastForwardButton = document.getElementById("fast-forward");
	seekslider = document.getElementById("seekslider");
	curtimetext = document.getElementById("curtimetext");
	durtimetext = document.getElementById("durtimetext");
	mutebtn = document.getElementById("mutebtn");
	volumeslider = document.getElementById("volumeslider");
	fullscreenbtn = document.getElementById("fullscreenbtn");
	
	rewindButton.addEventListener("click",rewindForward,false);
	playbtn.addEventListener("click", playPause, false);
	fastForwardButton.addEventListener("click",fastForward,false);
	mutebtn.addEventListener("click",vidmute,false);
	fullscreenbtn.addEventListener("click",toggleFullScreen,false);
    vid.addEventListener("ended", function() {
	playbtn.className = "play";
	mutebtn.className = 'mute';
	});
	seekslider.addEventListener("change",vidSeek,false);
	vid.addEventListener("timeupdate",seektimeupdate,false);
	volumeslider.addEventListener("change",setvolume,false);
}

window.onload = intializePlayer;

function playPause() {
	if(vid.paused) {
		vid.play();
        playbtn.className = "pause";
        
	} else {
		vid.pause();
		playbtn.className = "play";
	}
}

function fastForward() {
	vid.currentTime += 10;
}

function rewindForward() {
	vid.currentTime -= 10;
}

function vidSeek() {
	var seekto = vid.duration * (seekslider.value / 100);
	vid.currentTime = seekto;
}

function seektimeupdate() {
	var nt = vid.currentTime * (100 / vid.duration);
	seekslider.value = nt;
	var curmins = Math.floor(vid.currentTime / 60);
	var cursecs = Math.floor(vid.currentTime - curmins * 60);
	var durmins = Math.floor(vid.duration / 60);
	var dursecs = Math.floor(vid.duration - durmins * 60);
	if(cursecs < 10){ cursecs = "0"+cursecs; }
	if(dursecs < 10){ dursecs = "0"+dursecs; }
	if(curmins < 10){ curmins = "0"+curmins; }
	if(durmins < 10){ durmins = "0"+durmins; }
	curtimetext.innerHTML = curmins+":"+cursecs;
	durtimetext.innerHTML = durmins+":"+dursecs;
}

function vidmute() {
	if (vid.muted) {
		vid.muted = false;
		mutebtn.className = 'mute';
        
	} else {
		vid.muted = true;
		mutebtn.className = 'unmute';
	}
}

function setvolume() {
	vid.volume = volumeslider.value / 100;
}

function toggleFullScreen() {
	if (vid.requestFullScreen) {
        vid.requestFullScreen();
        
	} else if (vid.webkitRequestFullScreen) {
        vid.webkitRequestFullScreen();
        
	} else if (vid.mozRequestFullScreen) {
		vid.mozRequestFullScreen();
	}
}
function setvolume() {
	vid.volume = volumeslider.value / 100;
}

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

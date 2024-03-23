const SONGS = [
    {
        title: 'Forest Lullaby',
        artist: 'Lesfm',
        img: 'img/cover-1.png',
        song: 'music/forest-lullaby-110624.mp3' 
    },
    {
        title: 'Lost in the City Lights',
        artist: 'Cosmo Sheldrake',
        img: 'img/cover-2.png',
        song: 'music/lost-in-city-lights-145038.mp3' 
    },  
]

const svgButtonPlay = 'img/211871_pause_icon.png';
const svgButtonPause = "img/Play_fill.svg";


const imgMusic = document.getElementById('cover');
const title = document.querySelector('.title');
const artist = document.querySelector('.artist');
const audioPlayer = document.querySelector('#audioPlayer');
const btnPlay = document.getElementById('btnPlay');
const btnLast = document.getElementById('btnLast');
const btnNext = document.getElementById('btnNext');
const duration = document.querySelector('#duration');
const startDuration = document.querySelector('#start-duration');
const progressBar = document.getElementById('progressBar');



let index = 0;
//  Events Buttons
btnLast.onclick = () => prevNextmusic('prev');
btnNext.onclick = () => prevNextmusic();
btnPlay.onclick = () => playPause();

// Events Audio TAG

audioPlayer.ontimeupdate = () => updateTime();
audioPlayer.addEventListener('ended', () => {
    prevNextmusic();
})

progressBar.onclick = (e) => {
    const newTime = (e.offsetX / progressBar.offsetWidth) * audioPlayer.duration;
    audioPlayer.currentTime = newTime;
}


const formatZero = (n) => (n < 10 ? "0" + n : n);

const updateTime = () => {
    const currentMinutes = Math.floor(audioPlayer.currentTime / 60);
    const currentSeconds = Math.floor(audioPlayer.currentTime % 60);
    startDuration.textContent = currentMinutes + ':' + formatZero(currentSeconds);
    const durationFormatted = isNaN(audioPlayer.duration) ? 0 : audioPlayer.duration;
    const durationMinutes = Math.floor(durationFormatted / 60);
    const durationSeconds = Math.floor(durationFormatted % 60);
    duration.textContent = durationMinutes + ":" + formatZero(durationSeconds);   
    const progressWidth = durationFormatted ? (audioPlayer.currentTime / durationFormatted) * 100 : 0;
    // duration.innerHTML
    progressBar.value = progressWidth;     
}

const playPause = () => {
    if (audioPlayer.paused){
        audioPlayer.play();
        btnPlay.src= svgButtonPlay;
    } else {
        audioPlayer.pause();
        btnPlay.src = svgButtonPause;
    }
}

const prevNextmusic = (type='next') => {
    if ((type === 'next' && index + 1 === SONGS.length) || type === 'init'){
        index = 0;
    } else if (type === 'prev' && index === 0){
        index = SONGS.length;
    } else {
        index = type === 'prev' && index==1 ? index -1: index+1;
    }

    const currentSong = SONGS[index];
    audioPlayer.src = currentSong.song;
    imgMusic.src = currentSong.img;
    title.textContent = currentSong.title;
    artist.textContent = currentSong.artist;
    imgMusic.alt = currentSong.title;
    if (type !== 'init') playPause();
    updateTime();
}

prevNextmusic('init');
let audio = new Audio('songs/song1.mp3')

let songIndex = 0;

let gif = document.getElementById("gif")

let myprogressBar = document.getElementById("myprogressBar")

let smallplayBtn = Array.from(document.getElementsByClassName('smallplaybtn'))

let masterBtn = document.getElementById("master-btn")

let songItem = Array.from(document.getElementsByClassName("song-detail-box"))

let previousBtn = document.getElementById("previousbtn")

let forwardBtn = document.getElementById("forwardbtn")

let caption = document.getElementById("caption")

let songs = [
    { songName: 'Gerua', filePath: './songs/song1.mp3', coverPath: './assets/cover.jfif'  },
    { songName: 'Humsafar', filePath: './songs/song2.mp3', coverPath: './assets/cover.jfif' },
    { songName: 'Janam Janam', filePath: './songs/song3.mp3', coverPath: './assets/cover.jfif' },
    { songName: 'Ishq wala love', filePath: './songs/song4.mp3', coverPath: './assets/cover.jfif' },
    { songName: 'Manzar hai naya', filePath: './songs/song5.mp3', coverPath: './assets/cover.jfif' },
    { songName: 'Tum jo aaye', filePath: './songs/song6.mp3', coverPath: './assets/cover.jfif' },
    { songName: 'Shayad', filePath: './songs/song7.mp3', coverPath: './assets/cover.jfif' },
    { songName: 'Samjhawan', filePath: './songs/song8.mp3', coverPath: './assets/cover.jfif' }
]



songItem.forEach((element, i) => {

    element.getElementsByTagName("img")[0].src = songs[i].coverPath
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName
    element.getElementsByTagName("span")[0] = songs[i].filePath
    // element.getElementById('caption').innerText = songs[i].songName
});




masterBtn.addEventListener('click', () => {
    // song.play()
    if (audio.paused || audio.currentTime <= 0) {
        audio.play();
        masterBtn.classList.remove('fa-play-circle')
        masterBtn.classList.add('fa-pause')

        gif.style.opacity = 1;
        // caption.innerText = songs[0].songName
        caption.innerText = songs[songIndex].songName

    } else {
        audio.pause()
        masterBtn.classList.remove('fa-pause')
        masterBtn.classList.add('fa-play-circle')
        gif.style.opacity = 0;
        caption.innerText = songs[songIndex].songName
    }

})

let minute = 0;

audio.addEventListener('timeupdate', () => {

    // console.log('timeupdate')

    progress = parseInt((audio.currentTime / audio.duration) * 100)
    myprogressBar.value = progress

    
   
    let minutes = Math.floor(audio.currentTime / 60);
    let seconds = Math.floor(audio.currentTime % 60).toString().padStart(2, '0');


    let formattedTime = `${minutes}:${seconds}`;

    document.getElementById("duration").innerText = formattedTime;
    
    if(myprogressBar.value == 100) {
        if (songIndex >= 7) {
            songIndex = 0
        } else {
            songIndex += 1;
        }
        audio.src = `songs/song${songIndex + 1}.mp3`
        audio.currentTime = 0;
        audio.play()
        masterBtn.classList.remove('fa-play-circle')
        masterBtn.classList.add('fa-pause')
        caption.innerText = songs[songIndex].songName
    } 
    
    
})
myprogressBar.addEventListener('change', () => {
    
    audio.currentTime = myprogressBar.value * audio.duration / 100





})
let makeallPlays = () => {
    Array.from(document.getElementsByClassName('smallplaybtn')).forEach((element) => {
        element.classList.remove('fa-pause')
        element.classList.add('fa-play-circle')

    })
}
smallplayBtn.forEach((element, i) => {
    element.addEventListener('click', (e) => {

        makeallPlays();
        songIndex = parseInt(e.target.id)
        e.target.classList.remove('fa-play-circle')
        e.target.classList.add("fa-pause")
        caption.innerText = songs[songIndex].songName
        audio.src = `songs/song${songIndex + 1}.mp3`
   
        console.log(audio.src)
        audio.currentTime = 0;
        audio.play()
        gif.style.opacity = 1;

        masterBtn.classList.remove('fa-play-circle')
        masterBtn.classList.add('fa-pause')


    })
})


forwardBtn.addEventListener('click', function () {
    // songIndex = parseInt(e.target.id)

    if (songIndex >= 7) {
        songIndex = 0
    } else {
        songIndex += 1;
    }
    audio.src = `songs/song${songIndex + 1}.mp3`
    audio.currentTime = 0;
    audio.play()
    masterBtn.classList.remove('fa-play-circle')
    masterBtn.classList.add('fa-pause')
    caption.innerText = songs[songIndex].songName
    
})


previousBtn.addEventListener('click', function () {
    // songIndex = parseInt(e.target.id)

    if (songIndex <= 0) {
        songIndex = 7
    } else {
        songIndex -= 1;
    }
    audio.src = `songs/song${songIndex + 1}.mp3`
    audio.currentTime = 0;
    audio.play()
    masterBtn.classList.remove('fa-pause')
    masterBtn.classList.add('fa-play-circle')
    caption.innerText = songs[songIndex].songName

})

function spaceBar() {
    if (masterBtn.classList.contains("fa-play-circle")) {
        audio.play()
        masterBtn.classList.remove('fa-play-circle')
        masterBtn.classList.add('fa-pause')
        gif.style.opacity = 1;
        caption.innerText = songs[songIndex].songName
    } else if (masterBtn.classList.contains("fa-pause")) {
        audio.pause()
        masterBtn.classList.remove('fa-pause')
        masterBtn.classList.add('fa-play-circle')
        gif.style.opacity = 0;
        caption.innerText = songs[songIndex].songName
    }

}

document.addEventListener('keydown', function (event) {
    if (event.code === 'Space') {
        spaceBar()
    }

})
document.addEventListener('keydown', function(event) {
    if(event.key === 'ArrowRight') {

        audio.currentTime += 10;
     
    }
})
document.addEventListener('keydown', function(event) {
    if(event.key === 'ArrowLeft') {

        audio.currentTime -= 10;
     
    }
})



document.addEventListener('keydown', function(event) {
    if(event.key === "ArrowUp") {
    
        if(audio.volume < 1) {
            audio.volume = audio.volume + 0.1
        }
     

          
    }
})
document.addEventListener('keydown', function(event) {
    if(event.key === "ArrowDown") {
    
        if(audio.volume > 0) {
            audio.volume = audio.volume - 0.1
        }
     

          
    }
})

document.addEventListener("keypress",  function(event){
    if(event.key === "m") {
        // console.log("m")
        if(audio.volume = 1) {
            audio.volume = 0

        } if (audio.volume = 0) {
            audio.volume = 1
        }
    }
})
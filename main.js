let volToggle = "mute"; 
let track = 0;
let playPauseState = 'pause'; 

const Toast = Swal.mixin({
    toast: true,
    position: 'top-right',
    iconColor: 'white',
    customClass: {
      popup: 'colored-toast'
    },
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    iconColor: 'purple'
  })

const images = [
    './Assets/police.png',
    './Assets/music.png',
    './Assets/garage.png',
    './Assets/trainers.png',
    './Assets/salon.png',
    './Assets/main.png',
];

const tracks = [
    './Assets/soundtrack.mp3',
    './Assets/',
    './Assets/',
    './Assets/',
    './Assets/soundtrack.mp3',
    './Assets/',
];

$(document).ready(function () {

    let count = 0;

    setInterval(function() {
        
        
        // $(".bg-image").fadeOut();
        // $(".bg-image").css('background-size', 'cover');
        // $(".bg-image").css('background-repeat', 'no-repeat');
        // $(".bg-image").fadeIn();
        
        $(".bg-image").fadeOut("slow", function () {
            $(".bg-image").css('background', `url('${images[count]}')`);
            $(this).fadeIn();
        });

        count++; 

        if(count > 5){
            count = 0; 
        }

      }, 5000);


    const audio = document.getElementById("myAudio");
    audio.volume = 0.5;

    let volume = document.querySelector("#steps-range");

    volume.addEventListener("change", function(e) {
        audio.volume = e.currentTarget.value ;
    })

    $("#play_toggle_container").click(function (e) { 
        e.preventDefault();
        playPause();
    });
    
    $("#skip_prev_container").click(function (e) { 
        e.preventDefault();
        skipPrev();
    });
    
    $("#skip_fwd_container").click(function (e) { 
        e.preventDefault();
        skipFwd();
    });
      
});

function showLoading(){
    $("#iframe-screen").hide();
    $("#loading-screen").show();
    $("#tebex-store").attr("src", "");

    $(".nav-item-home").removeClass("text-purple-400");
    $(".nav-item-home").addClass("text-white");

    $(".nav-item-tebex").removeClass("text-white");
    $(".nav-item-tebex").addClass("text-purple-400");
}

function showTebex(){
    $("#loading-screen").hide();
    $("#iframe-screen").show();
    // $("#tebex-store").show();

    $("#tebex-store").attr("src", "https://atm-rp.tebex.io");

    $(".nav-item-home").removeClass("text-white");
    $(".nav-item-home").addClass("text-purple-400");

    $(".nav-item-tebex").removeClass("text-purple-400");
    $(".nav-item-tebex").addClass("text-white");

}


function toggleVolume(){

    const local_audio = document.getElementById("myAudio");

    if(volToggle == "mute"){
        local_audio.volume = 0; 
        volToggle = "unmute";
        

        $("#volume_toggle").addClass("fa-volume-xmark");
        $("#volume_toggle").removeClass("fa-volume-high");


    } else{
        local_audio.volume = $("#steps-range").val();
        volToggle = "mute";

        $("#volume_toggle").removeClass("fa-volume-xmark");
        $("#volume_toggle").addClass("fa-volume-high");
    }


}

function skipFwd(){
   

    track++; 
    
    const local_audio = document.getElementById("myAudio");
    
    const checkIsTrack = (name) =>{
        if(name && name.includes(".mp3")){
            return true;
        } else{
            track == tracks.length ? track = 0 : track ++;
            return false;
        }
    };
    
    let newTrack = tracks[track]; 
    
    while(checkIsTrack(newTrack) != true){
        newTrack = tracks[track]; 
    }

    const source = document.getElementById('audioSource');
    source.src = newTrack

    local_audio.load(); //call this to just preload the audio without playing
    local_audio.play(); //call this to play the song right away

    Toast.fire({
        icon: 'success',
        title: 'Next Track!',
        text: "Playing next track..."
    });
}

function skipPrev(){

    if(track == 0 ){
        return; 
    }

    track--;

    const local_audio = document.getElementById("myAudio");

    const checkIsTrack = (name) =>{
        if(name && name.includes(".mp3")){
            return true;
        } else{
            track < 0 ? track = 0 : track = track-1;
            return false;
        }
    };

    let newTrack = tracks[track]; 

    while(checkIsTrack(newTrack) != true ){
        newTrack = tracks[track]; 
    }



    const source = document.getElementById('audioSource');
    source.src = newTrack

    local_audio.load(); //call this to just preload the audio without playing
    local_audio.play(); //call this to play the song right away
   
    Toast.fire({
        icon: 'success',
        title: 'Previous Track!',
        text: "Playing previous track..."
    });

}


function playPause(){
    const local_audio = document.getElementById("myAudio");

    if(playPauseState == 'play'){
        playPauseState = 'pause';
        local_audio.play();
        
        Toast.fire({
            icon: 'success',
            title: 'Track Playing!',
            text: "Playing current track..."
        });

        $("#play_toggle").removeClass('fa-play');
        $("#play_toggle").addClass('fa-pause');

        return;
    } 


    if(playPauseState == 'pause'){
        playPauseState = 'play';
        local_audio.pause();
        
        Toast.fire({
            icon: 'success',
            title: 'Track Paused!',
            text: "Paused current track..."
        });
        
        $("#play_toggle").removeClass('fa-pause');
        $("#play_toggle").addClass('fa-play');
        return;
    }


}
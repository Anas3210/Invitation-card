// =========================
// Elements
// =========================

const envelope = document.getElementById("envelope");
const musicBtn = document.getElementById("musicBtn");

const bgMusic = document.getElementById("bgMusic");
const paperSound = document.getElementById("paperSound");

const hearts = document.getElementById("hearts");
const sparkles = document.getElementById("sparkles");

let opened = false;
let musicPlaying = false;

// =========================
// Envelope Open
// =========================

envelope.addEventListener("click", () => {

    if(opened) return;

    opened = true;

    envelope.classList.add("open");

    paperSound.currentTime = 0;
    paperSound.play();

    if(!musicPlaying){

        bgMusic.volume = 0.4;
        bgMusic.play();

        musicPlaying = true;

    }

    createBurst();

});

// =========================
// Music Button
// =========================

musicBtn.addEventListener("click",(e)=>{

    e.stopPropagation();

    if(musicPlaying){

        bgMusic.pause();

        musicPlaying = false;

        musicBtn.innerHTML = "🔇";

    }

    else{

        bgMusic.play();

        musicPlaying = true;

        musicBtn.innerHTML = "🎵";

    }

});

// =========================
// Floating Hearts
// =========================

function createHeart(){

    const heart = document.createElement("div");

    heart.className = "heart";

    heart.innerHTML = "❤️";

    heart.style.left = Math.random()*100 + "%";

    heart.style.animationDuration =
    (5 + Math.random()*5) + "s";

    heart.style.fontSize =
    (14 + Math.random()*18) + "px";

    hearts.appendChild(heart);

    setTimeout(()=>{

        heart.remove();

    },10000);

}

setInterval(createHeart,500);

// =========================
// Sparkles
// =========================

function createSpark(){

    const s = document.createElement("div");

    s.className="spark";

    s.style.left=Math.random()*100+"%";

    s.style.top=Math.random()*100+"%";

    sparkles.appendChild(s);

    setTimeout(()=>{

        s.remove();

    },2500);

}

setInterval(createSpark,300);

// =========================
// Card Open Burst
// =========================

function createBurst(){

    for(let i=0;i<35;i++){

        setTimeout(()=>{

            createHeart();

            createSpark();

        },i*60);

    }

}

// =========================
// Smooth Entrance
// =========================

window.onload=()=>{

    envelope.animate(

    [

        {

            transform:"translateY(80px)",

            opacity:0

        },

        {

            transform:"translateY(0)",

            opacity:1

        }

    ],

    {

        duration:1800,

        easing:"ease-out",

        fill:"forwards"

    }

    );

};

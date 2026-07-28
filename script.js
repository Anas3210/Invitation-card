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
// ===============================
// Typing Effect
// ===============================

const title = document.querySelector(".card h1");

const originalText = title.innerText;

title.innerText = "";

function typeWriter(text, i = 0){

    if(i < text.length){

        title.innerHTML += text.charAt(i);

        setTimeout(()=>{

            typeWriter(text, i + 1);

        },100);

    }

}

// ===============================
// Confetti
// ===============================

function confettiBurst(){

    for(let i=0;i<80;i++){

        const c = document.createElement("div");

        c.className = "confetti";

        c.style.left = (45 + Math.random()*10) + "%";

        c.style.top = "45%";

        c.style.background =

        `hsl(${Math.random()*360},100%,65%)`;

        c.style.transform =

        `rotate(${Math.random()*360}deg)`;

        document.body.appendChild(c);

        const x = (Math.random()-0.5)*700;

        const y = -(Math.random()*600+200);

        c.animate([

            {

                transform:"translate(0,0)",

                opacity:1

            },

            {

                transform:`translate(${x}px,${y}px)`,

                opacity:0

            }

        ],{

            duration:2500,

            easing:"ease-out"

        });

        setTimeout(()=>{

            c.remove();

        },2500);

    }

}

// ===============================
// Envelope Open Extra Animation
// ===============================

envelope.addEventListener("click",()=>{

    setTimeout(()=>{

        confettiBurst();

        typeWriter(originalText);

    },900);

});
// ===============================
// Light Tilt Effect
// ===============================

document.addEventListener("mousemove",(e)=>{

    if(!opened) return;

    const x=(window.innerWidth/2-e.clientX)/35;

    const y=(window.innerHeight/2-e.clientY)/35;

    document.querySelector(".card").style.transform=
    `translateY(-180px) rotateX(${y}deg) rotateY(${x}deg)`;

});

document.addEventListener("mouseleave",()=>{

    if(!opened) return;

    document.querySelector(".card").style.transform=
    "translateY(-180px) rotateX(0deg) rotateY(0deg)";

});

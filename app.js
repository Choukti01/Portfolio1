/*
==========================================================
DeveloperOS Portfolio
Author: Abdelouahed Choukti
Version: 2.0
==========================================================
*/


console.log("app.js loaded");



"use strict";

/*=========================================================
    DOM
=========================================================*/

const canvas = document.getElementById("particles");
const loader = document.getElementById("loader");
const projectsContainer = document.getElementById("projectsContainer");

const repoCount = document.getElementById("repoCount");
const followersCount = document.getElementById("followersCount");
const followingCount = document.getElementById("followingCount");
const gistsCount = document.getElementById("gistsCount");
const repositories = document.getElementById("repositories");

/*=========================================================
    APPLICATION
=========================================================*/

const App = {

    version: "2.0.0",

    githubUser: "Choukti01",

    initialized: false,

    mouse: {

        x: window.innerWidth / 2,

        y: window.innerHeight / 2

    },

    particles: [],

    animationId: null,

    particleCount: 90

};

/*=========================================================
    UTILITIES
=========================================================*/

const Utils = {

    random(min, max) {

        return Math.random() * (max - min) + min;

    },

    distance(x1, y1, x2, y2) {

        const dx = x2 - x1;
        const dy = y2 - y1;

        return Math.sqrt(dx * dx + dy * dy);

    },

    clamp(value, min, max) {

        return Math.min(Math.max(value, min), max);

    },

    lerp(start, end, amount) {

        return start + (end - start) * amount;

    },

    qs(selector) {

        return document.querySelector(selector);

    },

    qsa(selector) {

        return document.querySelectorAll(selector);

    }

};

/*=========================================================
    LOADER
=========================================================*/

const Loader = {

    init() {

        console.log("Loader initialized");

        window.addEventListener("load", () => {

            console.log("Page loaded");

            this.hide();

        });

    },

    hide() {

        console.log("Hide called");

        setTimeout(() => {

            console.log("Adding hidden class");

            loader.classList.add("hidden");

            setTimeout(() => {

                console.log("Removing loader");

                loader.remove();

            },800);

        },2400);

    }

};
/*=========================================================
    EVENTS
=========================================================*/

const Events = {

    init() {

        window.addEventListener("mousemove", this.mouseMove);

        window.addEventListener("resize", this.resize);

    },

    mouseMove(event) {

        App.mouse.x = event.clientX;

        App.mouse.y = event.clientY;

    },

    resize() {

        if (!canvas) return;

        canvas.width = window.innerWidth;

        canvas.height = window.innerHeight;

    }

};

/*=========================================================
    BOOTSTRAP
=========================================================*/

const Bootstrap = {

    init() {

        console.log(
            "%cDeveloperOS v2.0",
            "color:#87CEEB;font-size:18px;font-weight:bold;"
        );

        console.log(
            "%cInitializing Portfolio...",
            "color:#CBD5E1"
        );

        if (canvas) {

            canvas.width = window.innerWidth;

            canvas.height = window.innerHeight;

        }

        Loader.init();

        Events.init();

        App.initialized = true;

        console.log("Bootstrap Complete ✅");

    }

};

/*=========================================================
    START APPLICATION
=========================================================*/

Bootstrap.init();



/* ==========================================================
   SCROLL REVEAL ENGINE
========================================================== */

const revealElements = document.querySelectorAll(`
    .section-header,
    .workspace-card,
    .project-card,
    .timeline-item,
    .stack-card,
    .github-card,
    .skill-category,
    .language-item,
    .interests-grid article,
    .stats article
`);

revealElements.forEach(element => {

    element.style.opacity = "0";
    element.style.transform = "translateY(70px)";
    element.style.transition =
        "opacity .8s ease, transform .8s cubic-bezier(.22,1,.36,1)";

});

const revealObserver = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            setTimeout(()=>{

    entry.target.style.opacity="1";

    entry.target.style.transform="translateY(0)";

},Math.random()*180);

            revealObserver.unobserve(entry.target);

        }

    });

},{
    threshold:0.12
});

revealElements.forEach(element=>{

    revealObserver.observe(element);

});



/* ==========================================================
   PROFESSIONAL NAVIGATION
========================================================== */

const navbar = document.querySelector(".navbar");

const navLinks = document.querySelectorAll(".navbar a");

const sections = document.querySelectorAll("main section");

window.addEventListener("scroll", () => {

    /* ---------- Navbar ---------- */

    if(window.scrollY > 40){

        navbar.classList.add("scrolled");

    }

    else{

        navbar.classList.remove("scrolled");

    }

    /* ---------- Progress Bar ---------- */

    const scrollTop = window.scrollY;

    const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;

    const progress = (scrollTop / docHeight) * 100;

    document.getElementById("scroll-progress").style.width =
        progress + "%";

    /* ---------- Active Navigation ---------- */

    let current = "";

    sections.forEach(section=>{

        const sectionTop = section.offsetTop - 180;

        if(scrollTop >= sectionTop){

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link=>{

        link.classList.remove("active");

        if(link.getAttribute("href")==="#" + current){

            link.classList.add("active");

        }

    });

});



/* ==========================================================
   MOUSE SPOTLIGHT
========================================================== */

const mouseLight = document.getElementById("mouse-light");

document.addEventListener("mousemove",(e)=>{

    mouseLight.style.left = e.clientX + "px";

    mouseLight.style.top = e.clientY + "px";

});


/* ==========================================================
   MAGNETIC BUTTONS
========================================================== */

const buttons = document.querySelectorAll(
    ".primary-btn, .secondary-btn"
);

buttons.forEach(button=>{

    button.addEventListener("mousemove",(e)=>{

        const rect = button.getBoundingClientRect();

        const x = e.clientX - rect.left - rect.width/2;

        const y = e.clientY - rect.top - rect.height/2;

        button.style.transform =
            `translate(${x*0.18}px, ${y*0.18}px)`;

    });

    button.addEventListener("mouseleave",()=>{

        button.style.transform="translate(0,0)";

    });

});


/* ==========================================================
   CARD TILT
========================================================== */

const cards = document.querySelectorAll(

    ".project-card,\
     .workspace-card,\
     .stack-card,\
     .github-card"

);

cards.forEach(card=>{

    card.addEventListener("mousemove",(e)=>{

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;

        const y = e.clientY - rect.top;

        const rotateX = (y / rect.height - .5) * -10;

        const rotateY = (x / rect.width - .5) * 10;

        card.style.transform =

            `perspective(900px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-8px)`;

    });

    card.addEventListener("mouseleave",()=>{

        card.style.transform =
            "perspective(900px) rotateX(0) rotateY(0)";

    });

});




/* ==========================================================
   HERO TYPING
========================================================== */

const typingTarget = document.getElementById("typing-text");

const typingWords = [

    "Building software that solves real-world problems.",

    "Designing modern digital experiences.",

    "Creating scalable backend systems.",

    "Engineering products with purpose."

];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect(){

    const current = typingWords[wordIndex];

    if(!deleting){

        typingTarget.textContent =
            current.substring(0,charIndex++);

        if(charIndex > current.length){

            deleting = true;

            setTimeout(typeEffect,1800);

            return;

        }

    }

    else{

        typingTarget.textContent =
            current.substring(0,charIndex--);

        if(charIndex < 0){

            deleting = false;

            wordIndex++;

            if(wordIndex>=typingWords.length){

                wordIndex=0;

            }

        }

    }

    setTimeout(typeEffect,deleting?28:55);

}

typeEffect();





/* ==========================================================
   COUNTERS
========================================================== */

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver(entries=>{

    entries.forEach(entry=>{

        if(!entry.isIntersecting) return;

        const counter = entry.target;

        const target = Number(counter.dataset.target);

        let value = 0;

        const speed = target / 70;

        function update(){

            value += speed;

            if(value >= target){

                counter.textContent = target + "+";

            }

            else{

                counter.textContent =
                    Math.floor(value);

                requestAnimationFrame(update);

            }

        }

        update();

        counterObserver.unobserve(counter);

    });

});

counters.forEach(counter=>{

    counterObserver.observe(counter);

});



/* ==========================================================
   SCROLL TO TOP
========================================================== */

const scrollTopBtn =

document.getElementById("scrollTop");

window.addEventListener("scroll",()=>{

    if(window.scrollY>700){

        scrollTopBtn.classList.add("show");

    }

    else{

        scrollTopBtn.classList.remove("show");

    }

});

scrollTopBtn.addEventListener("click",()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});
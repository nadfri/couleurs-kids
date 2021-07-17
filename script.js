"use strict";

const couleurs = document.querySelectorAll('.couleur');
const rouge    = new Audio('sounds/rouge.m4a');
const rose     = new Audio('sounds/rose.m4a');
const orange   = new Audio('sounds/orange.m4a');
const beige    = new Audio('sounds/beige.m4a');
const marron   = new Audio('sounds/marron.m4a');
const jaune    = new Audio('sounds/jaune.m4a');
const vert     = new Audio('sounds/vert.m4a');
const bleu     = new Audio('sounds/bleu.m4a');
const violet   = new Audio('sounds/violet.m4a');
const blanc    = new Audio('sounds/blanc.m4a');
const gris     = new Audio('sounds/gris.m4a');
const noir     = new Audio('sounds/noir.m4a');

const sounds = {
    rouge,rose,orange,
    beige,marron,jaune,
	vert,bleu,violet,
	blanc,gris,noir,
};


//Definit si on est sur mobile ou non, si oui active le touch event et non le click de souris
const handleClick = (typeof window.orientation !== "undefined" || navigator.userAgent.indexOf('IEMobile') !== -1 )? "touchstart" : "click";

start.onclick = () =>
{ 
    start.classList.remove('blur');
    h1.classList.replace("zoom","zoomIn");
    setTimeout(() => start.style.display="none", 500);
}

for (let couleur of couleurs) 
{
	couleur.addEventListener(handleClick, (e)=>
    {
		e.preventDefault(); //désactive le onclick avec le touch event
        const clone = document.querySelector(".zoomOut");

        if(!clone) //empeche l'apparation de plusieurs clones
        {
            sounds[couleur.classList[1]].play();

            const copy = couleur.cloneNode(true);

            copy.classList.add('zoomOut');

            overlay.appendChild(copy);
            overlay.style.display = 'flex';
            setTimeout(() => overlay.classList.add('blur'), 100);
        }

	},false);
}

overlay.addEventListener(handleClick, (e)=>
{
	e.preventDefault(); //désactive le onclick avec le touch event
    const clone = document.querySelector(".zoomOut");

    if(clone) //empeche l'action si pas de clone
	{
        clone.classList.replace('zoomOut', 'zoomIn');
        overlay.classList.remove('blur');

        setTimeout(() => 
        {
            overlay.innerHTML = '';
            overlay.style.display = 'none';
        }, 500);
}

},false);


/*Gestion de la PWA*/ 
window.onbeforeinstallprompt = (event) => {
    event.preventDefault(); // annuler la banniere par defaut
    installBtn.classList.add("slide"); //affiche la banniere perso
    setTimeout(() => installBtn.classList.remove("slide"), 7000);
    
    installBtn.onclick = () => {
        console.log("hey")
        installBtn.classList.remove("slide"); //faire disparaitre le bouton
        setTimeout(() => installBtn.style.display = "none", 500);
        event.prompt(); //permettre l'installation
    };
};

//Register service worker to control making site work offline
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('sw.js')
            .then(registration => {
                console.log(
                    `Service Worker enregistré ! Ressource: ${registration.scope}`
                );
            })
            .catch(err => {
                console.log(
                    `Echec de l'enregistrement du Service Worker: ${err}`
                );
            });
    });
}



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
		sounds[couleur.classList[1]].play();

		const copy = couleur.cloneNode(true);
		copy.id  = 'copyID';
		copy.classList.add('zoomOut');

		overlay.appendChild(copy);
		overlay.style.display = 'flex';
		setTimeout(() => overlay.classList.add('blur'), 100);

	},false);
}

overlay.addEventListener(handleClick, (e)=>
{
	e.preventDefault(); //désactive le onclick avec le touch event

	copyID.classList.replace('zoomOut', 'zoomIn');
	overlay.classList.remove('blur');

	setTimeout(() => 
    {
		overlay.innerHTML = '';
		overlay.style.display = 'none';
	}, 500);

},false);




let stkCartes = [];

let temps = document.getElementById("temps");
let score = document.getElementById("score");
let res = document.getElementById("res");
let btnStop = document.getElementById("boutonStop");
let page = document.getElementById("page");

let monInterval = null;
let minute = 0;
let seconde = 0;
let afficheTimer = '';

let nbCartes = 0;
let pairesTrouvees = '';
let nbCoups = 0;

let cartesRetournees = [];


function finTimer() {
  clearInterval(monInterval);
}

function secondePlus() {
  seconde++;
  if (seconde == 60) {
    seconde = 0;
    minute++;
  };
  // sécurité enfant sur le timer....
  if (minute == 10) {
    finTimer();
  };
  if (seconde<10) {
    afficheTimer = ' Temps : 0' + minute + ':0' + seconde;
  }
  else {
    afficheTimer = ' Temps : 0' + minute + ':' + seconde;
  }
  temps.innerHTML =  afficheTimer ;
  // console.log('=> ' + seconde)
}

function debutTimer() {
  monInterval = setInterval(secondePlus,1000);
}



function genereTable(paires) {
  /* on remplit le tableau avec des N° au hasard entre 1 et paires  */
  /* et on fait un nouveau tableau re-mélangé */
  let list = [], resultat = [];

  let listeImg = ['autumn','beach','cat','dog','eagle','field','flowers','forest','grass','hills','honey','hummingbird','kingfisher','lion','lynx',
  'moon','mountains','owl','rose','sea','sunset','swamp','sweden','tower','tree-mirror','trees','water','waterfall','winnats',
  'woman-sea','woman','zebra'];

  for ( let j = 1 ; j <= paires ; j++ ) {
      rnum = Math.floor( Math.random() * listeImg.length);
      if (!list.includes(listeImg[rnum])) {
        list.push(listeImg[rnum]);
        list.push(listeImg[rnum]);
      };

    };

  while(list.length >0){

    let rnd = Math.floor( Math.random() * list.length);
    resultat.push(list[rnd]);
    list.splice(rnd,1);
  }
console.log(resultat);
return resultat;
};

function figerCartesLoose(carte1 , carte2) {

page.classList.add('disabled');

    setTimeout(() => {
      page.classList.remove('disabled');
 
      res.innerText = "" ;
 
    carte1.classList.remove('card-cliquee');
    carte2.classList.remove('card-cliquee');

   }, 1500);
};

function figerCartesWin(carte1 , carte2) {
   setTimeout(() => {

   page.style = "border : solid 1px black";
   carte1.classList.add("card-win");
   carte2.classList.add("card-win");
   carte1.classList.remove('card-cliquee');
   carte2.classList.remove('card-cliquee');

   if (pairesTrouvees != 0 )  {
    res.innerText = "";
   }
  }, 1500);
};




btnStop.addEventListener("click", function() {
    // stopper timer et ré-init de la page
    finTimer();
    // suppr. tableau existant
    ctrlExist() // vidage div
    res.style = "color:red;";
    res.innerText = "...Partie Annulée :-( ...";
    document.getElementById("boutonGo").style = "visibility : visible";
    btnStop.style = "visibility : hidden";
     // On regenere le tableau 'initial' apres vidage de la div
     stkCartes.splice(0,stkCartes.length);
     genereTable(nbCartes);
    //pairesTrouvees = -1; // stoppe le timer
    seconde = 0;
    minute = 0;
    nbCoups = 0;
    //temps.innerHTML =  ' Temps : ' + '0' + minute + ':' + seconde ;
});

document.getElementById("boutonGo").addEventListener("click", function() 
    {
      
      nbCartes = document.getElementById('selecNbCartes').value;
      ctrlExist() // vidage div au cas ou 
      btnStop.style = "visibility : visible";
      document.getElementById("boutonGo").style = "visibility : hidden";

      temps.innerHTML =  ' Temps : 00:00 ' ;
      score.innerHTML = 'Coups joués : 0 ';
      afficheTimer = ' Temps : 00:00';

      seconde = 0 ;
      minute = 0 ;
      nbCoups = 0;
      res.innerText = "";
      pairesTrouvees = nbCartes;
      
      debutTimer();
      
      stkCartes=genereTable(nbCartes); // remplissage du tableau
      creerCartes(stkCartes);          // 
      
    }
);


function ctrlExist() {
  let existe = document.querySelectorAll(".card-container");
    if (existe.length>0) {
      for (x=0;x<existe.length;x++) {
          existe[x].remove();
          }
   };
}


// fonction avec Aymeric
function flipCarte(elem){

  // si le tableau ne contient pas l'element cliqué, on l'insère ds le tableau
  if(!cartesRetournees.includes(elem)){
    cartesRetournees.push(elem);
    elem.classList.add('card-cliquee');

    // 2 cartes cliquées 
    if(cartesRetournees.length === 2){
      nbCoups++;
      const [one, two] = cartesRetournees;
      // comparaison des data-id
      if(one.dataset.id === two.dataset.id){

        figerCartesWin(one, two);
        document.getElementById("page").style = " border : solid 3px green";
        res.style = "color:green;";
        res.innerText = "BRAVO";
        cartesRetournees = [];
        pairesTrouvees--;
      }
      else {
        figerCartesLoose(one, two);
        document.getElementById("page").style = "border : solid 3px red";
        res.style = "color:red;";
        res.innerText = "...Dommage...";
        cartesRetournees = [];
      }
    }
  }
  score.innerHTML = 'Coups joués : ' + nbCoups;

  if (pairesTrouvees == 0) 
    {
     finTimer();
     document.getElementById("page").style = "border : solid 3px green;";
     res.style = "font-size:30px;";
     res.innerHTML = "...Quel talent ! " + nbCartes + " paires trouvées en " + nbCoups + " coups et en " + minute + " min. et " + seconde + " seconde(s) !!";
     btnStop.style = "visibility : hidden";
     document.getElementById("boutonGo").style = "visibility : visible";
     console.log('GAME OVER');
    };

}



function creerCartes (ids) {

    /* container de carte */
    const divCible = document.getElementById("page");

  for (i= 0; i < ids.length ; i++) 
  { 

    let indexCarte = ids[i], id= 'card' + (i+1);
    
    const divContainer = document.createElement("div");
    divContainer.classList.add("card-container");
    divCible.appendChild(divContainer);

    /* carte */
    const divCarte = document.createElement("div");
    divCarte.classList.add("card");
    divCarte.setAttribute("id",id);
    divCarte.dataset.id = indexCarte;// ajout d'un data-id

    // au lieu d'ajouter divCarte.setAttribute("onclick","retourneCarte(this.id);") ou
    // ("onclick","flipCarte(this.id);") , 
    // on ajoute un listener click sur la carte cible
    divCarte.addEventListener('click', e =>flipCarte(divCarte));
    //
    // équivaut à :
    // e=>{
    //   return flipCarte(divCarte);
    // }
    //
    // sinon ca aurait pu etre ca : 
    // divCarte.onclick = function(){
    //   flipCarte(divCarte);
    // };
    divContainer.appendChild(divCarte);

    /* carte derriere */
    const cardBack = document.createElement("div");
    cardBack.classList.add("card-back")
    divCarte.appendChild(cardBack);

    /* image derriere */ 
    const imgBack = document.createElement("img");
    imgBack.src = "./images2/dos-carte2.jpg";
    imgBack.classList.add("image-carte");
    cardBack.appendChild(imgBack);

    /* carte devant */
    const cardFront = document.createElement("div");
    cardFront.classList.add("card-front")
    divCarte.appendChild(cardFront);
    
    /* image devant */
    const imgFront = document.createElement("img");
    let numImg = stkCartes[i];          
    imgFront.src = "./images2/" + (numImg) + '.jpg';
    imgFront.classList.add("image-carte");
    cardFront.appendChild(imgFront);
  }
}

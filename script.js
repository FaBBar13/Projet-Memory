
let stkCartes = [];

let carteRetournee = "N";
let posIndCarte1 = '';
let nomImgCarte1 = '' ; 
let paramIDCarte1 = '';
let posIndCarte2 = '';
let nomImgCarte2 = ''; 
let paramIDCarte2 = '';

let temps = document.getElementById("temps");
let score = document.getElementById("score");
let minute = 0;
let seconde = 55;

let nbCartes = 3;
let pairesTrouvees = nbCartes;
let nbCoups = 0;
let res = document.getElementById("res");
//console.log(res);

function monTimer() {
  let inter = setInterval(() => {
    seconde++;
    if (seconde <=9) {
      seconde = '0' + seconde;
    }
    else if (seconde == 0) {
      seconde = '00';
    };
    if (seconde == 60) {
      minute++;
      seconde=0;
      };
    temps.innerHTML =  ' Temps : ' + '0' + minute + ':' + seconde;


    if (minute == 2 ) {
      window.clearTimeout(inter);
    };
    if (pairesTrouvees == 0) {
      console.log(pairesTrouvees);
      window.clearTimeout(inter);
    };
    },1000);
}

function genereTable(paramNbCartes) {
  /* on remplit le tableau avec des N° au hasard entre 1 et nbCartes */
  
  let compteur = 0;
  
  while (compteur < nbCartes) {
    let numHasard = Math.floor(Math.random()* (nbCartes) +1   );
    if (stkCartes.includes(numHasard)) {
          compteur--;  
         }
    else {
      stkCartes.push(numHasard);
    };
    compteur++;
  }

  /* tableau-copie pour dupliquer les N°  ! */
  let tabTmp = Object.values(stkCartes);
  let tabTmp2 = Object.values(stkCartes);
  let tabTmp3 = tabTmp.concat(tabTmp2);

stkCartes.splice(0,stkCartes.length); // vidage du tableau initial
  nbTmp = tabTmp3.length;
  for (i=0; i < nbTmp ; i++) {
     let numHasard = Math.floor(Math.random()* (tabTmp3.length)   );
     stkCartes.push(tabTmp3[numHasard]);
     tabTmp3.splice(numHasard , 1);
   };
}

function figerCartesLoose(id1 , id2) {
    setTimeout(() => {
    
    document.getElementById("page").style = "border : solid 1px black";
    res.innerText = "";
    

    document.getElementById(id1).classList.toggle('card-cliquee');
    document.getElementById(id2).classList.toggle('card-cliquee');

    CacheCarte(id1);
    CacheCarte(id2);

   }, 2000);
};

function figerCartesWin(id1 , id2) {
   setTimeout(() => {

   document.getElementById("page").style = "border : solid 1px black";
   res.innerText = "";
   document.getElementById(id1).style = "opacity : 0.7;";
   document.getElementById(id1).style = "pointer-events : none;";
   document.getElementById(id1).style = "scale : 0.8;";
   document.getElementById(id2).style = "opacity : 0.7;";
   document.getElementById(id2).style = "pointer-events : none;";
   document.getElementById(id2).style = "scale : 0.8;";

  }, 2000);
};

function MontreCarte (id1) {
  document.getElementById(id1).style ="transform : rotateY(-180deg);";
}
function CacheCarte (id1) {
  document.getElementById(id1).style ="transform : rotateY(-360deg);";
}

 genereTable(nbCartes);
 console.log(stkCartes);

document.getElementById("boutonGo").addEventListener("click", function() 
    {
    // monTimer();
    // genereTable(nbCartes);
    // console.log(stkCartes);
    creerCartes(nbCartes*2);
    }
);


function ctrlExist() {
  let existe = document.querySelectorAll(".card-container");
    if (existe.length>0) {
      for (x=0;x<existe.length;x++) {
          existe[x].remove();
          }
   // On regenere le tableau 'initial' apres vidage de la div
   // genereTable(nbCartes);
   };
}

/* retourner carte  */ 
function retourneCarte(paramID)  {

nbCoups++;
score.innerHTML = 'Coups joués : ' + nbCoups;

  if (paramID == paramIDCarte1) {
    //CacheCarte(paramID);
    return;
  }
    if (carteRetournee === "N") 
      {
      posIndCarte1 = paramID.charAt(paramID.length-1)-1;;
      nomImgCarte1 = stkCartes[posIndCarte1] ; 
      paramIDCarte1 = paramID;

      carteRetournee = "O";
      MontreCarte(paramIDCarte1);
      document.getElementById(paramIDCarte1).classList.toggle('card-cliquee');
      }

    // On compare les 2 cartes selectionnées 
    else 
      {
      posIndCarte2 = paramID.charAt(paramID.length-1)-1;;
      nomImgCarte2 = stkCartes[posIndCarte2] ; 
      paramIDCarte2 = paramID;
      document.getElementById(paramIDCarte2).classList.toggle('card-cliquee');
      MontreCarte(paramIDCarte2);
      
      
        if ( nomImgCarte1 == nomImgCarte2) 
          {
            document.getElementById("page").style = "border : solid 3px green";
            res.style = "color:green;";
            res.innerText = "BRAVO";
            figerCartesWin(paramIDCarte1 , paramIDCarte2);

            console.log('GAGNE');
            carteRetournee = "N";
            posIndCarte1 = '';
            nomImgCarte1 = '' ; 
            paramIDCarte1 = '';
            posIndCarte2 = '';
            nomImgCarte2 = ''; 
            paramIDCarte2 = '';
            pairesTrouvees--;
          }
        else 
          {
            // on temporise pour afficher la 2ème carte et les re-masquer
            document.getElementById("page").style = "border : solid 3px red";
            res.style = "color:red;";
            res.innerText = "...Dommage...";

            figerCartesLoose(paramIDCarte1 , paramIDCarte2);

            console.log('PERDU');
            carteRetournee = "N";
            posIndCarte1 = '';
            nomImgCarte1 = '' ; 
            paramIDCarte1 = '';
            posIndCarte2 = '';
            nomImgCarte2 = ''; 
            paramIDCarte2 = '';
          }
    }
  
//document.getElementById("info1").innerHTML = " 1 = "+ nomImgCarte1 + " / " + posIndCarte1;
//document.getElementById("info2").innerHTML = " 2 = "+ nomImgCarte2 + " / " + posIndCarte1;

 if (pairesTrouvees == 0) {
  console.log('GAME OVER');
 }

}



function creerCartes (param1) {

  ctrlExist();

  for (i=1 ; i <= nbCartes*2 ; i++) 
  { 
    /* container de carte */
    const divCible = document.getElementById("page");
    const divContainer = document.createElement("div");
    divContainer.classList.add("card-container");
    divCible.appendChild(divContainer);

    /* carte */
    const divCarte = document.createElement("div");
    divCarte.classList.add("card");
    divCarte.setAttribute("id",("card"+i));
    divCarte.setAttribute("onclick","retourneCarte(this.id);");
    divContainer.appendChild(divCarte);

    /* carte derriere */
    const cardBack = document.createElement("div");
    cardBack.classList.add("card-back")
    divCarte.appendChild(cardBack);

    /* image derriere */ 
    const imgBack = document.createElement("img");
    imgBack.src = "/images/dos-carte2.jpg";
    imgBack.classList.add("image-carte");
    cardBack.appendChild(imgBack);


    /* carte devant */
    const cardFront = document.createElement("div");
    cardFront.classList.add("card-front")
    divCarte.appendChild(cardFront);
    
    /* image devant */
    const imgFront = document.createElement("img");
    let numImg = stkCartes[i-1];          /* i-1 pour aller chercher index 0 */
    imgFront.src = "/images/" + (numImg) + '.jpg';
    imgFront.classList.add("image-carte");
    cardFront.appendChild(imgFront);

  }

}

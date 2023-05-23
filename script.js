
let stkCartes = [];

let temps = document.getElementById("temps");
let score = document.getElementById("score");
let res = document.getElementById("res");
let btnStop = document.getElementById("boutonStop");
let page = document.getElementById("page");

let minute = 0;
let seconde = 0;

let nbCartes = 0;
let pairesTrouvees = '';
let nbCoups = 0;

let cartesRetournees = [];


function choixCartes() {
  let tabRadio = document.querySelectorAll("input");
  console.log(tabRadio);
  for (i=0; i< tabRadio.length ; i++) {
    if (tabRadio[i].checked) {
      nbCartes = tabRadio[i].value;
      console.log('ici');
    };
  };
  console.log(nbCartes);
};
//choixCartes();


function monTimer() {
  let inter = setInterval(() => {
    seconde++;
    if (seconde <=9 ) {
      seconde = '0' + seconde;
    }
    else if (seconde == 0) {
      seconde = '00';
    };
    if (seconde == 60) {
      minute++;
      seconde=0;
      };
    temps.innerHTML =  ' Temps : ' + '0' + minute + ':' + seconde ;

    if (minute == 1 ) {
      window.clearTimeout(inter);
    };
    if (pairesTrouvees == 0) {
      console.log(" ici avec " + pairesTrouvees + " paires restantes");
      window.clearTimeout(inter);
    };
    console.log(inter);
    },1000);
};


function genereTable(paires) {
  /* on remplit le tableau avec des N° au hasard entre 1 et paires  */
  
  let list = [], resultat = [];

  for(let i=1;i<=paires;i++){
    for(let j=0; j<2; j++){
      list.push(i);
    }
  }

  while(list.length >0){

    let rnd = Math.floor( Math.random()* list.length);
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


// console.log(stkCartes);

btnStop.addEventListener("click", function() {
    // stopper timer et ré-init de la page
    
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
      // choixCartes();
      nbCartes = 2;
      ctrlExist() // vidage div
      btnStop.style = "visibility : visible";
      document.getElementById("boutonGo").style = "visibility : hidden";

      seconde,minute,nbCoups = 0;
      res.innerText = "";
      pairesTrouvees = nbCartes;
      
      // monTimer();
      
      stkCartes=genereTable(nbCartes); // remplissage du tableau
      creerCartes(stkCartes);          // 
      
      // console.log(stkCartes);
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


// fonction Aymeric
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
     document.getElementById("page").style = "border : solid 3px green;";
     //res.style = "color:blue;";
     res.style = "font-size:30px;";
     res.innerHTML = "...Quel talent ! " + nbCartes + " paires trouvées en " + nbCoups + " coups et en " + minute + "min. et " + seconde + " seconde(s) !!";
     btnStop.style = "visibility : hidden";
     document.getElementById("boutonGo").style = "visibility : visible";
     console.log('GAME OVER');
    };

}

/* selection carte  */ 
/*
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
      // console.log('1 = ' + posIndCarte1 + ' / ' + nomImgCarte1 + ' / ' + paramIDCarte1);
      }
      
    // On compare les 2 cartes selectionnées 
    else 

      {
      posIndCarte2 = paramID.charAt(paramID.length-1)-1;;
      nomImgCarte2 = stkCartes[posIndCarte2] ; 
      paramIDCarte2 = paramID;
      // console.log('2 = ' + posIndCarte2 + ' / ' + nomImgCarte2 + ' / ' + paramIDCarte2);
      document.getElementById(paramIDCarte2).classList.toggle('card-cliquee');
      MontreCarte(paramIDCarte2);
 
        if ( nomImgCarte1 == nomImgCarte2) 
          {
            document.getElementById("page").style = " border : solid 3px green";
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
     };

//document.getElementById('info1').innerText = '1 = ' + posIndCarte1 + ' / ' + nomImgCarte1 + ' / ' + paramIDCarte1;
//document.getElementById('info2').innerText = '1 = ' + posIndCarte2 + ' / ' + nomImgCarte2 + ' / ' + paramIDCarte2;

    if (pairesTrouvees == 0) 
    {
     document.getElementById("page").style = "border : solid 3px green;";
     res.style = "color : green;";
     res.style = "font-size : 30px;";
     res.innerHTML = "...Quel talent ! " + nbCartes + " paires trouvées en " + nbCoups + " coups et en    " + minute + "min. et " + seconde + " seconde(s) !!";
     btnStop.style = "visibility : hidden";
     document.getElementById("boutonGo").style = "visibility : visible";
     console.log('GAME OVER');
    };
}
*/

function creerCartes (ids) {

  // ctrlExist();
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
    imgBack.src = "./images/dos-carte2.jpg";
    imgBack.classList.add("image-carte");
    cardBack.appendChild(imgBack);

    /* carte devant */
    const cardFront = document.createElement("div");
    cardFront.classList.add("card-front")
    divCarte.appendChild(cardFront);
    
    /* image devant */
    const imgFront = document.createElement("img");
    let numImg = stkCartes[i];          
    imgFront.src = "./images/" + (numImg) + '.jpg';
    imgFront.classList.add("image-carte");
    cardFront.appendChild(imgFront);
  }
}

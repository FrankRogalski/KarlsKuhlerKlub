// Basic game variables
let Einzeller:number = 0;
let EinzellerPerSeconds:number = 0;
let Fruchtfliegen:number = 0;
let Fliegen:number = 0;
let bonusPercent = 0;


// Prices
let fruchtFliegePrice = 50;
let fliegePrice = 200;
let simplyCellDivisionPrice = 500;
let normalCellDivisionPrice = 2500;

// states 
let normalCellDivisionBought = false;

// Buy functionality

// Diese function fügt einen Einzeller hinzu.
function addEinzeller():void{
    Einzeller++;
    updateEinzeller();
}

// Diese function fügt eine Fruchtfliege hinzu.
// Fruchtfliegen produzieren einen Einzeller pro Sekunde.
function addFruchtfliege():void{
    if(Einzeller >= fruchtFliegePrice){
        Einzeller -= fruchtFliegePrice;
        Fruchtfliegen++;
        EinzellerPerSeconds++;

        updateEinzeller();
        updateFruchtfliege();
        updateEinzellerPerSecond();
    }
}

// Diese function fügt eine Fliege hinzu.
// Eine Fliege, produziert zwei Einzeller pro Sekunde.
function addFliege():void{
    if(Einzeller >= fliegePrice){
        Einzeller -= fliegePrice;
        Fliegen++;
        EinzellerPerSeconds += 2;

        updateEinzeller();
        updateFliegen();
        updateEinzellerPerSecond();
    }
}

// Diese function führt einfache Zellteilung ein und gewährt damit einen bonus von 0.01.
function buySimplyCellDivision():void{
    if(Einzeller >= simplyCellDivisionPrice){
        Einzeller -= simplyCellDivisionPrice;
        updateEinzeller();

        let button = document.getElementById("btnBuySimplyCellDivision");
        button.parentNode.removeChild(button);
        bonusPercent += 0.01;

        let span = document.getElementById("bonusPercent");
        span.innerHTML = bonusPercent.toString();
    }
}

// Diese function verbessert die "einfache Zellteilung" auf einer normalen Zellteilung.
// Dadurch wird der bonus um 0.01 erhöht.
function buyNormalCellDivision():void{
    if(Einzeller >= normalCellDivisionPrice){
        Einzeller -= normalCellDivisionPrice;
        updateEinzeller();

        let button = document.getElementById("btnBuyNormalCellDivision");
        button.parentNode.removeChild(button);
        bonusPercent += 0.01;
        normalCellDivisionBought = true;

        let span = document.getElementById("bonusPercent");
        span.innerHTML = bonusPercent.toString();
    }
}

// Frontend update methodes

// Diese Methode schickt die akutelle Anzahl der Einzeller an das Fontend.
function updateEinzeller():void{
    let span = document.getElementById("Einzeller");
    span.innerHTML =  Einzeller.toFixed(2);
}

// Diese Methode schickt die aktuelle Anzahl an Fruchtfliegen an das Frontend.
function updateFruchtfliege():void{
    let span = document.getElementById("Fruchtfliege");
    span.innerHTML = Fruchtfliegen.toString();
}

// Diese Methode schickt die aktuelle Anzahl an Fliegen an das Frontend.
function updateFliegen():void{
    let span = document.getElementById("Fliege");
    span.innerHTML = Fliegen.toString();
}

// Diese Methode schickt die aktuelle Anzahl an Einzeller pro Sekunde an das Frontend.
function updateEinzellerPerSecond():void{
    let span = document.getElementById("einzellerPerSecond");
    span.innerHTML = EinzellerPerSeconds.toString();
}

// general structure logic
function update(){
    Einzeller *= 1+bonusPercent;
    Einzeller += EinzellerPerSeconds;
    updateEinzeller();
    checkNewUpgrades();
}

function checkNewUpgrades(){
    if(Einzeller >= 1500 && document.getElementById("btnBuyNormalCellDivision") == null && !normalCellDivisionBought){
        let container = document.getElementById("Upgrades");
        let button = document.createElement("input");
        button.type = "button";
        button.value = "Normal celldevision (+1% bonus, 2.500)";
        button.onclick = buyNormalCellDivision;
        button.id = "btnBuyNormalCellDivision"
        container.appendChild(button);
    }
}

window.setInterval(update, 1000);
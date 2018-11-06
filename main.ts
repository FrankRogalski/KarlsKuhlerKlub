let Einzeller:number = 0;
let Insekten:number = 0;
let simplyCellDivisionBought = false;
let insektPrice = 50;

function addEinzeller():void{
    Einzeller++;
    updateEinzeller();
}

function addInsekt():void{
    if(Einzeller >= insektPrice){
        Einzeller -= insektPrice;
        insektPrice = Number((insektPrice * 1.1).toFixed(2));
        Insekten++;

        updateEinzeller();
        updateInsekt();

        let btn = document.getElementById("btnAddInsekt");
        btn.setAttribute("value", `Create (${insektPrice})`);
    }
}

function updateEinzeller():void{
    let span = document.getElementById("Einzeller");
    span.innerHTML =  (Einzeller*1.1).toFixed(2);
}

function updateInsekt():void{
    let span = document.getElementById("Insekt");
    span.innerHTML = Insekten.toString();
}

function buySimplyCellDivision():void{
    let button = document.getElementById("btnBuySimplyCellDivision");
    button.parentNode.removeChild(button);
    simplyCellDivisionBought = true;
}

function cellDivision(){
    Einzeller*=1.01;
    updateEinzeller();
}

function update(){
    if(simplyCellDivisionBought)
        cellDivision();

    Einzeller += Insekten*10;
    updateEinzeller();
}

window.setInterval(update, 1000);
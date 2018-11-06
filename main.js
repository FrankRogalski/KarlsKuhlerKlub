var Einzeller = 0;
var Insekten = 0;
var simplyCellDivisionBought = false;
var insektPrice = 50;
function addEinzeller() {
    Einzeller++;
    updateEinzeller();
}
function addInsekt() {
    if (Einzeller >= insektPrice) {
        Einzeller -= insektPrice;
        insektPrice = Number((insektPrice * 1.1).toFixed(2));
        Insekten++;
        updateEinzeller();
        updateInsekt();
        var btn = document.getElementById("btnAddInsekt");
        btn.setAttribute("value", "Create (" + insektPrice + ")");
    }
}
function updateEinzeller() {
    var span = document.getElementById("Einzeller");
    span.innerHTML = (Einzeller * 1.1).toFixed(2);
}
function updateInsekt() {
    var span = document.getElementById("Insekt");
    span.innerHTML = Insekten.toString();
}
function buySimplyCellDivision() {
    var button = document.getElementById("btnBuySimplyCellDivision");
    button.parentNode.removeChild(button);
    simplyCellDivisionBought = true;
}
function cellDivision() {
    Einzeller *= 1.01;
    updateEinzeller();
}
function update() {
    if (simplyCellDivisionBought)
        cellDivision();
    Einzeller += Insekten * 10;
    updateEinzeller();
}
window.setInterval(update, 1000);

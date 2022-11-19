//Global Variables
let money = 0;
let fuel = 0;
let miles = 0;
let gasPrice = 3.96;
let gasMilageCity = 21;
let gasMileageHighway = 27;
let gasMileage = (gasMilageCity + gasMileageHighway) / 2;
let refueling = false;

function refuel() {
    fuel += 0.004;
    money += (gasPrice * 0.004);
    miles += (gasMileage * 0.004);

    $("#cost").html(money.toFixed(2));
    $("#fuel").html(fuel.toFixed(3));
    $("#miles").html(miles.toFixed(2) + "mi");
}

$("#hold").mousedown(function() {
    $(this).css("background-color", "forestgreen");
    refueling = true;
    interval = setInterval(refuel, 75);
}).mouseup(function() {
    $(this).css("background-color", "gray");
    refueling = false;
    clearInterval(interval);
});

$("#toggle").click(function() {
    if(refueling == true) {
        clearInterval(interval);
        refueling = false;
        $(this).css("background-color", "gray");
    } else {
        interval = setInterval(refuel, 75);
        refueling = true;
        $(this).css("background-color", "forestgreen");
    }
});
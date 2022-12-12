//Global Variables
let money = 0;
let fuel = 0;
let miles = 0;
let gasPrice = 3.55;
let gasMilageCity = 21;
let gasMileageHighway = 27;
let tank = 14; //In gallons
let gasMileage = (gasMilageCity + gasMileageHighway) / 2;
let refueling = false;

$("#tank-value").html(fuel.toFixed(3) + "/" + tank + "gal | " + ((fuel / tank) * 100).toFixed(2) + "% full");

function refuel() {
    fuel += 0.004;
    money += (gasPrice * 0.004);
    miles += (gasMileage * 0.004);

    $("#cost").html(money.toFixed(2));
    $("#fuel").html(fuel.toFixed(3));
    $("#miles").html(miles.toFixed(2) + "mi");

    if(fuel < (tank * 0.2)) {
        //<25%
        $("#tank-visual").css("background-color", "red");
    } else if(fuel < (tank * 0.4)) {
        $("#tank-visual").css("background-color", "orangered");
    } else if(fuel < (tank * 0.6)) {
        $("#tank-visual").css("background-color", "orange");
    } else if(fuel < (tank * 0.8)) {
        $("#tank-visual").css("background-color", "yellow");
    } else if(fuel < tank) {
        $("#tank-visual").css("background-color", "lime");
    }

    $("#tank-visual").css("width", ((fuel / 14) * 100) + "%");

    $("#tank-value").html(fuel.toFixed(3) + "/" + tank + "gal | " + ((fuel / tank) * 100).toFixed(2) + "% full");
}

$("#hold").mousedown(function() {
    $(this).css("background-color", "forestgreen");
    refueling = true;
    interval = setInterval(refuel, 40);
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
        interval = setInterval(refuel, 40);
        refueling = true;
        $(this).css("background-color", "forestgreen");
    }
});

let tankSections = 8;
//Options:
//2, 4, 8, 12
if(tankSections % 4 != 0) console.log("Error: tankSections is invalid.");

for(i = 1; i <= tankSections - 1; i++) {
    let bar = $("<div></div>").addClass("bar").attr("id", "bar" + i);

    if(i % 2 != 0) {
        $(bar).css("height", 100 / tankSections + "%")
    } else if(i % 4 != 0) {
        $(bar).css("height", 100 / (tankSections / 2) + "%")
    } else if(i % 6 != 0) {
        $(bar).css("height", 100 / (tankSections / 4) + "%")
    }

    $("#tank-container").append(bar);
}
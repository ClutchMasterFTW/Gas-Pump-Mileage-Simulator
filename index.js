let fuelOptions = [
    {
        octane: 87,
        price: 3.89,
        alt: "Regular"
    },
    {
        octane: 89,
        price: 4.33,
        alt: "Mid-Grade"
    },
    {
        octane: 91,
        price: 4.75,
        alt: "Premium"
    },
    {
        octane: 93,
        price: 4.90,
        alt: "Super-Premium"
    },
    {
        octane: "Diesel",
        price: 5.99,
        alt: "Diesel"
    }
];

//Fuel Type
if(localStorage.getItem("selected") == (null || undefined)) {
    localStorage.setItem("selected", 0);
}
//Fuel Prices
if(localStorage.getItem("fuelPrices") == (null || undefined)) {
    localStorage.setItem("fuelPrices", JSON.stringify([3.89, 4.33, 4.75, 4.90, 5.99]));
} else {
    for(i = 0; i < fuelOptions.length; i++) {
        fuelOptions[i].price = JSON.parse(localStorage.getItem("fuelPrices"))[i];
        $("#price" + i).html("$" + fuelOptions[i].price.toFixed(2));
    }
}
//Tank Capacity
if(localStorage.getItem("tankCapacity") == (null || undefined)) {
    localStorage.setItem("tankCapacity", 18.5);
}
//Gas Mileage
if(localStorage.getItem("gasMileage") == (null || undefined)) {
    localStorage.setItem("gasMileage", JSON.stringify([19, 27]))
}
//Mileage Distribution
if(localStorage.getItem("mileageDistribution") == (null || undefined)) {
    localStorage.setItem("mileageDistribution", JSON.stringify([0.5, 0.5]));
}
//Pumping Speed
if(localStorage.getItem("pumpingSpeed") == (null || undefined)) {
    localStorage.setItem("pumpingSpeed", "normal");
    pumpingSpeed = 30
}

//Global Variables
let money = 0;
let fuel = 0;
let miles = 0;
function setEverything() {
    gasMileageCity = JSON.parse(localStorage.getItem("gasMileage"))[0]; //Miles
    gasMileageHighway = JSON.parse(localStorage.getItem("gasMileage"))[1]; //Miles
    tank = localStorage.getItem("tankCapacity"); //Gallons
    cityDistribution = JSON.parse(localStorage.getItem("mileageDistribution"))[0]; //Percentage
    highwayDistribution = JSON.parse(localStorage.getItem("mileageDistribution"))[1]; //Percentage
    gasMileage = mileageDistribute();
}
setEverything();
let refueling = false;
let interval;
let pumpingSpeed = 30;
switch(localStorage.getItem("pumpingSpeed")) {
    case "slow":
        pumpingSpeed = 75;
        break;
    case "normal":
        pumpingSpeed = 30;
        break;
    case "fast":
        pumpingSpeed = 15;
        break;
    case "hyper":
        pumpingSpeed = 5;
        break;
    default:
        pumpingSpeed = 30;
}

$("#tank-value").html(fuel.toFixed(3) + "/" + tank + "gal | " + ((fuel / tank) * 100).toFixed(2) + "% full");

function refuel() {
    fuel += 0.004;
    money += (selectedGasPrice * 0.004);
    miles += (gasMileage * 0.004);

    $("#cost").html(numberWithCommas(money.toFixed(2)));
    $("#fuel").html(fuel.toFixed(3));
    $("#miles").html(numberWithCommas(miles.toFixed(2)) + "mi");

    if(fuel < (tank * 0.2)) {
        //<25%
        $("#tank-visual").css("background-color", "red");
    } else if(fuel < (tank * 0.4)) {
        $("#tank-visual").css("background-color", "orangered");
    } else if(fuel < (tank * 0.6)) {
        $("#tank-visual").css("background-color", "orange");
    } else if(fuel < (tank * 0.8)) {
        $("#tank-visual").css("background-color", "rgb(190, 190, 0)");
    } else if(fuel < tank) {
        $("#tank-visual").css("background-color", "lime");
    }

    $("#tank-visual").css("width", ((fuel / tank) * 100) + "%");

    $("#tank-value").html(fuel.toFixed(3) + "/" + tank + "gal | " + ((fuel / tank) * 100).toFixed(2) + "% full");
    
    for(i = 1; i < tankSections; i++) {
        if(fuel > (((tank / tankSections) * i) - 0.002) && fuel < (((tank / tankSections) * i) + 0.002)) {
            // console.log("tank has reached " + i + "/" + tankSections + " capacity!");
            $("#tank-alert").html("Tank has reached " + i + "/" + tankSections + " total capacity!").css("opacity", "100%").css("visibility", "visible");
            $("#tank-container").css("background-color", "rgb(30, 30, 30)");
            setTimeout(function() {
                $("#tank-alert").css("opacity", "0%").css("visibility", "hidden");
                $("#tank-container").css("background-color", "lightgray");
            }, 3000);
        }
    }
}

function siphon() {
    if(fuel > 0) {
        fuel -= 0.004;
        money -= (selectedGasPrice * 0.004);
        miles -= (gasMileage * 0.004);

        $("#cost").html(numberWithCommas(money.toFixed(2)));
        $("#fuel").html(fuel.toFixed(3));
        $("#miles").html(numberWithCommas(miles.toFixed(2)) + "mi");

        if(fuel < (tank * 0.2)) {
            //<25%
            $("#tank-visual").css("background-color", "red");
        } else if(fuel < (tank * 0.4)) {
            $("#tank-visual").css("background-color", "orangered");
        } else if(fuel < (tank * 0.6)) {
            $("#tank-visual").css("background-color", "orange");
        } else if(fuel < (tank * 0.8)) {
            $("#tank-visual").css("background-color", "rgb(190, 190, 0)");
        } else if(fuel < tank) {
            $("#tank-visual").css("background-color", "lime");
        }

        $("#tank-visual").css("width", ((fuel / tank) * 100) + "%");

        $("#tank-value").html(fuel.toFixed(3) + "/" + tank + "gal | " + ((fuel / tank) * 100).toFixed(2) + "% full");
        
        for(i = 1; i < tankSections; i++) {
            if(fuel > (((tank / tankSections) * i) - 0.002) && fuel < (((tank / tankSections) * i) + 0.002)) {
                // console.log("tank has reached " + i + "/" + tankSections + " capacity!");
                $("#tank-alert").html("Tank has reached " + i + "/" + tankSections + " total capacity!").css("opacity", "100%").css("visibility", "visible");
                $("#tank-container").css("background-color", "rgb(30, 30, 30)");
                setTimeout(function() {
                    $("#tank-alert").css("opacity", "0%").css("visibility", "hidden");
                    $("#tank-container").css("background-color", "lightgray");
                }, 3000);
            }
        }
    }
}

$("#hold").mousedown(function() {
    $(this).css("background-color", "forestgreen");
    refueling = true;
    interval = setInterval(refuel, pumpingSpeed);
}).mouseup(function() {
    $(this).css("background-color", "gray");
    refueling = false;
    clearInterval(interval);
});

$("#siphon").mousedown(function() {
    $(this).css("background-color", "darkred");
    refueling = true;
    interval = setInterval(siphon, pumpingSpeed);
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
        interval = setInterval(refuel, pumpingSpeed);
        refueling = true;
        $(this).css("background-color", "forestgreen");
    }
});

let tankSections = 8;
//Possible Options:
//2, 4, 8, 12
if(tankSections % 4 != 0) console.log("Error: tankSections is invalid.");

for(i = 1; i <= tankSections - 1; i++) {
    let bar = $("<div></div>").addClass("bar")
                              .attr("id", "bar" + i);

    if(i % 2 != 0) {
        $(bar).css("height", 100 / tankSections + "%")
    } else if(i % 4 != 0) {
        $(bar).css("height", 100 / (tankSections / 2) + "%")
    } else if(i % 6 != 0) {
        $(bar).css("height", 100 / (tankSections / 4) + "%")
    }

    $("#tank-container").append(bar);
}

let selectedGasPrice = fuelOptions[localStorage.getItem("selected")].price;

for(let i = 0; i < fuelOptions.length; i++) {
    let screen = $("<div>\
                        <span class='material-icons' title='Click to edit the price of " + fuelOptions[i].alt + ".' style='cursor: pointer; user-select: none;' onclick='changeFuelType(" + i + ")'>edit</span>\
                        <p id='price" + i + "'>$" + fuelOptions[i].price.toFixed(2) + "</p>\
                    </div>").addClass("fuel-selector-screen");

    let container = $("<div></div>").addClass("fuel-selector");

    let caption = $("<div>MINIMUM OCTANE RATING</div>").css("font-weight", "700");

    let rating = $("<div>" + fuelOptions[i].octane + "</div>").css("font-weight", "1000").css("font-size", "80px");
    if(fuelOptions[i].octane == "Diesel") {
        rating.css("font-size", "50px");
    } else {
        rating.css("line-height", "65px");
    }

    $("#fuel-selectors").append(screen)
                        .append(container);
    
    container.append(caption)
             .append(rating);

    container.click(function() {
        container.css("animation", "slideUpAndDown 0.75s ease forwards");
        setTimeout(function() {
            container.css("animation", "none");
        }, 750);

        localStorage.setItem("selected", i);
        selectedGasPrice = fuelOptions[i].price;

        //Stop refueling (to prevent errors)
        refueling = false;
        clearInterval(interval);
        $("#toggle").css("background-color", "gray");

        //Change the overall value in the total
        money = selectedGasPrice * fuel;
        $("#cost").html(money.toFixed(2));
    })
}

function stats() {
    console.log("not created yet. (stats)");
}

function changeFuelType(type) {
    let fuelPrices = JSON.parse(localStorage.getItem("fuelPrices"));
    fuelPrices[type] = parseFloat(prompt("Enter the price per gallon of this fuel type:"));
    localStorage.setItem("fuelPrices", JSON.stringify(fuelPrices));
    fuelOptions[type].price = fuelPrices[type];

    $("#price" + type).html("$" + fuelPrices[type].toFixed(2));

    //Check if selected gas type is the value changed, if so, recalculate price of gas in tank
    if(localStorage.getItem("selected") == type) {
        selectedGasPrice = fuelPrices[type]; //could use fuelOptions[localStorage.getItem("selected")].price
        money = selectedGasPrice * fuel;
        $("#cost").html(money.toFixed(2));
    }
}

function settings() {
    settingsContainer = $("<div id='settings-container'></div>");
    let opacityContainer = $("<div id='settings-opacity-contaioner'></div>");
    let screen = $("<div id='settings-screen'></div>");
    let close = $("<span id='settings-close' class='material-icons'>close</span>");
    setting1 = $("<div class='setting-input-container'>\
                          <p title='The total capacity of your vehicle&#39;s tank, in US gallons.'>Tank Capacity (gal)</p>\
                      </div>");
    setting2 = $("<div class='setting-input-container'>\
                          <p title='The advertised gas mileage of your vehicle, in miles.'>Gas Mileage (mi)</p>\
                      </div>");
    setting3 = $("<div class='setting-input-container'>\
                          <p title='The distribution of the type of driving. Ex: 75% city & 25% highway means that 75% of the distance driven was in the city, while 25% was on the highway. Note: Both values must total to 100%; Default values are 55%/45%.'>Mileage Distribution (%)</p>\
                      </div>");
    setting4 = $("<div class='setting-input-container'>\
                          <p title='The speed at which this website pumps at. Default: Normal'>Pumping speed</p>\
                      </div>");

    setting1input = $("<input type='number' class='setting-input' min='0' value='" + tank + "'>");
    setting2maininputcontainer = $("<div class='row jc-center ai-center' style='gap: 5px;'></div>");
    setting2inputcontainer1 = $("<div class='column jc-center ai-center' style='padding-bottom: 2px;'></div>");
    setting2inputcontainer2 = $("<div class='column jc-center ai-center' style='padding-bottom: 2px;'></div>");
    setting2inputtitle1 = $("<div>City</div>");
    setting2inputtitle2 = $("<div>Highway</div>");
    setting2input1 = $("<input type='number' class='setting-input small' min='0' value='" + gasMileageCity + "'>");
    setting2input2 = $("<input type='number' class='setting-input small' min='0' value='" + gasMileageHighway + "'>");
    setting3maininputcontainer = $("<div class='row jc-center ai-center' style='gap: 5px;'></div>");
    setting3inputcontainer1 = $("<div class='column jc-center ai-center' style='padding-bottom: 2px;'></div>");
    setting3inputcontainer2 = $("<div class='column jc-center ai-center' style='padding-bottom: 2px;'></div>");
    setting3inputtitle1 = $("<div>City</div>");
    setting3inputtitle2 = $("<div>Highway</div>");
    setting3input1 = $("<input type='number' class='setting-input small' min='0' value='" + (cityDistribution * 100).toFixed(0) + "'>");
    setting3input2 = $("<input type='number' class='setting-input small' min='0' value='" + (highwayDistribution * 100).toFixed(0) + "'>");
    setting4input = $("<form>\
                               <input type='radio' id='slow' name='button'>\
                               <label for='slow'>Slow</label>\
                               <input type='radio' id='normal' name='button'>\
                               <label for='normal'>Normal</label>\
                               <input type='radio' id='fast' name='button'>\
                               <label for='fast'>Fast</label>\
                               <input type='radio' id='hyper' name='button'>\
                               <label for='hyper'>Hyper</label>\
                           </form>");

    let save = $("<button onclick='saveSettings()'><span class='material-icons'>save</span>Save and Apply</button>");

    //I know this is messy, I should just convert this to HTML later as JSX isn't needed
    $("body").append(settingsContainer.append(opacityContainer.append(screen)
                                                      .append(close)
                                                      .append(setting1.append(setting1input))
                                                      .append(setting2.append(setting2maininputcontainer.append(setting2inputcontainer1.append(setting2inputtitle1)
                                                                                                                                       .append(setting2input1))
                                                                                                        .append(setting2inputcontainer2.append(setting2inputtitle2)
                                                                                                                                       .append(setting2input2))))
                                                      .append(setting3.append(setting3maininputcontainer.append(setting3inputcontainer1.append(setting3inputtitle1)
                                                                                                                                       .append(setting3input1))
                                                                                                        .append(setting3inputcontainer2.append(setting3inputtitle2)
                                                                                                                                       .append(setting3input2))))
                                                      .append(setting4.append(setting4input))
                                                      .append(save)));

    $("#" + localStorage.getItem("pumpingSpeed")).attr("checked", true);

    $("#settings").css("pointer-events", "none")
                  .css("transform", "rotate(45deg)");

    setTimeout(function() {
        for(let i = 0; i <= "settings".length; i++) {
            setTimeout(function() {
                // console.log("settings".substring(0, i));
                screen.html("settings".substring(0, i));
            }, i * 200);
        }
    }, 1250);

    close.click(function() {
        settingsContainer.css("animation", "settingsShrink 0.75s ease forwards");

        setTimeout(function() {
            settingsContainer.remove();
            $("#settings").css("pointer-events", "auto")
                          .css("transform", "rotate(0deg)");
        }, 750);
    });
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function saveSettings() {
    // For pumpingSpeed, search through the elements with the ids: #slow, #normal, #fast, and #hyper

    if(($(setting1input).val() == NaN || $(setting1input).val() == null || $(setting1input).val() == undefined) ||
       ($(setting2input1).val() == NaN || $(setting2input1).val() == null || $(setting2input1).val() == undefined) ||
       ($(setting2input2).val() == NaN || $(setting2input2).val() == null || $(setting2input2).val() == undefined) ||
       ($(setting3input1).val() == NaN || $(setting3input1).val() == null || $(setting3input1).val() == undefined) ||
       ($(setting3input2).val() == NaN || $(setting3input2).val() == null || $(setting3input2).val() == undefined)) {
        alert("There was an issue saving your settings (something inputted was not parsable).");
    } else {
        //Tank Capacity
        localStorage.setItem("tankCapacity", $(setting1input).val());
        //Gas Mileage
        localStorage.setItem("gasMileage", JSON.stringify([$(setting2input1).val(), $(setting2input2).val()]))
        //Mileage Distribution
        localStorage.setItem("mileageDistribution", JSON.stringify([$(setting3input1).val() / 100, $(setting3input2).val() / 100]));
        //Pumping Speed
        const speeds = ["slow", "normal", "fast", "hyper"];
        for(i = 0; i < speeds.length; i++) {
            if($("#" + speeds[i]).attr("checked") == true) {
                localStorage.setItem("pumpingSpeed", speeds[i]);
                break;
            }
        }
        switch(localStorage.getItem("pumpingSpeed")) {
            case "slow":
                pumpingSpeed = 75;
                break;
            case "normal":
                pumpingSpeed = 30;
                break;
            case "fast":
                pumpingSpeed = 15;
                break;
            case "hyper":
                pumpingSpeed = 5;
                break;
            default:
                pumpingSpeed = 30;
        }
    }

    setEverything();
    recalculateEverything();

    //close settings menu
    settingsContainer.css("animation", "settingsShrink 0.75s ease forwards");

    setTimeout(function() {
        settingsContainer.remove();
        $("#settings").css("pointer-events", "auto")
                        .css("transform", "rotate(0deg)");
    }, 750);
}

function mileageDistribute() {
    let cityMileage = JSON.parse(localStorage.getItem("gasMileage"))[0];
    let highwayMileage = JSON.parse(localStorage.getItem("gasMileage"))[1];
    let cityDistribution = JSON.parse(localStorage.getItem("mileageDistribution"))[0];
    let highwayDistribution = JSON.parse(localStorage.getItem("mileageDistribution"))[1];
    let calculatedMileage = (cityMileage * cityDistribution) + (highwayMileage * highwayDistribution);
    
    return calculatedMileage;
}

function recalculateEverything() {
    //Called when any settings are changed
    money = selectedGasPrice * fuel;
    $("#cost").html(money.toFixed(2));
    miles = gasMileage * fuel;
    $("#miles").html(miles.toFixed(2) + "mi");
    $("#tank-value").html(fuel.toFixed(3) + "/" + tank + "gal | " + ((fuel / tank) * 100).toFixed(2) + "% full");
}

function stats() {
    //Show how far you will go per cent in miles and feet
    //Concept:
    //
    let container = $("<div id='stats-container'>\
                           <h1>Stats</h1>\
                           <p>In five days</p>\
                       </div>");

    $("body").append(container);
}

//Copyright Kyle R. | 2021-2024
//Usage Restrictions:
//This code is provided for personal or internal use only and may not be sold, redistributed, or included in any product that is sold or distributed.
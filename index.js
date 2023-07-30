function MouseReaction(x) {
    $(x).toggleClass("mouse-over-input")
}

function Calculate(value) {
    const inputUnit = $("#Partenza").val();
    const givenValue = $("#inputEntered")

    let resultValue;
    switch (inputUnit) {
        case "mg/mL":
            resultValue = mgmLToM()
    }
}

function convertUnit(input, conversionFactor) {
    const wm = $("#wm").val();
    const result = input / wm * conversionFactor;
    return result;
}

function gmLToM(input) {
    return convertUnit(input, 1e3); 
}

function mgmLToM(input) {
    return convertUnit(input, 1); 
}

function mgmLTouM(input) {
    return convertUnit(input, 1e6);
}

function mgmLTomM(input) {
    return convertUnit(input, 1e3);
}
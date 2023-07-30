function MouseReaction(x) {
    $(x).toggleClass("mouse-over-input")
}

function Calculate() {
    const inputUnit = $("#Partenza").val();
    const outputUnit = $("#arrivo").val();
    const unitCombo = `${inputUnit}-${outputUnit}`
    const givenValue = $("#inputEntered").val();

    let resultValue;
    switch (unitCombo) {
        case "mg/mL-M" :
            resultValue = mgmLToM(givenValue);
            break;
        case "g/mL-M":
            resultValue = gmLToM(givenValue);
            break;
        case "mg/mL-uM":
            resultValue = mgmLTouM(givenValue);
            break;
        case "mg/mL-mM":
            resultValue = mgmLTomM(givenValue)
            break;
    }
    $(".result").text(resultValue)
}

function convertUnit(input, conversionFactor) {
    const mw = $("#wm").val();
    const result = input / mw * conversionFactor;
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
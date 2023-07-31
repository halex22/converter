function MouseReaction(x) {
    $(x).toggleClass("mouse-over-input")
}

function resetResultArea() {
    $("#sameUnit").text("")
    $("#result").text("")
    $("#resultVar").text("")
}

function Calculate() {
    resetResultArea();
    const inputUnit = $("#Partenza").val();
    const outputUnit = $("#arrivo").val();
    const unitCombo = `${inputUnit}-${outputUnit}`
    const givenValue = $("#inputEntered").val();

    let resultValue;
    switch (unitCombo) {
        case "mg/mL-M" :
            resultValue = mgmLToM(givenValue, false);
            break;
        case "g/mL-M":
            resultValue = gmLToM(givenValue, false);
            break;
        case "mg/mL-μM":
            resultValue = mgmLTouM(givenValue, false);
            break;
        case "mg/mL-mM":
            resultValue = mgmLTomM(givenValue, false)
            break;
            // reverse
        case "M-mg/mL":
            resultValue = mgmLToM(givenValue, true);
            break;
        case "M-g/mL":
            resultValue = gmLToM(givenValue, true);
            break;
        case "μM-mg/mL":
            resultValue = mgmLTouM(givenValue, true)
            break;
        case "μM-g/mL":
            resultValue = mgmLTouM()
        case "mM-mg/mL":
            resultValue = mgmLTomM(givenValue, true)
            break;
            // in between M's
        case "M-mM":
            resultValue = MTomM(givenValue, false);
            break;
        case "M-μM":
            resultValue = MTouM(givenValue, false);
            break;
        case "mM-M":
            resultValue = MTomM(givenValue, true);
            break;
        case "μM-M":
            resultValue = MTouM(givenValue, true)
            break;
        default:
            $("#sameUnit").text("Unità di partenza e arrivo sono la stessa")
    }
    $("#result").text(resultValue.toFixed(5))
    $("#resultVar").text(outputUnit)
}

function convertUnit(input, conversionFactor, reverse) {
    const mw = $("#wm").val();
    const result = reverse ? (input * mw) / conversionFactor : (input / mw) * conversionFactor;
    return result;
}

function gmLToM(input, reverse) {
    return convertUnit(input, 1e3, reverse); 
}

function mgmLToM(input, reverse) {
    return convertUnit(input, 1, reverse); 
}

function mgmLTouM(input, reverse) {
    return convertUnit(input, 1e6, reverse);
}

function mgmLTomM(input, reverse) {
    return convertUnit(input, 1e3, reverse);
}

function gmLTouM (input, reverse) {
    return convertUnit(input, 1e6, reverse)
}

function MTomM(input, reverse) {
    const result = reverse ? (input * 1e-3) : (input * 1e3)
    return result
}

function MTouM(input, reverse) {
    const result = reverse ? (input * 1e-6) : (input * 1e6)
    return result
}



function cal() {
    const givenValue = parseFloat(document.getElementById("inputEntered").value);
    const unitCombo = createComboUnit();
    let result
    switch (unitCombo) {
        case unitCombo === "mg/ml-g/ml":
            result =  givenValue * 1e-3;
            break;
        case unitCombo === "mg/ml-m":
            result = givenValue / fetchMW();
            break;
        case unitCombo === "g/ml-μm":
            result = (givenValue / fetchMW()) * 1e9;
            break;
    
        default:
            break;
    }
    writeResult(result)
}

function fetchMW() {
    wmValue = document.getElementById("wm").value
    if (wmValue) {
        return parseFloat(wmValue);
    } else {
        alert("MW is missing")
    }
}
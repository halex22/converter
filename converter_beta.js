
function cal() {
    const givenValue = parseFloat(document.getElementById("inputEntered").value);
    const unitCombo = createComboUnit();
    let result
    if (startUnitMissing()) {
        return alert("Valore a convertire mancante");
    }
    if (SameInput()) {
        const unitEle = document.getElementById("sameUnit")
        if (unitEle) {
            unitEle.textContent = "Unità di partenza e arrivo sono le stesse";
            return 
        }
    }
    switch (unitCombo) {
        case "mg/ml-g/ml":
            result =  givenValue * 1e-3;
            break;
        case "mg/ml-m":
            result = givenValue / fetchMW();
            break;
        case "g/ml-μm":
            result = (givenValue / fetchMW()) * 1e9;
            break;
        case "m-mg/ml":
            result = givenValue * fetchMW();
            break;
        case "m-g/ml":
        case "mm-mg/ml":
            result = (givenValue * fetchMW()) / 1e3;
            break;
        case "m-mm":
        case "mm-μm":
            result = givenValue * 1e3;
            break;
        case "m-μm":
            result = givenValue * 1e6;
            break;
        case "mm-g/ml":
        case "μm-mg/ml":
            result = (givenValue * fetchMW()) / 1e6;
            break;
        case "mm-m":
            result = givenValue / 1e3;
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
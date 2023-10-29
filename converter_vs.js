const unitMap = {
    "g/ml-m": { value: 1000, useMW: true },
    "mg/ml-m": { value: 1, useMW: true },
    "g/ml-mg/ml": { value: 0, useMW: false },
    "mg/ml-μm": { value: 1e-6, useMW: true },
    "mg/ml-mm": { value: 1e-3, useMW: true },
    "m-mg/ml": { value: 1, useMW: true },
    "m-g/ml": { value: 1e-3, useMW: true },
    "μm-mg/ml": { value: 1e6, useMW: true },
    "μm-g/ml": { value: 1e3, useMW: true },
    "mm-mg/ml": { value: 1e3, useMW: true },
    "m-mm": { value: 1e3, useMW: false },
    "m-μm": { value: 1e6, useMW: false },
    "mm-m": { value: 1e-3, useMW: false },
    "μm-m": { value: 1e-6, useMW: false },
    "mm-g/ml": { value: 1, useMW: true },
    "mm-μm": { value: 1000, useMW: false },
    "μm-mm": { value: 0.001, useMW: false },
    "mg/ml-g/ml": { value: 0.001, useMW: false },
    "g/ml-gm/ml": { value: 1, useMW: false }
};

function MouseReaction(x) {
    $(x).toggleClass("mouse-over-input");
}
  

function resetResultArea() {
    const list = document.querySelectorAll("#sameUnit, #result, #resultVar");
    [...list].forEach(item => {
        item.textContent = "";
    });
}

function convertUnit(input, conversionFactor, reverse, useMW) {
    const wmValue = document.getElementById("wm").value
    const mw = useMW ? parseFloat(wmValue) : 1
    const result = reverse ? (input * mw) / conversionFactor : // da M a massa
    (input / mw) * conversionFactor; // da massa a M 
    return result;
}

function createComboUnit() {
    const inputUnit = document.getElementById("Partenza").value;
    const outputUnit = document.getElementById("arrivo").value;
    const unitCombo = `${inputUnit}-${outputUnit}`.toLowerCase();
    return unitCombo
}


function Calculate() {
    const unitCombo = createComboUnit();
    const givenValue = parseFloat(document.getElementById("inputEntered").value);
    let result

    const conversionFactor = unitMap[unitCombo].value;
    const useMWFactor = unitMap[unitCombo].useMW;

    if (conversionFactor === undefined) {
        document.getElementById("sameUnit").
        textContent("Unità di partenza e arrivo sono le stesse");
        return;
    }
    const reverseConversion = unitCombo.startsWith("m-");
    if (unitCombo === "mm-μm" || unitCombo === "μm-mm") {
        result = convertUnit(givenValue, conversionFactor, false, false);
    } else {
        result = convertUnit(givenValue, conversionFactor, reverseConversion, useMWFactor);
    }

    // const resultElement = document.getElementById("result") 
    console.log(result)
    document.getElementById("result").text = result.toFixed(6);
    document.getElementById("resultVar").
    textContent = document.getElementById("arrivo").value;
}
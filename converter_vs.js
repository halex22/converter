/**
 * @typedef {Object.<string, {value: number, useMW: boolean}>} unitMap
 */

/**
 * @type {unitMap}
 */
const unitMap = {
    "g/ml-m": { value: 1e3, useMW: true },
    "g/ml-mm": {value: 1e6, useMW: true},
    "g/ml-μm": {value: 1e9, useMW: true},
    "mg/ml-m": { value: 1, useMW: true },
    "g/ml-mg/ml": { value: 1e3, useMW: false },
    "mg/ml-μm": { value: 1e6, useMW: true },
    "mg/ml-mm": { value: 1e3, useMW: true },
    "m-mg/ml": { value: 1, useMW: true },
    "m-g/ml": { value: 1e3, useMW: true },
    "μm-mg/ml": { value: 1e6, useMW: true },
    "μm-g/ml": { value: 1e3, useMW: true },
    "mm-mg/ml": { value: 1e3, useMW: true },
    "m-mm": { value: 1e3, useMW: false },
    "m-μm": { value: 1e6, useMW: false },
    "mm-m": { value: 1e-3, useMW: false },
    "μm-m": { value: 1e-6, useMW: false },
    "mm-g/ml": { value: 1e6, useMW: true },
    "mm-μm": { value: 1000, useMW: false },
    "μm-mm": { value: 0.001, useMW: false },
    "mg/ml-g/ml": { value: 1e-3, useMW: false },
    "g/ml-gm/ml": { value: 1, useMW: false }
};

/**
 * 
 * @param {HTMLElement} element
 */
function MouseReaction(element) {
    element.classList.toggle("mouse-over-input");
}
  

function resetResultArea() {
    const list = document.querySelectorAll("#sameUnit, #result, #resultVar");
    [...list].forEach(item => {
        item.textContent = "";
    });
}

/**
 * Converts the given input to the selected measure 
 * @param {number} input 
 * @param {number} conversionFactor 
 * @param {boolean} reverse - true if converting molars to g/ml or mg/ml
 * @param {boolean} useMW 
 * @returns {number}
 */
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
    if (startUnitMissing()) {
        return alert("Valore a convertire mancante");
    }
    const unitCombo = createComboUnit();
    const givenValue = parseFloat(document.getElementById("inputEntered").value);
    let result

    if (SameInput()) {
        const unitEle = document.getElementById("sameUnit")
        if (unitEle) {
            unitEle.textContent = "Unità di partenza e arrivo sono le stesse";
            return 
        }
    }
    const conversionFactor = unitMap[unitCombo].value;
    const useMWFactor = unitMap[unitCombo].useMW;

    if (convertBetweenMs(unitCombo.split("-"))) {
        result = convertUnit(givenValue, conversionFactor, false, false);
    } else {
        result = convertUnit(givenValue, conversionFactor, true, useMWFactor);
    }
    writeResult(result);
}

/**
 * Writes the result of the convertion
 * @param {Number} result 
 */

function writeResult(result) {
    document.getElementById("result").textContent = result;
    document.getElementById("resultVar").
    textContent = document.getElementById("arrivo").value;
}

/**
 * Checks if a combination contains the letter 'm'.
 * @param {string[]} combo An array representing a combination.
 * @returns {boolean} - True if 'm' is present in the combination, false otherwise.
 */
function convertBetweenMs(combo) { // here !!!!
    return combo[0].length <= 2 && combo[1].length <= 2;
}

/**
 * 
 * @returns {boolean} - True if the inputs are the same
 */
function SameInput() {
    const comboArray = createComboUnit().split("-");
    return comboArray[0] === comboArray[1];
}


function startUnitMissing() {
    const value = document.getElementById("inputEntered").value;
    return value.length === 0
}
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
    $("#sameUnit").text("");
    $("#result").text("");
    $("#resultVar").text("");
}
  
function Calculate() {
    resetResultArea();
    const inputUnit = $("#Partenza").val();
    const outputUnit = $("#arrivo").val();
    const unitCombo = `${inputUnit}-${outputUnit}`.toLowerCase(); // Convert to lowercase
    const givenValue = parseFloat($("#inputEntered").val());
  
    const conversionFactor = unitMap[unitCombo].value;
    const useMWFactor = unitMap[unitCombo].useMW;
    if (conversionFactor === undefined) {
      $("#sameUnit").text("Unità di partenza e arrivo sono la stessa");
      return;
    }
    const reverseConversion = unitCombo.startsWith("m-"); // Check if it's a reverse conversion
    console.log(reverseConversion);
    // Handle the new entries for mM to uM and uM to mM conversions
    if (unitCombo === "mm-μm" || unitCombo === "μm-mm") {
      const resultValue = convertUnit(givenValue, conversionFactor, reverseConversion);
      $("#result").text(resultValue.toFixed(6));
      $("#resultVar").text(outputUnit);
      return;
    }
    const resultValue = convertUnit(givenValue, conversionFactor, reverseConversion, useMWFactor);
    $("#result").text(resultValue.toFixed(6));
    $("#resultVar").text(outputUnit);
}  

function convertUnit(input, conversionFactor, reverse, useMW) {
    const mw = useMW ? parseFloat($("#wm").val()) : 1
    const result = reverse ? (input * mw) / conversionFactor : // da M a massa
    (input / mw) * conversionFactor; // da massa a M 
    return result;
}
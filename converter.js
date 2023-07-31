const unitMap = {
    "mg/ml-m": 1,
    "g/ml-m": 1000,
    "mg/ml-μm": 1e-6,
    "mg/ml-mm": 1e-3,
    "m-mg/ml": 1,
    "m-g/ml": 1e-3,
    "μm-mg/ml": 1e6,
    "μm-g/ml": 1e3,
    "mm-mg/ml": 1e3,
    "m-mm": 1e3,
    "m-μm": 1e6,
    "mm-m": 1e-3,
    "μm-m": 1e-6,
    "mm-g/ml": 1,
    "mm-μm": 1000,
    "μm-mm": 0.001,
    "mg/ml-g/ml": 0.001,
    "g/ml-gm/ml": 1
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

    console.log(unitCombo);
  
    const conversionFactor = unitMap[unitCombo];
    if (conversionFactor === undefined) {
      $("#sameUnit").text("Unità di partenza e arrivo sono la stessa");
      return;
    }
    const reverseConversion = unitCombo.startsWith("m-"); // Check if it's a reverse conversion

    // Handle the new entries for mM to uM and uM to mM conversions
    if (unitCombo === "mM-μM" || unitCombo === "μM-mM") {
      const resultValue = convertUnit(givenValue, conversionFactor, reverseConversion);
      $("#result").text(resultValue.toFixed(5));
      $("#resultVar").text(outputUnit);
      return;
    }
    const resultValue = convertUnit(givenValue, conversionFactor, reverseConversion);
    $("#result").text(resultValue.toFixed(5));
    $("#resultVar").text(outputUnit);
}  

function convertUnit(input, conversionFactor, reverse) {
    const mw = parseFloat($("#wm").val());
    const result = reverse ? (input * mw) / conversionFactor : (input / mw) * conversionFactor;
    return result;
}
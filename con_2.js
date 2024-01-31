
/**
 * 
 * @param {[]} array 
 * @returns {number}
 */
function mean(array) {
    return array.reduce((sum, value) => sum + value, 0) / array.length
}

/**
 * 
 * @param {[]} array 
 * @param {number} meanValue 
 * @returns 
 */
function standardDeviation(array, meanValue) {
    const squaredDifferences = array.map(value => Math.pow(value - meanValue, 2));
    const variance = squaredDifferences.reduce((sum, value) => sum + value,0) /array.length;
    return Math.sqrt(variance)
}




class Converter {

    static xRowData = document.getElementById("x");
    static yRowData = document.getElementById("y");

    static init() {
        const xData = Converter.cleanInput(Converter.xRowData.value);
        const yData = Converter.cleanInput(Converter.yRowData.value);

        const meanX = mean(xData);
        const meanY = mean(yData);

        const numeratore = xData.reduce((sum, _, i) => sum + (xData[i] - meanX) * (yData[i] - meanY), 0);
        console.log(numeratore)
        // const result = covariance / (stdDevX * stdDevY);

        const partA = xData.reduce((sum, _, i) => sum + Math.pow((xData[i] - meanX),2), 0)
        // const partAA = Math.pow(partA, 2);
        // console.log(partA, " ", partAA)
        const partB = yData.reduce((sum, _, i) => sum + Math.pow((yData[i] - meanY), 2), 0)
        // const partBB = Math.pow(partB, 2);
        // console.log(partB, " ", partBB)

        // const denominatore =  sqrroot of partpartAsqrA * partBsqr
        const denominatore = Math.sqrt(partA * partB);
        
        console.log('numeratore '+ numeratore);
        console.log('denominatore ' + denominatore);

        const result = numeratore / denominatore
        // console.log(result.toFixed(2));
        Converter.writeResult(result)
    }

    static writeResult(result) {
        const target = document.getElementById('result');
        target.innerText = result
    }

    /**
     * 
     * @param {string} values 
     */
    static cleanInput(values) {
        const numbersAsString = values.split('\t');
        const numbersArray = numbersAsString.map(Number);
        return numbersArray;
    }

    /**
     * 
     * @param {[]} array1 
     * @param {[]} array2
     */
    static lengthControl(array1, array2) {
        return array1.length === array2.length ? true : false
    }
}

const btn = document.getElementById('actionBtn');
btn.addEventListener('click', () => {
    Converter.init();
})
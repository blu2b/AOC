import { ReadFile, SplitMultiLineString } from '../../helper/typescript/helper';

Main();

function Main() {
    // read calibration document
    let calibrationDocument = ReadFile('./calibrationDocument.txt');
    //
    let calibrationValues = GetCalibrationValues(SplitMultiLineString(calibrationDocument));
    //
    console.log(GetCalibrationValuesSum(calibrationValues));
}

// get calibration values of every line
function GetCalibrationValues(calibrations : string[]) {
    let filtertedCalibrations : string[] = new Array<string>;

    for (let i = 0; i < calibrations.length; i++) {
        let digitsOnly = calibrations[i].match(/\d+/g);

        if (digitsOnly != null && digitsOnly.length != 0) {
            filtertedCalibrations[i] = digitsOnly[0] + digitsOnly[digitsOnly.length - 1];
        }
    }    
    return filtertedCalibrations;
}

// sum up all values and return them
function GetCalibrationValuesSum(calibrationValues : string[]) {
    let sum = 0;
    calibrationValues.forEach(val => {
        sum += +val;
    });

    return sum;
}
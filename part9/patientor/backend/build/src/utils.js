"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewPatientData = exports.getErrorMessage = void 0;
const types_1 = require("./types");
const getErrorMessage = (error) => {
    const message = (error instanceof Error)
        ? error.message
        : 'Unknown error';
    return message;
};
exports.getErrorMessage = getErrorMessage;
const isString = (str) => typeof str === 'string';
const parseString = (str, variableName = 'unknown') => {
    if (!str || !isString(str)) {
        throw new Error(`Incorrect or missing string for '${variableName}' variable: ${str}`);
    }
    return str;
};
const isDate = (date) => Boolean(Date.parse(date));
const parseDate = (date) => {
    const strDate = parseString(date);
    if (!isDate(strDate)) {
        throw new Error(`Incorrect or missing date: ${date}`);
    }
    return strDate;
};
const isGender = (gender) => Object.values(types_1.Gender).map(v => v.toString()).includes(gender);
const parteGender = (gender) => {
    const genderStr = parseString(gender);
    if (!isGender(genderStr)) {
        throw new Error(`Incorrect or missing gender: ${genderStr}`);
    }
    return genderStr;
};
const toNewPatientData = (object) => {
    if (!object || typeof object !== 'object') {
        throw new Error(`Incorrect or missing data: ${object}`);
    }
    if ('name' in object
        && 'dateOfBirth' in object
        && 'ssn' in object
        && 'gender' in object
        && 'occupation' in object) {
        const newPatientData = {
            name: parseString(object.name, 'name'),
            dateOfBirth: parseDate(object.dateOfBirth),
            ssn: parseString(object.ssn, 'ssn'),
            gender: parteGender(object.gender),
            occupation: parseString(object.occupation, 'occupation'),
        };
        return newPatientData;
    }
    throw new Error('Some fields are missing on new patient data');
};
exports.toNewPatientData = toNewPatientData;

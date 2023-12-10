"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patient_1 = __importDefault(require("../services/patient"));
const utils_1 = require("../utils");
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.send(patient_1.default.getAll());
});
router.post('/', (req, res) => {
    try {
        const newPatientData = (0, utils_1.toNewPatientData)(req.body);
        const patientAdded = patient_1.default.create(newPatientData);
        return res.status(201).send(patientAdded);
    }
    catch (error) {
        return res.status(400).send((0, utils_1.getErrorMessage)(error));
    }
});
exports.default = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patient_1 = __importDefault(require("../services/patient"));
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.send(patient_1.default.getAll());
});
router.post('/', (req, res) => {
    /* eslint-disable @typescript-eslint/no-unsafe-assignment */
    const { name, dateOfBirth, ssn, gender, occupation } = req.body;
    const patientAdded = patient_1.default.create({
        name,
        dateOfBirth,
        ssn,
        gender,
        occupation
    });
    res.status(201).send(patientAdded);
});
exports.default = router;

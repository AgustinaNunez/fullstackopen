"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const diagnose_1 = __importDefault(require("./src/routes/diagnose"));
const patient_1 = __importDefault(require("./src/routes/patient"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const apiRouter = express_1.default.Router();
app.use('/api', apiRouter);
apiRouter.get('/ping', (_req, res) => {
    res.send('pong');
});
apiRouter.use('/diagnoses', diagnose_1.default);
apiRouter.use('/patients', patient_1.default);
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

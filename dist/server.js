"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const routes_1 = require("./controllers/routes");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const port = 3000;
const httpServer = (0, http_1.createServer)(app);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.set('trust proxy', true);
    app.disable('etag');
    app.use(routes_1.routes);
    try {
        httpServer.listen(port, () => {
            console.log(`Server running on http://localhost:${port}`);
        });
    }
    catch (error) {
        console.log(`Error occurred: ${error.message}`);
    }
});
void start();

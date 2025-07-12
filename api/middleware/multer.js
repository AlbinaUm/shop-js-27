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
exports.imagesUpload = void 0;
const multer_1 = __importDefault(require("multer"));
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const config_1 = __importDefault(require("../config"));
const node_crypto_1 = require("node:crypto");
const imageStorage = multer_1.default.diskStorage({
    destination: (_req, _file, cb) => __awaiter(void 0, void 0, void 0, function* () {
        // api/public/images
        const destDir = path_1.default.join(config_1.default.publicPath, 'images');
        yield fs_1.promises.mkdir(destDir, { recursive: true });
        cb(null, destDir);
    }),
    filename: (_req, file, cb) => {
        const extension = path_1.default.extname(file.originalname);
        cb(null, (0, node_crypto_1.randomUUID)() + extension);
    }
});
exports.imagesUpload = (0, multer_1.default)({ storage: imageStorage });

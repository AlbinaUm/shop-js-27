"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const rootPath = __dirname;
const config = {
    rootPath,
    google: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    publicPath: path_1.default.join(rootPath, 'public'),
    db: process.env.MONGO_URL || 'mongodb://localhost:27017/test-shop',
};
exports.default = config;

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
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
let db;
let client;
const connect = () => __awaiter(void 0, void 0, void 0, function* () {
    client = yield mongodb_1.MongoClient.connect('mongodb://localhost');
    db = client.db('shop-js-27');
});
const disconnect = () => __awaiter(void 0, void 0, void 0, function* () {
    yield client.close();
});
const mongoDb = {
    connect,
    disconnect,
    getDb: () => db,
};
exports.default = mongoDb;

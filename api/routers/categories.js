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
const express_1 = __importDefault(require("express"));
const Category_1 = __importDefault(require("../models/Category"));
const mongoose_1 = require("mongoose");
const categoryRouter = express_1.default.Router();
categoryRouter.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield Category_1.default.find();
        res.send(categories);
    }
    catch (e) {
        next(e);
    }
}));
categoryRouter.post('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newCategory = {
            title: req.body.title,
            description: req.body.description,
        };
        const category = new Category_1.default(newCategory);
        yield category.save();
        res.send(category);
    }
    catch (error) {
        if (error instanceof mongoose_1.Error.ValidationError) {
            res.status(400).send(error);
            return;
        }
        next(error);
    }
}));
exports.default = categoryRouter;

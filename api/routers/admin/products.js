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
const mongoose_1 = require("mongoose");
const multer_1 = require("../../middleware/multer");
const Product_1 = __importDefault(require("../../models/Product"));
const productAdminRouter = express_1.default.Router();
productAdminRouter.patch('/:id', multer_1.imagesUpload.single('image'), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (!id) {
            res.status(400).send({ error: 'Product id must be in req params' });
            return;
        }
        const updateProduct = Object.assign({}, req.body);
        if (req.file) {
            updateProduct.image = 'images/' + req.file.filename;
        }
        // product - вернет вам уже обновленный продукт полностью
        const product = yield Product_1.default.findByIdAndUpdate(id, updateProduct, { new: true, runValidators: true });
        if (!product) {
            res.status(404).send({ error: 'Product not found' });
            return;
        }
        yield product.save();
        res.send(product);
    }
    catch (error) {
        if (error instanceof mongoose_1.Error.ValidationError || error instanceof mongoose_1.Error.CastError) {
            res.status(400).send(error);
            return;
        }
        next(error);
    }
}));
productAdminRouter.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category_id = req.query.category;
        const filter = {};
        if (category_id)
            filter.category = category_id;
        const products = yield Product_1.default.find(filter).populate("category", "title");
        res.send(products);
    }
    catch (e) {
        next(e); // 500 сервак падает и такого допускать не нужно
    }
}));
productAdminRouter.post('/', multer_1.imagesUpload.single('image'), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newProduct = {
            category: req.body.category,
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            image: req.file ? 'images/' + req.file.filename : null,
        };
        const product = new Product_1.default(newProduct);
        yield product.save();
        res.send(product);
    }
    catch (error) {
        if (error instanceof mongoose_1.Error.ValidationError || error instanceof mongoose_1.Error.CastError) {
            res.status(400).send(error);
            return;
        }
        next(error);
    }
}));
exports.default = productAdminRouter;

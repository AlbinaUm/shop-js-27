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
const mongoose_1 = __importDefault(require("mongoose"));
const Category_1 = __importDefault(require("./Category"));
const Schema = mongoose_1.default.Schema;
const ProductSchema = new Schema({
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true,
        validate: {
            validator: (value) => __awaiter(void 0, void 0, void 0, function* () {
                const category = yield Category_1.default.findById(value);
                return !!category;
            }),
            message: "Category not found",
        },
    },
    title: {
        type: String,
        required: [true, 'Заголовок обязательное поле'],
    },
    price: {
        type: Number,
        required: [true, 'Стоимость обязательное поле'],
        validate: [
            {
                validator: (value) => __awaiter(void 0, void 0, void 0, function* () {
                    return !isNaN(+value);
                }),
                message: "Price must be number",
            },
        ]
    },
    description: {
        type: String,
        default: null,
    },
    image: {
        type: String,
        default: null,
    },
});
const Product = mongoose_1.default.model('Product', ProductSchema);
exports.default = Product;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const permit_1 = __importDefault(require("../../middleware/permit/permit"));
const products_1 = __importDefault(require("./products"));
const adminRouter = express_1.default.Router();
// localhost/admin/products
adminRouter.use(auth_1.default, (0, permit_1.default)('admin'));
adminRouter.use('/products', products_1.default);
exports.default = adminRouter;

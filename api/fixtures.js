"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const config_1 = __importDefault(require("./config"));
const Category_1 = __importDefault(require("./models/Category"));
const Product_1 = __importDefault(require("./models/Product"));
const User_1 = __importStar(require("./models/User"));
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connect(config_1.default.db);
    const db = mongoose_1.default.connection;
    try {
        yield db.dropCollection('categories');
        yield db.dropCollection('products');
        yield db.dropCollection('users');
    }
    catch (error) {
        console.log('Collections were not present, skipping drop');
    }
    const [cpuCategory, ssdCategory] = yield Category_1.default.create({
        title: 'CPUs',
        description: 'Central Processor units',
    }, {
        title: 'SSDs',
        description: 'Solid state Drives',
    });
    yield Product_1.default.create({
        title: "Intel Core i7",
        price: 350,
        category: cpuCategory._id,
        image: 'fixtures/cpu.jpeg'
    }, {
        title: "Samsung 990 Pro 1TB",
        price: 170,
        category: ssdCategory._id,
        image: 'fixtures/ssd.jpeg'
    });
    const john = new User_1.default({
        username: "John",
        password: "123",
        confirmPassword: "123",
        role: "user",
    });
    john.refreshToken = (0, User_1.generateRefreshToken)(john);
    yield john.save();
    const jane = new User_1.default({
        username: "Jane",
        password: "123",
        confirmPassword: "123",
        role: "admin",
    });
    jane.refreshToken = (0, User_1.generateRefreshToken)(jane);
    yield jane.save();
    yield db.close();
});
run().catch(console.error);

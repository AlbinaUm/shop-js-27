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
exports.JWT_REFRESH_SECRET = exports.JWT_SECRET = exports.generateRefreshToken = exports.generateAccessToken = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const argon2_1 = __importDefault(require("argon2"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ARGON2_OPTIONS = {
    type: argon2_1.default.argon2id,
    memoryCost: 2 ** 16,
    timeCost: 5,
    parallelism: 1,
};
const generateAccessToken = (user) => {
    return jsonwebtoken_1.default.sign({ _id: user._id }, exports.JWT_SECRET, { expiresIn: "1m" });
};
exports.generateAccessToken = generateAccessToken;
const generateRefreshToken = (user) => {
    return jsonwebtoken_1.default.sign({ _id: user._id }, exports.JWT_REFRESH_SECRET, { expiresIn: "2m" });
};
exports.generateRefreshToken = generateRefreshToken;
exports.JWT_SECRET = process.env.JWT_SECRET || 'default_fallback_secret';
exports.JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'default_fallback_secret';
const UserSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (!this.isModified('username'))
                        return true;
                    const user = yield User.findOne({ username: value });
                    return !user;
                });
            },
            message: "This is username is already taken"
        }
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        default: 'user',
        enum: ['user', 'admin'],
    },
    refreshToken: {
        type: String,
        required: true,
    },
    displayName: String,
    googleID: String,
    facebookID: String,
    githubID: String,
}, {
    virtuals: {
        confirmPassword: {
            get() {
                return this.__confirmPassword;
            },
            set(confirmPassword) {
                this.__confirmPassword = confirmPassword;
            }
        }
    }
});
UserSchema.methods.checkPassword = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield argon2_1.default.verify(this.password, password);
    });
};
UserSchema.path('password').validate(function (v) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified('password'))
            return;
        if (v !== this.confirmPassword) {
            this.invalidate('confirmPassword', 'Passwords do not match');
            this.invalidate('password', 'Passwords do not match');
        }
    });
});
UserSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified("password"))
            return next();
        this.password = yield argon2_1.default.hash(this.password, ARGON2_OPTIONS);
        next();
    });
});
UserSchema.set("toJSON", {
    transform: (_doc, ret) => {
        delete ret.password;
        return ret;
    }
});
const User = mongoose_1.default.model('User', UserSchema);
exports.default = User;

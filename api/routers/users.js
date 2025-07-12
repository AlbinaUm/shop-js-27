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
const express_1 = __importDefault(require("express"));
const mongoose_1 = require("mongoose");
const User_1 = __importStar(require("../models/User"));
const auth_1 = __importDefault(require("../middleware/auth"));
const google_auth_library_1 = require("google-auth-library");
const config_1 = __importDefault(require("../config"));
const axios_1 = __importDefault(require("axios"));
const node_crypto_1 = require("node:crypto");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const usersRouter = express_1.default.Router();
const client = new google_auth_library_1.OAuth2Client(config_1.default.google.clientId);
usersRouter.get('/callback', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { code } = req.query;
        if (!code) {
            res.status(400).send({ error: 'code must be in req!' });
            return;
        }
        const tokenResponse = yield axios_1.default.post('https://github.com/login/oauth/access_token', {
            client_id: 'Ov23liWcvgPgetctZVrq',
            client_secret: '79a54d61976084db407e2b37988163afc83e888a',
            code: code,
        }, {
            headers: { Accept: 'application/json' },
        });
        const accessToken = tokenResponse.data.access_token;
        const githubUser = yield axios_1.default.get('https://api.github.com/user', {
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        console.log(githubUser);
        const { id, name, login } = githubUser.data;
        const genPassword = (0, node_crypto_1.randomUUID)();
        let user = yield User_1.default.findOne({ username: login });
        if (!user) {
            user = new User_1.default({
                username: login,
                password: genPassword,
                confirmPassword: genPassword,
                displayName: name,
                githubID: id,
            });
        }
        const refreshToken = (0, User_1.generateRefreshToken)(user);
        user.refreshToken = refreshToken;
        user.save();
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });
        res.redirect(`http://localhost:5173/oauth-success`);
    }
    catch (e) {
        next(e);
    }
}));
usersRouter.post('/facebook', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.accessToken || !req.body.userID) {
            res.status(400).send({ error: 'Access token and user id must be in req!' });
            return;
        }
        const { accessToken, userID } = req.body;
        console.log(accessToken);
        const fbURL = `https://graph.facebook.com/${userID}?fields=id,name,email,picture&access_token=${accessToken}`;
        const response = yield fetch(fbURL);
        if (!response.ok) {
            res.status(400).send({ error: 'Facebook login Error! Invalid token or user id' });
            return;
        }
        const fbData = yield response.json();
        const facebookID = fbData.id;
        const email = fbData.email;
        const name = fbData.name;
        let user = yield User_1.default.findOne({ username: email });
        const genPassword = crypto.randomUUID();
        if (!user) {
            user = new User_1.default({
                username: email,
                password: genPassword,
                confirmPassword: genPassword,
                displayName: name,
                facebookID,
            });
        }
        const accessTokenJwt = (0, User_1.generateAccessToken)(user);
        const refreshToken = (0, User_1.generateRefreshToken)(user);
        user.refreshToken = refreshToken;
        user.save();
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict', // CSRF
        });
        const safeUser = {
            _id: user._id,
            username: user.username,
            role: user.role,
            displayName: user.displayName,
        };
        res.send({ user: safeUser, message: 'Login with Google successfully.', accessToken: accessTokenJwt });
    }
    catch (e) {
        next(e);
    }
}));
usersRouter.post('/google', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.credential) {
            res.status(400).send({ error: 'Google login Error!' });
            return;
        }
        const ticket = yield client.verifyIdToken({
            idToken: req.body.credential,
            audience: config_1.default.google.clientId,
        });
        const payload = ticket.getPayload();
        if (!payload) {
            res.status(400).send({ error: 'Google login Error!' });
            return;
        }
        const email = payload['email'];
        const googleID = payload['sub'];
        const displayName = payload['name'];
        if (!email) {
            res.status(400).send({ error: 'No enough user data to continue!' });
            return;
        }
        let user = yield User_1.default.findOne({ googleID: googleID });
        const genPassword = crypto.randomUUID();
        if (!user) {
            user = new User_1.default({
                username: email,
                password: genPassword,
                confirmPassword: genPassword,
                displayName,
                googleID,
            });
        }
        const accessTokenJwt = (0, User_1.generateAccessToken)(user);
        const refreshToken = (0, User_1.generateRefreshToken)(user);
        user.refreshToken = refreshToken;
        user.save();
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict', // CSRF
        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict', // CSRF
        });
        const safeUser = {
            _id: user._id,
            username: user.username,
            role: user.role,
            displayName: user.displayName,
        };
        res.send({ user: safeUser, message: 'Login with Google successfully.', accessToken: accessTokenJwt });
    }
    catch (e) {
        next(e);
    }
}));
usersRouter.post('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = new User_1.default({
            username: req.body.username,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword,
        });
        const accessToken = (0, User_1.generateAccessToken)(user);
        const refreshToken = (0, User_1.generateRefreshToken)(user);
        user.refreshToken = refreshToken;
        yield user.save();
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict', // CSRF
        });
        const safeUser = {
            _id: user._id,
            username: user.username,
            role: user.role,
        };
        res.send({ accessToken, user: safeUser, message: 'User registered successfully.' });
    }
    catch (error) {
        if (error instanceof mongoose_1.Error.ValidationError) {
            res.status(400).send(error);
            return;
        }
        next(error);
    }
}));
usersRouter.post('/sessions', (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.username || !req.body.password) {
        res.status(400).send({ error: 'Username and password must be in req' });
        return;
    }
    const user = yield User_1.default.findOne({ username: req.body.username });
    if (!user) {
        res.status(404).send({ error: "Username not found" });
        return;
    }
    const isMath = yield user.checkPassword(req.body.password);
    if (!isMath) {
        res.status(400).send({ error: 'Password is incorrect' });
        return;
    }
    const accessToken = (0, User_1.generateAccessToken)(user);
    const refreshToken = (0, User_1.generateRefreshToken)(user);
    user.refreshToken = refreshToken;
    user.save();
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict', // CSRF
    });
    const safeUser = {
        _id: user._id,
        username: user.username,
        role: user.role,
    };
    res.send({ message: 'Username and password is correct', user: safeUser, accessToken });
}));
usersRouter.delete('/sessions', auth_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.get('Authorization');
    if (!token) {
        res.send({ message: 'Success logout' });
        return;
    }
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
    });
    try {
        const user = yield User_1.default.findOne({ token });
        if (user) {
            user.refreshToken = (0, User_1.generateRefreshToken)(user);
            yield user.save();
        }
        res.send({ message: 'Success logout' });
    }
    catch (e) {
        next(e);
    }
}));
usersRouter.post('/secret', (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        res.status(403).send({ error: 'No refresh token provided' });
        return;
    }
    try {
        const payload = jsonwebtoken_1.default.verify(refreshToken, User_1.JWT_REFRESH_SECRET);
        const user = yield User_1.default.findById(payload._id);
        if (!user || user.refreshToken !== refreshToken) {
            res.status(403).send({ error: 'Invalid refresh token provided' });
            return;
        }
        const accessTokenJwt = (0, User_1.generateAccessToken)(user);
        const refreshTokenJwt = (0, User_1.generateRefreshToken)(user);
        user.refreshToken = refreshToken;
        res.cookie('refreshToken', refreshTokenJwt, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });
        const safeUser = {
            _id: user._id,
            username: user.username,
            role: user.role,
        };
        res.send({
            message: 'Secret message',
            user: safeUser,
            accessToken: accessTokenJwt
        });
    }
    catch (e) {
        res.status(403).send({ error: 'Refresh token invalid or expired' });
    }
}));
usersRouter.post('/refresh-token', (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        res.status(403).send({ error: 'No refresh token provided' });
        return;
    }
    try {
        const payload = jsonwebtoken_1.default.verify(refreshToken, User_1.JWT_REFRESH_SECRET);
        const user = yield User_1.default.findById(payload._id);
        if (!user || user.refreshToken !== refreshToken) {
            res.status(403).send({ error: 'Invalid refresh token provided' });
            return;
        }
        const newAccessToken = (0, User_1.generateAccessToken)(user);
        res.send({ accessToken: newAccessToken });
    }
    catch (e) {
        res.status(403).send({ error: 'Refresh token invalid or expired' });
    }
}));
exports.default = usersRouter;

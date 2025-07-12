"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const permit = (...roles) => {
    return (expressReq, res, next) => {
        const req = expressReq; // req
        if (!req.user) {
            res.status(401).send({ message: 'Unauthenticated' });
            return;
        }
        if (!roles.includes(req.user.role)) {
            res.status(403).send({ message: 'Unauthorized. No permits' });
            return;
        }
        next();
    };
};
exports.default = permit;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const permit_1 = __importDefault(require("./permit"));
// Функц для создания мока обьекта запроса Request
const createMockRequest = (user) => ({
    user
});
// Функц для созадния мока обьекта ответа (Response)
const createMockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res;
};
const createMockNext = () => jest.fn();
describe('permit middleware', () => {
    // тест польз на аунтефицированность и имеет разрешенную роль
    it('should allow access if user is authenticated and has permitted role', () => {
        const req = createMockRequest({ role: 'admin' });
        const res = createMockResponse();
        const next = createMockNext();
        const middleware = (0, permit_1.default)('admin', 'user');
        middleware(req, res, next);
        expect(next).toHaveBeenCalled();
    });
    // пользователь не аунтефицирован
    it('should not allow access if user is not authenticated', () => {
        const req = createMockRequest();
        const res = createMockResponse();
        const next = createMockNext();
        const middleware = (0, permit_1.default)('admin', 'user');
        middleware(req, res, next);
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.send).toHaveBeenCalledWith({ message: 'Unauthenticated' });
        expect(next).not.toHaveBeenCalled();
    });
    // тест польз на аунтефицированность и не имеет разрешенную роль
    it('should deny access if user has an unauthorized role', () => {
        const req = createMockRequest({ role: 'guest' });
        const res = createMockResponse();
        const next = createMockNext();
        const middleware = (0, permit_1.default)('admin', 'user');
        middleware(req, res, next);
        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.send).toHaveBeenCalledWith({ message: 'Unauthorized. No permits' });
        expect(next).not.toHaveBeenCalled();
    });
});

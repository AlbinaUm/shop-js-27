import {RequestWithUser} from "../auth";
import {NextFunction, Response} from "express";
import permit from "./permit";

// Функц для создания мока обьекта запроса Request
const createMockRequest = (user?: { role: string }) => ({
    user
}) as RequestWithUser;

// Функц для созадния мока обьекта ответа (Response)
const createMockResponse = () => {
    const res = {} as Response;
    res.status = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res;
};

const createMockNext = () => jest.fn() as NextFunction;

describe('permit middleware', () => {
    // тест польз на аунтефицированность и имеет разрешенную роль
    it('should allow access if user is authenticated and has permitted role', () => {
        const req = createMockRequest({role: 'admin'});
        const res = createMockResponse();
        const next = createMockNext();

        const middleware = permit('admin', 'user');
        middleware(req, res, next);
        expect(next).toHaveBeenCalled();
    });

    // пользователь не аунтефицирован

    it('should not allow access if user is not authenticated', () => {
        const req = createMockRequest();
        const res = createMockResponse();
        const next = createMockNext();

        const middleware = permit('admin', 'user');
        middleware(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.send).toHaveBeenCalledWith({message: 'Unauthenticated'});
        expect(next).not.toHaveBeenCalled();
    })

    // тест польз на аунтефицированность и не имеет разрешенную роль

    it('should deny access if user has an unauthorized role', () => {
        const req = createMockRequest({role: 'guest'});
        const res = createMockResponse();
        const next = createMockNext();

        const middleware = permit('admin', 'user');
        middleware(req, res, next);


        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.send).toHaveBeenCalledWith({message: 'Unauthorized. No permits'});
        expect(next).not.toHaveBeenCalled();
    });
});
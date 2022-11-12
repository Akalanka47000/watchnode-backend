require('dotenv').config()
import { adminProtect, protect } from "../../src/middleware/auth";
import User from "../../src/models/user";
import { mockUserData } from "../__mocks__/user";

let req = {
    headers: {
        authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjYzMGIyNDNkYjRiOWRjNGNkOWZkMmNkYiIsIm5hbWUiOiJBa2FsYW5rYSIsImVtYWlsIjoiYWthbGFua2FwZXJlcmExMjhAZ21haWwuY29tIiwidmVyaWZpY2F0aW9uX2NvZGUiOiI2ZmQ4MDQzOC1hYjc4LTQ0OWEtOGY1YS1mYjhkZGYyNzk1NjIiLCJpc192ZXJpZmllZCI6dHJ1ZSwiaXNfYWN0aXZlIjp0cnVlLCJyb2xlIjoiQURNSU4iLCJmY21fdG9rZW5zIjpbXSwiY3JlYXRlZF9hdCI6IjIwMjItMDgtMjhUMDg6MTU6NTcuMjAyWiIsInVwZGF0ZWRfYXQiOiIyMDIyLTA4LTI4VDA4OjE4OjAzLjc1NFoifSwiaWF0IjoxNjY4MjM4NTIxLCJleHAiOjE2NzA4MzA1MjF9.P7oGhg24HCy6wdf4a6uvawCxCQs8eoTgWeMc89qcVu0'
    }
}

const res = {
    status: jest.fn().mockReturnValue({
        json: jest.fn()
    }),
}

describe('test auth middleware', () => {
    it('should authenticate successfully', async () => {
        jest.spyOn(User, 'findOne').mockReturnValue({
            lean: jest.fn().mockResolvedValue(mockUserData),
        });
        const next = jest.fn();
        protect(req, res, next);
    });
    it('should fail to authenticate - no token', async () => {
        const next = jest.fn();
        protect({ headers: {} }, res, next);
        expect(res.status).toBeCalledWith(403);
    });
    it('should fail to authenticate - no user', async () => {
        const next = jest.fn();
        jest.spyOn(User, 'findOne').mockReturnValue({
            lean: jest.fn().mockResolvedValue(null),
        });
        protect(req, res, next);
        expect(res.status).toBeCalledWith(403);
    });
    it('should authenticate successfully - admin route', async () => {
        const next = jest.fn();
        adminProtect({ user: mockUserData }, res, next);
        expect(next).toBeCalled();
    });
    it('should fail to authenticate - admin route', async () => {
        const next = jest.fn();
        adminProtect({ user: { ...mockUserData, role: 'USER' } }, res, next);
        expect(res.status).toBeCalledWith(403);
    });
});

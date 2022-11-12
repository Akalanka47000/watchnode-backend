require('dotenv').config()
import { create, getAll, getById, update, deleteUser, changePassword } from '../../src/controllers/user';
import * as UserRepo from '../../src/repository/user';
import * as UserService from '../../src/services/user';
import * as EmailService from '../../src/services/email';
import * as Bcrypt from '../../src/utils/bcrypt';
import { createUserPayload, mockUserData } from '../__mocks__/user';

jest.mock('nodemailer', () => ({
    createTransport: jest.fn().mockReturnValue({
        sendMail: jest.fn().mockImplementation((options, callback) => {
            callback(null, true);
        }),
    }),
}));

jest.mock('fs', () => ({
    existsSync: jest.fn().mockReturnValue(true),
    readFileSync: jest.fn().mockReturnValue(''),
}));

jest.mock('handlebars', () => ({
    compile: jest.fn().mockImplementation(() => jest.fn().mockReturnValue('')),
}));

jest.mock('bcrypt', () => ({
    hash: jest.fn().mockResolvedValue(''),
    compare: jest.fn().mockResolvedValue(true),
}));

const res = {
    status: jest.fn().mockReturnValue({
        json: jest.fn()
    }),
}

global.__basedir = __dirname;

describe('test user-controller', () => {
    it('should create user successfully', async () => {
        jest.spyOn(UserRepo, 'createUser').mockResolvedValue(mockUserData);
        jest.spyOn(UserRepo, 'getOneUser').mockResolvedValue(null);
        jest.spyOn(Bcrypt, 'encrypt').mockResolvedValue('hashedPassword');
        await create({
            body: createUserPayload
        }, res, () => { });
    });
    it('should fail to create user  - email send fail', async () => {
        jest.spyOn(UserRepo, 'createUser').mockResolvedValue(mockUserData);
        jest.spyOn(UserRepo, 'getOneUser').mockResolvedValue(null);
        jest.spyOn(UserRepo, 'findOneAndRemoveUser').mockResolvedValue(mockUserData);
        jest.spyOn(Bcrypt, 'encrypt').mockResolvedValue('hashedPassword');
        jest.spyOn(EmailService, 'sendMail').mockResolvedValue(false);
        await create({
            body: createUserPayload
        }, res, () => { });
        expect(res.status).toBeCalled();
    });
    it('should fail to create user', async () => {
        jest.spyOn(UserService, 'addNewUser').mockResolvedValue(null);
        await create({
            body: createUserPayload
        }, res, () => { });
        expect(res.status).toBeCalledWith(500);
    });
    it('should fail to create user - custom status', async () => {
        jest.spyOn(UserService, 'addNewUser').mockResolvedValue({ status: 400 });
        await create({
            body: createUserPayload
        }, res, () => { });
        expect(res.status).toBeCalledWith(400);
    });

    it('should get users successfully', async () => {
        jest.spyOn(UserRepo, 'getAllUsers').mockResolvedValue([mockUserData]);
        await getAll({
            query: {}
        }, res, () => { });
        expect(res.status).toBeCalled();
    });

    it('should get users by Id successfully', async () => {
        jest.spyOn(UserRepo, 'getOneUser').mockResolvedValue(mockUserData);
        await getById({
            params: {}
        }, res, () => { });
        expect(res.status).toBeCalled();
    });

    it('should fail to get user by Id successfully', async () => {
        jest.spyOn(UserRepo, 'getOneUser').mockResolvedValue(null);
        await getById({
            params: {}
        }, res, () => { });
        expect(res.status).toBeCalled();
    });

    it('should change user password successfully', async () => {
        jest.spyOn(UserRepo, 'getOneUser').mockResolvedValue(mockUserData);
        jest.spyOn(UserRepo, 'findOneAndUpdateUser').mockResolvedValue(mockUserData);
        jest.spyOn(Bcrypt, 'encrypt').mockResolvedValue('hashedPassword');
        jest.spyOn(Bcrypt, 'compare').mockResolvedValue(true);
        await changePassword({
            params: {
                id: '123'
            },
            user: mockUserData,
            body: {}
        }, res, () => { });
        expect(res.status).toBeCalled();
    });

    it('should change user password successfully - password doesnt match', async () => {
        jest.spyOn(UserRepo, 'getOneUser').mockResolvedValue(mockUserData);
        jest.spyOn(Bcrypt, 'compare').mockResolvedValue(false);
        await changePassword({
            params: {
                id: '123'
            },
            user: mockUserData,
            body: {}
        }, res, () => { });
        expect(res.status).toBeCalledWith(400);
    });
    
    it('should update user by Id successfully', async () => {
        jest.spyOn(UserRepo, 'findOneAndUpdateUser').mockResolvedValue(mockUserData);
        await update({
            params: {
                id: '123'
            },
            user: mockUserData,
            body: {}
        }, res, () => { });
        expect(res.status).toBeCalled();
    });

    it('should fail to update user by Id', async () => {
        jest.spyOn(UserRepo, 'findOneAndUpdateUser').mockResolvedValue(null);
        await update({
            params: {
                id: '123'
            },
            user: mockUserData,
            body: {}
        }, res, () => { });
        expect(res.status).toBeCalledWith(422);
    })

    it('should fail to update user by Id - unauthorized', async () => {
        await update({
            params: {
                id: '123'
            },
            user: { ...mockUserData, role: "USER" },
            body: {}
        }, res, () => { });
        expect(res.status).toBeCalledWith(403);
    })

    it('should delete user by Id successfully', async () => {
        jest.spyOn(UserRepo, 'findOneAndRemoveUser').mockResolvedValue(mockUserData);
        await deleteUser({
            params: {},
            user: mockUserData
        }, res, () => { });
        expect(res.status).toBeCalled();
    });

    it('should fail to delete user by Id', async () => {
        jest.spyOn(UserRepo, 'findOneAndRemoveUser').mockResolvedValue(null);
        await deleteUser({
            params: {},
            user: mockUserData
        }, res, () => { });
        expect(res.status).toBeCalledWith(422);
    })

    it('should fail to delete user by Id - unauthorized', async () => {
        await deleteUser({
            params: {},
            user: { ...mockUserData, role: "USER" }
        }, res, () => { });
        expect(res.status).toBeCalledWith(403);
    })
});

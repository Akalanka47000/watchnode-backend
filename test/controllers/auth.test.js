require('dotenv').config()
import { current, forgotPassword, login, register, resendVerification, resetPassword, verifyUser } from '../../src/controllers/auth';
import * as UserRepo from '../../src/repository/user';
import * as SettingRepo from '../../src/repository/setting';
import * as AuthService from '../../src/services/auth';
import * as Bcrypt from '../../src/utils/bcrypt';
import { createUserPayload, mockUserData } from '../__mocks__/user';
import { mockSettingData } from '../__mocks__/setting';

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

describe('test auth-controller', () => {
    it('should register successfully', async () => {
        jest.spyOn(UserRepo, 'createUser').mockResolvedValue(mockUserData);
        jest.spyOn(UserRepo, 'getOneUser').mockResolvedValue(null);
        jest.spyOn(Bcrypt, 'encrypt').mockResolvedValue('hashedPassword');
        await register({
            body: createUserPayload
        }, res, () => { });
    });
    it('should fail to register user', async () => {
        jest.spyOn(AuthService, 'authRegister').mockResolvedValue(null);
        await register({
            body: createUserPayload
        }, res, () => { });
        expect(res.status).toBeCalledWith(500);
    });
    it('should fail to register user - custom status', async () => {
        jest.spyOn(AuthService, 'authRegister').mockResolvedValue({ status: 400 });
        await register({
            body: createUserPayload
        }, res, () => { });
        expect(res.status).toBeCalledWith(400);
    });

    it('should login successfully', async () => {
        jest.spyOn(UserRepo, 'createUser').mockResolvedValue(mockUserData);
        jest.spyOn(UserRepo, 'getOneUser').mockResolvedValue(null);
        jest.spyOn(Bcrypt, 'compare').mockResolvedValue(true);
        await login({
            body: createUserPayload
        }, res, () => { });
    });
    it('should fail to login', async () => {
        jest.spyOn(AuthService, 'authLogin').mockResolvedValue(null);
        await login({
            body: createUserPayload
        }, res, () => { });
        expect(res.status).toBeCalledWith(500);
    });
    it('should fail to login - unverified user', async () => {
        jest.spyOn(AuthService, 'authLogin').mockResolvedValue({ ...mockUserData, is_verified: false });
        await login({
            body: createUserPayload
        }, res, () => { });
        expect(res.status).toBeCalledWith(401);
    });

    it('should fail to login - inactive user', async () => {
        jest.spyOn(AuthService, 'authLogin').mockResolvedValue({ ...mockUserData, is_active: false });
        await login({
            body: createUserPayload
        }, res, () => { });
        expect(res.status).toBeCalledWith(401);
    });

    it('should get current user successfully', async () => {
        await current({
            user: mockUserData
        }, res, () => { });
        expect(res.status).toBeCalledWith(200);
    });

    it('should verify user successfully', async () => {
        jest.spyOn(SettingRepo, 'createUserSetting').mockResolvedValue(mockSettingData);
        jest.spyOn(UserRepo, 'findOneAndUpdateUser').mockResolvedValue(mockUserData);
        jest.spyOn(UserRepo, 'getOneUser').mockResolvedValue(mockUserData);
        await verifyUser({
            params: {
                verification_code: '123456'
            }
        }, res, () => { });
        expect(res.status).toBeCalledWith(200);
    });

    it('should fail to verify user', async () => {
        jest.spyOn(UserRepo, 'getOneUser').mockResolvedValue(null);
        await verifyUser({
            params: {
                verification_code: '123456'
            }
        }, res, () => { });
        expect(res.status).toBeCalledWith(400);
    });

    it('should resend verification email successfully', async () => {
        jest.spyOn(UserRepo, 'findOneAndUpdateUser').mockResolvedValue(mockUserData);
        jest.spyOn(UserRepo, 'getOneUser').mockResolvedValue({ ...mockUserData, is_verified: false });
        await resendVerification({
            body: createUserPayload
        }, res, () => { });
    });
    it('should fail to resend verification email - already verified', async () => {
        jest.spyOn(UserRepo, 'getOneUser').mockResolvedValue(mockUserData);
        await resendVerification({ body: {}, params: {} }, res, () => { });
        expect(res.status).toBeCalledWith(400);
    });
    it('should fail to resend verification email - custom status', async () => {
        jest.spyOn(UserRepo, 'getOneUser').mockResolvedValue(null);
        await resendVerification({ body: {}, params: {} }, res, () => { });
        expect(res.status).toBeCalledWith(400);
    });

    it('should send forgot password email successfully', async () => {
        jest.spyOn(UserRepo, 'findOneAndUpdateUser').mockResolvedValue(mockUserData);
        jest.spyOn(UserRepo, 'getOneUser').mockResolvedValue({ ...mockUserData, verification_code: '123456' });
        await forgotPassword({
            params: {
                verification_code: '123456'
            },
            body: createUserPayload
        }, res, () => { });
    });
    it('should fail to send forgot password email - custom status', async () => {
        jest.spyOn(UserRepo, 'getOneUser').mockResolvedValue(null);
        await forgotPassword({ body: {}, params: {} }, res, () => { });
        expect(res.status).toBeCalledWith(400);
    });

    it('should reset password successfully', async () => {
        jest.spyOn(UserRepo, 'findOneAndUpdateUser').mockResolvedValue(mockUserData);
        jest.spyOn(UserRepo, 'getOneUser').mockResolvedValue({ ...mockUserData, verification_code: '123456' });
        jest.spyOn(Bcrypt, 'encrypt').mockResolvedValue('hashedPassword');
        await resetPassword({
            params: {
                verification_code: '123456'
            },
            body: createUserPayload
        }, res, () => { });
    });
    it('should fail to reset password - custom status', async () => {
        jest.spyOn(UserRepo, 'getOneUser').mockResolvedValue(null);
        await resetPassword({ body: {}, params: {} }, res, () => { });
        expect(res.status).toBeCalledWith(400);
    });
});

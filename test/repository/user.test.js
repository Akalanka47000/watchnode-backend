import User from '../../src/models/user';
import { createUser, getAllUsers, getOneUser, findOneAndUpdateUser, findOneAndRemoveUser } from '../../src/repository/user';
import { createUserPayload, mockUserData } from '../__mocks__/user';


describe('test user-repository', () => {
    it('should create user successfully', async () => {
        const result = { ...mockUserData };
        delete result.password;
        jest.spyOn(User, 'create').mockResolvedValue(mockUserData);
        expect(
            createUser(createUserPayload),
        ).resolves.toStrictEqual(result);
    });
    it('should get all users successfully', async () => {
        jest.spyOn(User, 'find').mockReturnValue({
            sort: jest.fn().mockReturnValue({
                select: jest.fn().mockResolvedValue([mockUserData]),
            }),
        });
        expect(
            getAllUsers({}),
        ).resolves.toStrictEqual([mockUserData]);
    });
    it('should get one user successfully', async () => {
        const result = { ...mockUserData };
        delete result.password;
        jest.spyOn(User, 'findOne').mockReturnValue({
            lean: jest.fn().mockResolvedValue(mockUserData),
        });
        expect(
            getOneUser({}),
        ).resolves.toStrictEqual(result);
    });
    it('should get one user successfully - with password', async () => {
        jest.spyOn(User, 'findOne').mockReturnValue({
            lean: jest.fn().mockResolvedValue(mockUserData),
        });
        expect(
            getOneUser({}, true),
        ).resolves.toStrictEqual(mockUserData);
    });
    it('should get one user - null result', async () => {
        jest.spyOn(User, 'findOne').mockReturnValue({
            lean: jest.fn().mockResolvedValue(null),
        });
        expect(
            getOneUser({}, true),
        ).resolves.toStrictEqual(null);
    });
    it('should update user successfully', async () => {
        const result = { ...mockUserData };
        delete result.password;
        jest.spyOn(User, 'findOneAndUpdate').mockReturnValue({
            lean: jest.fn().mockResolvedValue(mockUserData),
        });
        expect(
            findOneAndUpdateUser({}, createUserPayload),
        ).resolves.toStrictEqual(result);
    });
    it('should update user - null result', async () => {
        jest.spyOn(User, 'findOneAndUpdate').mockReturnValue({
            lean: jest.fn().mockResolvedValue(null),
        });
        expect(
            findOneAndUpdateUser({}, createUserPayload),
        ).resolves.toStrictEqual(null);
    });
    it('should delete user successfully', async () => {
        jest.spyOn(User, 'findOneAndRemove').mockResolvedValue(mockUserData);
        expect(
            findOneAndRemoveUser({}),
        ).resolves.toStrictEqual(mockUserData);
    });
});

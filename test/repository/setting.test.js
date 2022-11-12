import Setting from '../../src/models/setting';
import { createUserSetting, getUserSetting, getScheduleSetting, updateUserSetting, updateScheduleSetting } from '../../src/repository/setting';
import { createSettingPayload, mockSettingData } from '../__mocks__/setting';


describe('test setting-repository', () => {
    it('should create setting successfully', async () => {
        jest.spyOn(Setting, 'create').mockResolvedValue(mockSettingData);
        expect(
            createUserSetting(createSettingPayload),
        ).resolves.toStrictEqual(mockSettingData);
    });
    it('should get user setting successfully', async () => {
        jest.spyOn(Setting, 'findOne').mockResolvedValue(mockSettingData);
        expect(
            getUserSetting({}),
        ).resolves.toStrictEqual(mockSettingData);
    });
    it('should get schedule setting successfully', async () => {
        jest.spyOn(Setting, 'findOne').mockResolvedValue(mockSettingData);
        expect(
            getScheduleSetting({}),
        ).resolves.toStrictEqual(mockSettingData);
    });
    it('should update user setting successfully', async () => {
        jest.spyOn(Setting, 'findOneAndUpdate').mockResolvedValue(mockSettingData);
        expect(
            updateUserSetting({}, createSettingPayload),
        ).resolves.toStrictEqual(mockSettingData);
    });
    it('should update schedule setting successfully', async () => {
        jest.spyOn(Setting, 'findOneAndUpdate').mockResolvedValue(mockSettingData);
        expect(
            updateScheduleSetting({}, createSettingPayload),
        ).resolves.toStrictEqual(mockSettingData);
    });
});

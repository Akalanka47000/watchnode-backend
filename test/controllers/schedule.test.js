require('dotenv').config()
import { getUserSchedules, getScheduleById, updateScheduleById, deleteScheduleById } from '../../src/controllers/schedule';
import * as ScheduleRepo from '../../src/repository/schedule';
import * as ScheduleService from '../../src/services/schedule';
import { mockScheduleData } from '../__mocks__/schedule';
import { mockUserData } from '../__mocks__/user';

const res = {
    status: jest.fn().mockReturnValue({
        json: jest.fn()
    }),
}

describe('test schedule-controller', () => {

    it('should get schedule successfully', async () => {
        jest.spyOn(ScheduleRepo, 'fetchScheduleById').mockResolvedValue(mockScheduleData);
        await getScheduleById({
            params: {
                id: '123'
            },
            user: mockUserData,
        }, res, () => { });
    });

    it('should fail to get schedule by Id - not found', async () => {
        jest.spyOn(ScheduleRepo, 'fetchScheduleById').mockResolvedValue({ ...mockScheduleData, user: "33e21" });
        await getScheduleById({
            params: {
                id: '123'
            },
            user: mockUserData,
        }, res, () => { });
    });

    it('should get user schedules successfully', async () => {
        jest.spyOn(ScheduleRepo, 'fetchUserSchedules').mockResolvedValue([mockScheduleData]);
        await getUserSchedules({
            params: {
                id: '123'
            },
            query: {
                limit: 10
            },
            user: mockUserData,
        }, res, () => { });
        expect(res.status).toBeCalledWith(200);
    });

    it('should update schedule by Id successfully', async () => {
        jest.spyOn(ScheduleRepo, 'fetchScheduleById').mockResolvedValue(mockScheduleData);
        jest.spyOn(ScheduleRepo, 'deleteScheduleById').mockResolvedValue(mockScheduleData);
        await updateScheduleById({
            params: {
                id: '123'
            },
            user: mockUserData,
            body: {}
        }, res, () => { });
        expect(res.status).toBeCalled();
    });

    it('should fail to update schedule by Id - not found', async () => {
        jest.spyOn(ScheduleRepo, 'fetchScheduleById').mockResolvedValue({ ...mockScheduleData, user: "33e21" });
        await updateScheduleById({
            params: {
                id: '123'
            },
            user: mockUserData,
            body: {}
        }, res, () => { });
        expect(res.status).toBeCalledWith(404);
    })

    it('should delete schedule by Id successfully', async () => {
        jest.spyOn(ScheduleRepo, 'fetchScheduleById').mockResolvedValue(mockScheduleData);
        jest.spyOn(ScheduleRepo, 'deleteScheduleById').mockResolvedValue(mockScheduleData);
        await deleteScheduleById({
            params: {
                id: '123'
            },
            user: mockUserData
        }, res, () => { });
        expect(res.status).toBeCalled();
    });

    it('should fail to delete schedule by Id - not found', async () => {
        jest.spyOn(ScheduleRepo, 'fetchScheduleById').mockResolvedValue({ ...mockScheduleData, user: "33e21" });
        await deleteScheduleById({
            params: {
                id: '123'
            },
            user: mockUserData
        }, res, () => { });
        expect(res.status).toBeCalledWith(404);
    })
});

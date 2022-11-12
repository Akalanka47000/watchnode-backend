import Schedule from '../../src/models/schedule';
import { createSchedule, fetchUserSchedules, fetchScheduleById, updateScheduleById, deleteScheduleById } from '../../src/repository/schedule';
import { mockScheduleData } from '../__mocks__/schedule';


describe('test schedule-repository', () => {
    it('should create schedule successfully', async () => {
        jest.spyOn(Schedule, 'create').mockResolvedValue(mockScheduleData);
        expect(
            createSchedule(mockScheduleData),
        ).resolves.toStrictEqual(mockScheduleData);
    });
    it('should fetch user schedules successfully', async () => {
        jest.spyOn(Schedule, 'find').mockReturnValue({
            sort: jest.fn().mockReturnValue({
                exec: jest.fn().mockResolvedValue([mockScheduleData]),
            }),
        })
        expect(
            fetchUserSchedules({}),
        ).resolves.toStrictEqual([mockScheduleData]);
    });
    it('should fetch user schedules successfully with limit', async () => {
        jest.spyOn(Schedule, 'find').mockReturnValue({
            sort: jest.fn().mockReturnValue({
                exec: jest.fn().mockResolvedValue([mockScheduleData]),
                limit: jest.fn(),
            }),
        })
        expect(
            fetchUserSchedules({}, 10),
        ).resolves.toStrictEqual([mockScheduleData]);
    });
    it('should get a schedule successfully', async () => {
        jest.spyOn(Schedule, 'findById').mockResolvedValue(mockScheduleData);
        expect(
            fetchScheduleById("63396eeeae2efe3494d0a4b0"),
        ).resolves.toStrictEqual(mockScheduleData);
    });
    it('should update schedule successfully', async () => {
        jest.spyOn(Schedule, 'findByIdAndUpdate').mockResolvedValue(mockScheduleData);
        expect(
            updateScheduleById("63396eeeae2efe3494d0a4b0", mockScheduleData),
        ).resolves.toStrictEqual(mockScheduleData);
    });
    it('should delete schedule successfully', async () => {
        jest.spyOn(Schedule, 'findByIdAndDelete').mockResolvedValue(mockScheduleData);
        expect(
            deleteScheduleById("63396eeeae2efe3494d0a4b0"),
        ).resolves.toStrictEqual(mockScheduleData);
    });
});

import Notification from '../../src/models/notification';
import { createNotification, fetchAllNotifications, fetchUserNotifications, fetchNotificationById, findNotification, updateNotificationById, deleteNotificationById } from '../../src/repository/notification';
import { mockNotificationData } from '../__mocks__/notification';


describe('test notification-repository', () => {
    it('should create notification successfully', async () => {
        jest.spyOn(Notification, 'create').mockResolvedValue(mockNotificationData);
        expect(
            createNotification(mockNotificationData),
        ).resolves.toStrictEqual(mockNotificationData);
    });
    it('should fetch all notifications successfully', async () => {
        jest.spyOn(Notification, 'find').mockReturnValue({
            sort: jest.fn().mockReturnValue({
                populate: jest.fn().mockReturnValue({
                    exec: jest.fn().mockResolvedValue([mockNotificationData]),
                }),
            }),
        })
        expect(
            fetchAllNotifications(),
        ).resolves.toStrictEqual([mockNotificationData]);
    });
    it('should fetch all notifications successfully with limit', async () => {
        jest.spyOn(Notification, 'find').mockReturnValue({
            sort: jest.fn().mockReturnValue({
                populate: jest.fn().mockReturnValue({
                    exec: jest.fn().mockResolvedValue([mockNotificationData]),
                    limit: jest.fn(),
                }),
            }),
        })
        expect(
            fetchAllNotifications(10),
        ).resolves.toStrictEqual([mockNotificationData]);
    });
    it('should fetch users notifications successfully', async () => {
        jest.spyOn(Notification, 'find').mockReturnValue({
            sort: jest.fn().mockReturnValue({
                exec: jest.fn().mockResolvedValue([mockNotificationData]),
            }),
        })
        expect(
            fetchUserNotifications("63396eeeae2efe3494d0a4b0"),
        ).resolves.toStrictEqual([mockNotificationData]);
    });
    it('should fetch user notifications successfully with limit', async () => {
        jest.spyOn(Notification, 'find').mockReturnValue({
            sort: jest.fn().mockReturnValue({
                exec: jest.fn().mockResolvedValue([mockNotificationData]),
                limit: jest.fn(),
            }),
        })
        expect(
            fetchUserNotifications("63396eeeae2efe3494d0a4b0", 10),
        ).resolves.toStrictEqual([mockNotificationData]);
    });
    it('should get a notification successfully', async () => {
        jest.spyOn(Notification, 'findById').mockResolvedValue(mockNotificationData);
        expect(
            fetchNotificationById("63396eeeae2efe3494d0a4b0"),
        ).resolves.toStrictEqual(mockNotificationData);
    });
    it('should get a notification successfully - with filters', async () => {
        jest.spyOn(Notification, 'findOne').mockResolvedValue(mockNotificationData);
        expect(
            findNotification({user: "63396eeeae2efe3494d0a4b0"}),
        ).resolves.toStrictEqual(mockNotificationData);
    });
    it('should update notification successfully', async () => {
        jest.spyOn(Notification, 'findByIdAndUpdate').mockResolvedValue(mockNotificationData);
        expect(
            updateNotificationById("63396eeeae2efe3494d0a4b0", mockNotificationData),
        ).resolves.toStrictEqual(mockNotificationData);
    });
    it('should delete notification successfully', async () => {
        jest.spyOn(Notification, 'findByIdAndDelete').mockResolvedValue(mockNotificationData);
        expect(
            deleteNotificationById("63396eeeae2efe3494d0a4b0"),
        ).resolves.toStrictEqual(mockNotificationData);
    });
});

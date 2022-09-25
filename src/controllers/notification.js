import asyncHandler from '../middleware/async'
import { deleteUserNotificationById, getUserNotificationList } from '../services/notification'
import { makeResponse } from '../utils/response'

export const getUserNotifications = asyncHandler(async (req, res) => {
  const result = await getUserNotificationList(req.user, req.query.limit)
  if (result.status) return makeResponse({ res, ...result })
  return makeResponse({
    res,
    data: result,
    message: 'Notifications fetched succesfully',
  })
})

export const deleteUserNotification = asyncHandler(async (req, res) => {
  const result = await deleteUserNotificationById(req.user._id, req.params.id)
  if (result.status) return makeResponse({ res, ...result })
  return makeResponse({
    res,
    data: result,
    message: 'Notification deleted succesfully',
  })
})

import Notification from '../models/notification'

export const createNotification = (data) => {
  return Notification.create(data)
}

export const fetchAllNotifications = (limit) => {
  const query = Notification.find().sort({ createdAt: -1 })
  if (limit) query.limit(limit)
  return query.exec()
}

export const fetchUserNotifications = (user, limit) => {
  const query = Notification.find({ user }).sort({ createdAt: -1 })
  if (limit) query.limit(limit)
  return query.exec()
}

export const fetchNotificationById = (id) => {
  return Notification.findById(id)
}

export const findNotification = (filters = {}) => {
  return Notification.find(filters)
}

export const updateNotificationById = (id, data) => {
  return Notification.findByIdAndUpdate(id, data, { new: true })
}

export const deleteNotificationById = (id) => {
  return Notification.findByIdAndDelete(id)
}

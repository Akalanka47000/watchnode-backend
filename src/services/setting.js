import { getUserSetting, updateUserSetting, getScheduleSetting, updateScheduleSetting } from '../repository/setting'
import { fetchScheduleById } from '../repository/schedule'
import { getOneUser } from '../repository/user'

export const getSetting = async (userId) => {
  return getUserSetting(userId)
}

export const updateSetting = async (userId, data) => {
  return updateUserSetting(userId, data)
}

export const getScheduleSettings = async (userId, id) => {
  const schedule = await fetchScheduleById(id)
  const scheduleUser = await getOneUser({ _id: schedule.user })
  if (scheduleUser._id.toString() !== userId.toString()) return { status: 404, message: 'Schedule not found' }
  return getScheduleSetting(id)
}

export const updateScheduleSettings = async (userId, id, data) => {
  const schedule = await fetchScheduleById(id)
  const scheduleUser = await getOneUser({ _id: schedule.user })
  if (scheduleUser._id.toString() !== userId.toString()) return { status: 404, message: 'Schedule not found' }
  return updateScheduleSetting(id, data)
}

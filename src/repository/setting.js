import Setting from '../models/setting'

export const createUserSetting = (data) => {
  return Setting.create(data)
}

export const getUserSetting = (user) => {
  return Setting.findOne({ user })
}

export const getScheduleSetting = (schedule) => {
  return Setting.findOne({ schedule })
}

export const updateUserSetting = (user, data) => {
  return Setting.findOneAndUpdate({ user }, data, { new: true })
}

export const updateScheduleSetting = (schedule, data) => {
  return Setting.findOneAndUpdate({ schedule }, data, { new: true })
}

import User from '../models/user'

export const createUser = async (user) => {
  const userMade = (await new User(user).save()).toObject()
  delete userMade.password
  return userMade
}

export const getAllUsers = async ({ sort = {}, filter = {} } = {}) => {
  return await User.find(filter).sort(sort).select('-password')
}

export const getOneUser = async (filters, returnPassword) => {
  const user = await User.findOne(filters).lean()
  if (!user) return null
  if (!returnPassword) delete user.password
  return user
}

export const findOneAndUpdateUser = async (filters, data) => {
  const user = await User.findOneAndUpdate(filters, data, { new: true }).lean()
  if (!user) return null
  delete user.password
  return user
}

export const findOneAndRemoveUser = async (filters) => {
  return await User.findOneAndRemove(filters)
}

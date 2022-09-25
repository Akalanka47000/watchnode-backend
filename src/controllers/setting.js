import asyncHandler from '../middleware/async'
import { makeResponse } from '../utils/response'
import { getSetting, updateSetting, getScheduleSettings, updateScheduleSettings } from '../services/setting'

export const getUserSettings = asyncHandler(async (req, res) => {
  const setting = await getSetting(req.user._id)
  return makeResponse({
    res,
    data: setting,
    message: 'Settings retrieved succesfully',
  })
})

export const updateUserSettings = asyncHandler(async (req, res) => {
  const setting = await updateSetting(req.user._id, req.body)
  if (setting.status) return makeResponse({ res, ...setting })
  return makeResponse({
    res,
    data: setting,
    message: 'Settings updated succesfully',
  })
})

export const getScheduleSettingsById = asyncHandler(async (req, res) => {
  const result = await getScheduleSettings(req.user._id, req.params.schedule_id)
  if (result.status) return makeResponse({ res, ...result })
  return makeResponse({
    res,
    data: result,
    message: 'Schedule settings retrieved succesfully',
  })
})

export const updateScheduleSettingsById = asyncHandler(async (req, res) => {
  const result = await updateScheduleSettings(req.user._id, req.params.schedule_id, req.body)
  if (result.status) return makeResponse({ res, ...result })
  return makeResponse({
    res,
    data: result,
    message: 'Schedule settings updated succesfully',
  })
})

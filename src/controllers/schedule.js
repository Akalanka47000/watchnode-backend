import asyncHandler from '../middleware/async'
import { makeResponse } from '../utils/response'
import { uploadUserSchedule, getUserScheduleList, getSchedule, updateSchedule, deleteSchedule } from '../services/schedule'

export const uploadSchedule = asyncHandler(async (req, res) => {
  const result = await uploadUserSchedule(req.user._id, req.file)
  if (result.status) return makeResponse({ res, ...result })
  return makeResponse({
    res,
    data: result,
    message: 'Schedule uploaded succesfully',
  })
})

export const getUserSchedules = asyncHandler(async (req, res) => {
  const result = await getUserScheduleList(req.user._id, req.query.limit)
  if (result?.status) return makeResponse({ res, ...result })
  return makeResponse({
    res,
    data: result,
    message: 'Schedules fetched succesfully',
  })
})

export const getScheduleById = asyncHandler(async (req, res) => {
  const result = await getSchedule(req.user._id, req.params.id)
  if (result.status) return makeResponse({ res, ...result })
  return makeResponse({
    res,
    data: result,
    message: 'Schedule fetched succesfully',
  })
})

export const updateScheduleById = asyncHandler(async (req, res) => {
  const result = await updateSchedule(req.user._id, req.params.id, req.body)
  if (result.status) return makeResponse({ res, ...result })
  return makeResponse({
    res,
    data: result,
    message: 'Schedule updated succesfully',
  })
})

export const deleteScheduleById = asyncHandler(async (req, res) => {
  const result = await deleteSchedule(req.user._id, req.params.id)
  if (result.status) return makeResponse({ res, ...result })
  return makeResponse({
    res,
    data: result,
    message: 'Schedule deleted succesfully',
  })
})

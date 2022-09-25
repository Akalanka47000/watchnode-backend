import express from 'express'
import { celebrate, Segments } from 'celebrate'
import { getUserSettings, updateUserSettings, getScheduleSettingsById, updateScheduleSettingsById } from '../controllers/setting'
import { updateSchema } from '../validations/setting'

const settingRouter = express.Router()

settingRouter.get('/', getUserSettings)
settingRouter.put('/', celebrate({ [Segments.BODY]: updateSchema }), updateUserSettings)
settingRouter.get('/:schedule_id', getScheduleSettingsById)
settingRouter.put('/:schedule_id', celebrate({ [Segments.BODY]: updateSchema }), updateScheduleSettingsById)

export default settingRouter

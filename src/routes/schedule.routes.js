import express from 'express'
import { celebrate, Segments } from 'celebrate'
import multer from 'multer'
import { idSchema, updateSchema } from '../validations/schedule'
import { uploadSchedule, getUserSchedules, getScheduleById, deleteScheduleById, updateScheduleById } from '../controllers/schedule'

const upload = multer()

const scheduleRouter = express.Router()

scheduleRouter.post('/', upload.single('schedule'), uploadSchedule)
scheduleRouter.get('/', getUserSchedules)
scheduleRouter.get('/:id', celebrate({ [Segments.PARAMS]: idSchema }), getScheduleById)
scheduleRouter.put('/:id', celebrate({ [Segments.PARAMS]: idSchema, [Segments.BODY]: updateSchema }), updateScheduleById)
scheduleRouter.delete('/:id', celebrate({ [Segments.PARAMS]: idSchema }), deleteScheduleById)

export default scheduleRouter

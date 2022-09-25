import express from 'express'
import { celebrate, Segments } from 'celebrate'
import { create, getAll, getById, update, changePassword } from '../controllers/user'
import { adminProtect } from '../middleware/auth'
import { addUserSchema, changePasswordSchema, userIdSchema, updateSchema } from '../validations/user'

const userRouter = express.Router()

userRouter.post('/', adminProtect, celebrate({ [Segments.BODY]: addUserSchema }), create)
userRouter.get('/', adminProtect, getAll)
userRouter.get('/:id', celebrate({ [Segments.PARAMS]: userIdSchema }), adminProtect, getById)
userRouter.put('/change_password', celebrate({ [Segments.BODY]: changePasswordSchema }), changePassword)
userRouter.put('/:id', celebrate({ [Segments.PARAMS]: userIdSchema, [Segments.BODY]: updateSchema }), update)

export default userRouter

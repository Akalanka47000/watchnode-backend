import { Joi } from 'celebrate'

export const updateSchema = {
  notification_enabled: Joi.boolean().optional(),
  notification_period: Joi.number().optional(),
}

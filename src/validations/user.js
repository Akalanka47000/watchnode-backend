import { Joi } from 'celebrate'

export const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/)
    .required()
    .error((errors) =>
      errors.map((err) => {
        if (err.code === 'string.pattern.base') err.message = `Password should have at least one lowercase letter, one uppercase letter, one number and one special character and should be at least 8 characters long`
        return err
      }),
    ),
})

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
})

export const verifySchema = Joi.object({
  verification_code: Joi.string().required(),
})

export const changePasswordSchema = Joi.object({
  old_password: Joi.string().required(),
  new_password: Joi.string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/)
    .required()
    .error((errors) =>
      errors.map((err) => {
        if (err.code === 'string.pattern.base') err.message = `Password should have at least one lowercase letter, one uppercase letter, one number and one special character and should be at least 8 characters long`
        return err
      }),
    ),
})

export const addUserSchema = {
  name: Joi.string().required(),
  email: Joi.string().email().required(),
}

export const userIdSchema = {
  id: Joi.string().hex().length(24).required(),
}

export const updateSchema = {
  name: Joi.string().optional(),
  email: Joi.string().email().optional(),
}

export const resetPasswordSchema = {
  new_password: Joi.string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/)
    .required()
    .error((errors) =>
      errors.map((err) => {
        if (err.code === 'string.pattern.base') err.message = `Password should have at least one lowercase letter, one uppercase letter, one number and one special character and should be at least 8 characters long`
        return err
      }),
    ),
}

export const validUserResetPasswordSchema = {
  verification_code: Joi.string().required(),
}

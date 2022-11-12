import { v4 as uuidv4 } from 'uuid'
import { createUserSetting } from '../repository/setting'
import { createUser, getOneUser, findOneAndUpdateUser } from '../repository/user'
import { encrypt, compare } from '../utils/bcrypt'
import { sendMail } from './email'

export const authRegister = async ({ name, email, password }) => {
  const user = await getOneUser({ email })
  if (user) return { status: 400, message: 'User already exists' }
  const encryptedPassword = await encrypt(password)
  const verification_code = uuidv4()
  const registeredUser = await createUser({
    name,
    email,
    password: encryptedPassword,
    verification_code: verification_code,
  })
  await verifyMailTemplate(email, verification_code)
  return registeredUser
}

export const authLogin = async ({ email, password }) => {
  const user = await getOneUser({ email }, true)
  if (!user) return false
  const isPasswordMatch = await compare(password, user.password)
  if (!isPasswordMatch) return false
  delete user.password
  return user
}

export const verifyMailTemplate = async (email, verification_code) => {
  const replacements = {
    verify_url: `${process.env.APP_DOMAIN}/api/auth/verify/${verification_code}`,
  }
  const subject = 'Welcome'
  await sendMail(email, 'verifyRegistration', replacements, subject)
  return true
}

export const updateVerificationStatus = async (verificationCode) => {
  const user = await getOneUser({ verification_code: verificationCode })
  if (!user) return false
  createUserSetting({ user: user._id })
  return await findOneAndUpdateUser({ email: user.email }, { is_verified: true })
}

export const authResendVerification = async (email) => {
  const user = await getOneUser({ email })
  if (!user)
    return {
      status: 400,
      message: 'A user by the provided email does not exist',
    }
  if (user.is_verified)
    return {
      status: 400,
      message: 'User is already verified',
    }
  const verification_code = uuidv4()
  const updatedUser = await findOneAndUpdateUser({ email }, { verification_code })
  await verifyMailTemplate(email, verification_code)
  return updatedUser
}

export const resetPasswordMailTemplate = async (email, verification_code) => {
  const replacements = {
    verify_url: `${process.env.FRONTEND_DOMAIN}/forgot_password/${verification_code}`,
  }
  const subject = 'Welcome'
  await sendMail(email, 'resetPassword', replacements, subject)
  return true
}

export const forgotPasswordEmail = async (email) => {
  const user = await getOneUser({ email })
  if (!user)
    return {
      status: 400,
      message: 'A user by the provided email does not exist',
    }
  const verification_code = uuidv4()
  const updatedUser = await findOneAndUpdateUser({ email }, { verification_code })
  await resetPasswordMailTemplate(email, verification_code)
  return updatedUser
}

export const resetPasswordFromEmail = async (password, verificationCode) => {
  const user = await getOneUser({ verification_code: verificationCode })
  if (!user)
    return {
      status: 400,
      message: 'Click the link we have sent to your email and try again.',
    }

  const encryptedPassword = await encrypt(password)
  const updatedUser = await findOneAndUpdateUser({ email: user.email }, { password: encryptedPassword, is_verified: true })
  return updatedUser
}
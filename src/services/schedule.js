import { createSchedule, deleteScheduleById, fetchScheduleById, fetchUserSchedules, updateScheduleById } from '../repository/schedule'
import tesseract from 'node-tesseract-ocr'
import moment from 'moment'
import { createUserSetting } from '../repository/setting'

export const uploadUserSchedule = async (userId, file) => {
  const config = {
    lang: 'eng',
    oem: 2,
    psm: 6,
  }
  await tesseract
    .recognize(file.buffer, config)
    .then((text) => {
      console.log('Result:', text.replace(/(^[ \t]*\n)/gm, ''))
    })
    .catch((error) => {
      console.log(error.message)
    })
  const data = {
    // eslint-disable-next-line no-unused-vars
    events: [1, 2, 3, 4, 5, 6, 7].reduce((acc, curr, index, arr) => {
      const eventsForDay = Array.from({ length: 24 }, (x, i) => i).map((hour) => {
        const date = new Date()
        const day = Number(moment().startOf('isoWeek').add(index, 'days').format('D'))
        return {
          name: `Event ${hour + 1}`,
          start: new Date(date.getFullYear(), date.getMonth(), day, hour, 0, 0, 0).getTime(),
          end: new Date(date.getFullYear(), date.getMonth(), day, hour, 0, 0, 0).getTime() + 3600000,
          location: '---',
        }
      })
      return [...acc, ...eventsForDay]
    }, []),
  }
  const schedule = await createSchedule({ user: userId, ...data })
  createUserSetting({
    schedule: schedule._id,
  })
  return schedule
}

export const getUserScheduleList = async (userId, limit) => {
  const result = await fetchUserSchedules(userId, limit)
  if (Number(limit) === 1) {
    if (result.length > 0) {
      return result[0]
    }
    return null
  }
  return result
}

export const getSchedule = async (userId, id) => {
  const schedule = await fetchScheduleById(id)
  if (schedule.user.toString() !== userId.toString()) return { status: 404, message: 'Schedule not found' }
  return schedule
}

export const updateSchedule = async (userId, id, data) => {
  const schedule = await fetchScheduleById(id)
  if (schedule.user.toString() !== userId.toString()) return { status: 404, message: 'Schedule not found' }
  return updateScheduleById(id, data)
}

export const deleteSchedule = async (userId, id) => {
  const schedule = await fetchScheduleById(id)
  if (schedule.user.toString() !== userId.toString()) return { status: 404, message: 'Schedule not found' }
  return deleteScheduleById(id)
}

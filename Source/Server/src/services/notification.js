import { ToadScheduler, SimpleIntervalJob, AsyncTask } from 'toad-scheduler'
import { getScheduleSetting, getUserSetting } from '../repository/setting'
import { getAllUsers } from '../repository/user'
import { fetchUserSchedules } from '../services/schedule'
import logger from '../utils/logger'
import { sendMail } from './email'

const scheduler = new ToadScheduler()

const initNotificationBroadcastCronJob = () => {
    logger.info('Initializing notification broadcast cron job')
    const task = new AsyncTask(
        'notification broadcast',
        async () => {
            const users = await getAllUsers()
            users.map(async (user) => {
                const userSetting = await getUserSetting(user._id)
                if (userSetting.notification_enabled) {
                    const schedules = fetchUserSchedules(user._id)
                    schedules.map(async (schedule) => {
                        const scheduleSetting = await getScheduleSetting(schedule._id)
                        if (scheduleSetting.notification_enabled) {
                            const period = scheduleSetting.notification_period || userSetting.notification_period
                            schedule.events.map(async (event) => {
                                const now = new Date()
                                const eventDate = new Date(event.start)
                                if (eventDate.getTime() - now.getTime() <= (period * 60 * 1000)) {
                                    const replacements = {
                                        message: `${event.name} is about to start in ${period} minutes`,
                                    }
                                    const subject = 'Heads up! - Event is about to start'
                                    sendMail(user.email, 'reminder', replacements, subject)
                                }
                            })
                        }
                    })
                }
            })
        },
        (err) => {
            logger.error(`Notification broadcasting failed | err - `, err)
        }
    )
    const job = new SimpleIntervalJob({ seconds: 500, }, task)

    scheduler.addSimpleIntervalJob(job)
}

export default initNotificationBroadcastCronJob
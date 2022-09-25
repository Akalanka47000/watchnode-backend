import mongoose from 'mongoose'

const ScheduleSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    events: [
      {
        _id: false,
        name: {
          type: String,
          required: true,
        },
        start: {
          type: Number,
          required: true,
        },
        end: {
          type: Number,
          required: true,
        },
        location: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    versionKey: false,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  },
)

ScheduleSchema.index({ createdAt: 1 })

const Schedule = mongoose.model('Schedule', ScheduleSchema)

Schedule.syncIndexes()

export default Schedule

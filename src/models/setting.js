import mongoose from 'mongoose'

const SettingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: false,
    },
    schedule: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Schedule',
      required: false,
    },
    notification_enabled: {
      type: Boolean,
      default: true,
    },
    notification_period: {
      type: Number,
      default: 60,
    },
  },
  {
    versionKey: false,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  },
)

SettingSchema.index({ createdAt: 1 })

const Setting = mongoose.model('Setting', SettingSchema)

Setting.syncIndexes()

export default Setting

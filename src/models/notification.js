import mongoose from 'mongoose'

const NotificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    event_name: String,
    type: {
      type: String,
      enum: ['email', 'push_notification'],
    },
  },
  {
    versionKey: false,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  },
)

NotificationSchema.index({ createdAt: 1 })

const Notification = mongoose.model('Notification', NotificationSchema)

Notification.syncIndexes()

export default Notification

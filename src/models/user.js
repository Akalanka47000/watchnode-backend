import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    verification_code: {
      type: String,
      required: false,
    },
    is_verified: {
      type: Boolean,
      required: true,
      default: false,
    },
    is_active: {
      type: Boolean,
      required: true,
      default: true,
    },
    role: {
      type: String,
      enum: ['ADMIN', 'USER'],
      default: 'USER',
      required: true,
    },
    added_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    fcm_tokens: [
      {
        device_id: {
          type: String,
          required: true,
        },
        token: {
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

UserSchema.index({ createdAt: 1 })

const User = mongoose.model('User', UserSchema)

User.syncIndexes()

export default User

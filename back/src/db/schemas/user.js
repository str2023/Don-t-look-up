const { Schema, model } = require('mongoose');
const { nanoid } = require('nanoid');

const UserSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      default: () => nanoid(),
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    nickName: {
      type: String,
      required: true,
      default: '익명',
    },
    birthDate: {
      type: Date,
    },
    gender: {
      type: Number,
    },
    location: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

// exports.UserModel = model('User', UserSchema);

const UserModel = model('User', UserSchema);

module.exports = UserModel;

import mongoose, { Schema } from 'mongoose';

const hobbySchema = new Schema({ name: String });
const UserSchema = new mongoose.Schema({
  userId: String,
  userName: String,
  userMood: {
    type: String,
    enum: ['Doing Well', 'Neutral', 'Feeling Lucky'],
  },
  userScheduleOne: {
    day: {
      type: String,
    },
    time: {
      type: String,
    },
  },
  userScheduleTwo: {
    day: {
      type: String,
    },
    time: {
      type: String,
    },
  },
  userHobbies: {
    type: [hobbySchema],
    default: undefined
  },
  firstThreeDigits: String,
});

export default UserSchema;

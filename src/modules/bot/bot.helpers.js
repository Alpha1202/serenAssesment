/* eslint-disable no-useless-catch */
/* eslint-disable import/prefer-default-export */

import { UserModel } from '../../db/models';

export const createNewUser = async ({
  userId, userName,
}) => {
  const foundUser = await UserModel.findOne({ userId }).exec();
  if (!foundUser) {
    const newUser = new UserModel({
      userId, userName,
    });
    await newUser.save((err) => {
      if (err) throw err;
    });
  }
};

export const updateUser = async (payload) => {
  try {
    await UserModel.findOneAndUpdate({ userId: payload.userId }, payload);
  } catch (error) {
    throw error;
  }
};

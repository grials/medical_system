import { Types } from 'mongoose';
import { userModel } from '../models';

export const listUsers = async (query) =>
  await userModel
    .find(query?.filter, query?.select, {
      limit: query?.limit,
      skip: query?.skip,
      sort: query?.sort,
    })
    .lean();
export const paginateUsers = async (query) => {
  return await userModel.paginate(query.filter, {
    select: query.select,
    page: query.skip ? query.skip : 1,
    limit: query.limit > 100 ? 100 : query.limit,
    sort: query.sort,
    lean: true,
  });
};

export const getUserById = async (userId) => await userModel.findById(userId).lean();

export const findOneUser = async (filter, select) => await userModel.findOne(filter, select).lean();

export const getUserByEmail = async (email) => await userModel.findOne({ email }).lean();
export const existUserByEmail = async (email, userId) =>
  await userModel
    .findOne({
      _id: { $ne: Types.ObjectId.isValid(userId) ? Types.ObjectId.createFromHexString(userId) : null },
      email,
    })
    .then((doc) => (doc ? true : false));
export const existUserByUsername = async (username, userId) =>
  await userModel
    .findOne({
      _id: { $ne: Types.ObjectId.isValid(userId) ? Types.ObjectId.createFromHexString(userId) : null },
      username,
    })
    .then((doc) => (doc ? true : false));

export const createUser = async (user) => await userModel.create(user).then((doc) => doc.toObject());

export const updateUser = async (userId, user) =>
  await userModel.findByIdAndUpdate(userId, { $set: user }, { new: true, runValidators: true }).lean();

export const deactiveUser = async (userId) =>
  await userModel.findByIdAndUpdate(userId, { $set: { active: false } }).lean();

export const activeUser = async (userId) =>
  await userModel.findByIdAndUpdate(userId, { $set: { active: true } }).lean();

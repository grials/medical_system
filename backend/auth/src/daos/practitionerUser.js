import { Types } from 'mongoose';
import { practitionerUserModel } from '../models';

export const listPractitionerUsers = async (query) =>
  await practitionerUserModel
    .find(
      {
        ...(query?.filter || {}),
        type: 'Practitioner',
      },
      query?.select,
      {
        limit: query?.limit,
        skip: query?.skip,
        sort: query?.sort,
      },
    )
    .lean();

export const paginatePractitionerUsers = async (query) => {
  return await practitionerUserModel.paginate(
    {
      ...(query?.filter || {}),
      type: 'Practitioner',
    },
    {
      select: query.select,
      page: query.skip ? query.skip : 1,
      limit: query.limit > 100 ? 100 : query.limit,
      sort: query.sort,
      lean: true,
    },
  );
};

export const existPractitionerUserByIdentifier = async (identifier, identifierType, practitionerUserId) =>
  await practitionerUserModel
    .findOne({
      _id: {
        $ne: Types.ObjectId.isValid(practitionerUserId) ? Types.ObjectId.createFromHexString(practitionerUserId) : null,
      },
      'practitionerProfile.identifier.value': identifier,
      'practitionerProfile.identifier.identifierType.text': identifierType,
    })
    .then((doc) => (doc ? true : false));

export const getPractitionerUserById = async (practitionerUserId) =>
  await practitionerUserModel.findById(practitionerUserId).lean();

export const getPractitionerUserByEmail = async (email) => await practitionerUserModel.findOne({ email }).lean();
export const existPractitionerUserByEmail = async (email, practitionerUserId) =>
  await practitionerUserModel
    .findOne({
      _id: {
        $ne: Types.ObjectId.isValid(practitionerUserId) ? Types.ObjectId.createFromHexString(practitionerUserId) : null,
      },
      email,
    })
    .then((doc) => (doc ? true : false));
export const existPractitionerUserByUsername = async (username, practitionerUserId) =>
  await practitionerUserModel
    .findOne({
      _id: {
        $ne: Types.ObjectId.isValid(practitionerUserId) ? Types.ObjectId.createFromHexString(practitionerUserId) : null,
      },
      username,
    })
    .then((doc) => (doc ? true : false));

export const createPractitionerUser = async (practitionerUser) =>
  await practitionerUserModel.create(practitionerUser).then((doc) => doc.toObject());

export const updatePractitionerUser = async (practitionerUserId, practitionerUser) =>
  await practitionerUserModel
    .findByIdAndUpdate(practitionerUserId, { $set: practitionerUser }, { new: true, runValidators: true })
    .lean();

export const deactivePractitionerUser = async (practitionerUserId) =>
  await practitionerUserModel.findByIdAndUpdate(practitionerUserId, { $set: { active: false } }).lean();

export const activePractitionerUser = async (practitionerUserId) =>
  await practitionerUserModel.findByIdAndUpdate(practitionerUserId, { $set: { active: true } }).lean();

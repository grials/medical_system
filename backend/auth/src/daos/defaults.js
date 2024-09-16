import { defaultsModel } from '../models';

export const getDefaults = async (licenseKey) => await defaultsModel.findOne({ licenseKey, active: true }).lean();

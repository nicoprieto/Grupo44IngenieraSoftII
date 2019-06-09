// @flow

import guard, {
  type TGuard,
} from './guard';

import validator, {
  type TValidator,
} from './validator';

import fileUpload, {
  type TFileUpload,
} from './file.upload';

import HttpStatusCodes from './http.status.codes';

export type THelpers = {
  guard: TGuard,
  validator: TValidator,
  fileUpload: TFileUpload,
  HttpStatusCodes: typeof HttpStatusCodes,
};

export default {
  // need to initialize
  guard: guard(),
  validator,
  fileUpload,
  HttpStatusCodes,
};

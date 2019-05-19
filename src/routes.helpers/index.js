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

export type THelpers = {
  guard: TGuard,
  validator: TValidator,
  fileUpload: TFileUpload,
};

export default {
  // need to initialize
  guard: guard(),
  validator,
  fileUpload,
};

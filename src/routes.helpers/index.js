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

import isBirthDateAdultAge from './is.birth.date.adult.age';

import isCreditCardExpirationValid from './is.credit.card.expiration.valid';

import moment from './moment';

export type THelpers = {
  guard: TGuard,
  validator: TValidator,
  fileUpload: TFileUpload,
  HttpStatusCodes: typeof HttpStatusCodes,
  isBirthDateAdultAge: typeof isBirthDateAdultAge,
  isCreditCardExpirationValid: typeof isCreditCardExpirationValid,
  moment: typeof moment,
};

export default {
  // need to initialize
  guard: guard(),
  validator,
  fileUpload,
  HttpStatusCodes,
  isBirthDateAdultAge,
  isCreditCardExpirationValid,
  moment: moment,
};

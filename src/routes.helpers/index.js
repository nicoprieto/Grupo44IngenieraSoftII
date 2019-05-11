// @flow

import guard, {
  type TGuard,
} from './guard';

import validator, {
  type TValidator
} from './validator';

export type THelpers = {
  guard: TGuard,
  validator: TValidator,
};

export default {
  // need to initialize
  guard: guard(),
  validator,
};

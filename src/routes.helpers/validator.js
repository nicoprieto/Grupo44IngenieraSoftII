// @flow

// $FlowFixMe
import { check, validationResult } from 'express-validator/check';

export type TValidator = {
  check: check,
  validationResult: validationResult,
};

export default {
  check,
  validationResult,
};

// @flow

// $FlowFixMe
import { check, query, validationResult } from 'express-validator/check';

export type TValidator = {
  check: typeof check,
  query: typeof query,
  validationResult: typeof validationResult,
};

export default {
  check,
  query: query,
  validationResult,
};

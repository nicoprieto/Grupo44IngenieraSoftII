// @flow

import express, {
  type $Request,
  type $Response,
  type NextFunction,
} from 'express';

import { type THelpers } from '../../routes.helpers';
import { type TGuardError } from '../../routes.helpers/guard';
import { type TModelsWithHelpers } from '../../models';

// BUG I dont know how to use cookie sessions
export const onGuardErrorFunction = (
  err: TGuardError,
  req: $Request,
  res: $Response,
  next: NextFunction,
  helpers: THelpers,
  models: TModelsWithHelpers
) => {
  if(err.isGuard) {
    // user has been redirect to same url but still is failing
    if(req.originalUrl.includes('try-again')) {
      res.status(helpers.HttpStatusCodes.FORBIDDEN).send();
    } else {
      // destroy session
      req.session.destroy(() => {
        // and redirect again to the same url
        res.redirect(`${req.originalUrl}?try-again`);
      });
    }
  } else {
    next();
  }
};
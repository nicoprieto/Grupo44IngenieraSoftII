// @flow

import express, {
  type $Request,
  type $Response,
  type NextFunction,
} from 'express';

import { type THelpers } from '../../routes.helpers';
import { type TGuardError } from '../../routes.helpers/guard';
import { type TModelsWithHelpers } from '../../models';

import {
  getLogin,
  postLogin,
  getLogout,
  getDashboard,
} from '../../controllers/admin';

// ----------------------
// export default
// ----------------------

export default (helpers: THelpers, models: TModelsWithHelpers) => {
  const router = express.Router();

  // BUG I dont know how to use cookie sessions
  const onGuardErrorFunction = (err: TGuardError, req: $Request, res: $Response, next: NextFunction) => {
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

  router.get(
    '/login',
    helpers.guard.requireAny('guest/*'),
    onGuardErrorFunction,
    (req: $Request, res: $Response) => getLogin(req, res, helpers, models)
  );

  router.post(
    '/login',
    helpers.guard.requireAny('guest/*'),
    onGuardErrorFunction,
    // $FlowFixMe
    [
      helpers
      .validator
      .check('email')
        .isEmail()
        .withMessage('Por favor ingrese su email'),
      helpers
      .validator
      .check('pass')
        .isLength({ min: 6 })
        .withMessage('Por favor ingrese su password'),
    ],
    (req: $Request, res: $Response) => postLogin(req, res, helpers, models)
  );

  router.get(
    '/logout',
    helpers.guard.requireAny('admin/*'),
    onGuardErrorFunction,
    (req: $Request, res: $Response) => getLogout(req, res, helpers, models)
  );

  router.get(
    '/dashboard',
    helpers.guard.requireAny('admin/*'),
    onGuardErrorFunction,
    (req: $Request, res: $Response) => {
      getDashboard(req, res, helpers, models)
    }
  );

  return router;
};

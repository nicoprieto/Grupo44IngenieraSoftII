// @flow

import express, {
  type $Request,
  type $Response,
  type NextFunction,
} from 'express';

import { type THelpers } from '../../routes.helpers';
import { type TGuardError } from '../../routes.helpers/guard';
import { type TModels } from '../../models';

import {
  getLogin,
  postLogin,
  getLogout,
  getDashboard,
} from '../../controllers/admin';

// ----------------------
// export default
// ----------------------

export default (helpers: THelpers, models: TModels) => {
  const router = express.Router();

  router.get(
    '/login',
    helpers.guard.requireAny('guest/*'),
    (err: TGuardError, req: $Request, res: $Response, next: NextFunction) => {
      if(err.isGuard) {
        res.redirect('/');
      }
    },
    (req: $Request, res: $Response) => getLogin(req, res, helpers, models)
  );

  router.post(
    '/login',
    helpers.guard.requireAny('guest/*'),
    (err: TGuardError, req: $Request, res: $Response, next: NextFunction) => {
      if(err.isGuard) {
        res.redirect('/');
      }
    },
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
    (err: TGuardError, req: $Request, res: $Response, next: NextFunction) => {
      // redirect to login is user doest have admin/* permission
      if(err.isGuard) {
        res.redirect('/admin/login');
      }
    },
    (req: $Request, res: $Response) => getLogout(req, res, helpers, models)
  );

  router.get(
    '/dashboard',
    helpers.guard.requireAny('admin/*'),
    (err: TGuardError, req: $Request, res: $Response, next: NextFunction) => {
      // redirect to login is user doest have admin/* permission
      if(err.isGuard) {
        res.redirect('/admin/login');
      }
    },
    (req: $Request, res: $Response) => {
      getDashboard(req, res, helpers, models)
    }
  );

  return router;
};

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
  getList,
  getCreate,
  postCreate,
  getUpdate,
  getRemove,
  deleteRemove,
} from '../../controllers/residences';

// ----------------------
// export default
// ----------------------

export default (helpers: THelpers, models: TModels) => {
  const router = express.Router({ mergeParams: true });

  router.get(
    '/',
    helpers.guard.requireAny('admin/*'),
    (err: TGuardError, req: $Request, res: $Response, next: NextFunction) => {
      // redirect to login is user doest have admin/* permission
      if(err.isGuard) {
        res.redirect('/admin/login');
      }
    },
    (req: $Request, res: $Response) => getList(req, res, helpers, models)
  );

  // TODO put before /:id to avoid failling in that route
  router.get(
    '/create',
    helpers.guard.requireAny('admin/*'),
    (err: TGuardError, req: $Request, res: $Response, next: NextFunction) => {
      // redirect to login is user doest have admin/* permission
      if(err.isGuard) {
        res.redirect('/admin/login');
      }
    },
    (req: $Request, res: $Response) => getCreate(req, res, helpers, models)
  );

  router.get(
    '/:id',
    helpers.guard.requireAny('admin/*'),
    (err: TGuardError, req: $Request, res: $Response, next: NextFunction) => {
      // redirect to login is user doest have admin/* permission
      if(err.isGuard) {
        res.redirect('/admin/login');
      }
    },
    (req: $Request, res: $Response) => getUpdate(req, res, helpers, models)
  );

  router.post(
    '/create',
    helpers.guard.requireAny('admin/*'),
    (err: TGuardError, req: $Request, res: $Response, next: NextFunction) => {
      // redirect to login is user doest have admin/* permission
      if(err.isGuard) {
        res.redirect('/admin/login');
      }
    },
    // TODO: handle when submit fail but photos are still saved
    helpers.fileUpload('residences', 'png', ['photos']),
    // $FlowFixMe
    [
      helpers
      .validator
        .check('title')
        .exists({ checkFalsy: true })
        .withMessage('Por favor ingrese titulo de la residencia'),

      helpers
      .validator
        .check('description')
        .exists({ checkFalsy: true })
        .withMessage('Por favor ingrese descripccion de la residencia'),

      helpers
        .validator
          .check('photosLength')
          // look for good case
          .custom((value) => parseInt(value, 10) >= 1)
          .withMessage('Por favor ingrese como minimo 1 foto de la residencia'),

      helpers
        .validator
          .check('photosLength')
          // look for good case
          .custom((value) => parseInt(value, 10) <= 5)
          .withMessage('Maximo 5 fotos por residencia'),

      helpers
      .validator
        .check('address_street')
        .exists({ checkFalsy: true })
        .withMessage('Por favor ingrese domicilio calle'),

      helpers
      .validator
        .check('address_number')
        .exists({ checkFalsy: true })
        .withMessage('Por favor ingrese domicilio numero'),

      helpers
      .validator
        .check('address_postal_code')
        .exists({ checkFalsy: true })
        .withMessage('Por favor ingrese domicilio codigo postal'),

      helpers
      .validator
        .check('address_city')
        .exists({ checkFalsy: true })
        .withMessage('Por favor ingrese domicilio ciudad'),

      helpers
      .validator
        .check('address_state')
        .exists({ checkFalsy: true })
        .withMessage('Por favor ingrese domicilio provincia'),

      helpers
        .validator
          .check('address_nation')
          .exists({ checkFalsy: true })
          .withMessage('Por favor ingrese domicilio pais'),

      // address_apartament is not required
      // address_flat is not required

      // TODO: how to test isEnabled?
    ],
    (req: $Request, res: $Response) => postCreate(req, res, helpers, models),
  );

  router.get(
    '/:id/remove',
    helpers.guard.requireAny('admin/*'),
    (err: TGuardError, req: $Request, res: $Response, next: NextFunction) => {
      // redirect to login is user doest have admin/* permission
      if(err.isGuard) {
        res.redirect('/admin/login');
      }
    },
    (req: $Request, res: $Response) => getRemove(req, res, helpers, models),
  );

  router.post(
    '/:id/remove',
    helpers.guard.requireAny('admin/*'),
    (err: TGuardError, req: $Request, res: $Response, next: NextFunction) => {
      // redirect to login is user doest have admin/* permission
      if(err.isGuard) {
        res.redirect('/admin/login');
      }
    },
    (req: $Request, res: $Response) => deleteRemove(req, res, helpers, models),
  );

  return router;
};

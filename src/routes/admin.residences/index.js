// @flow

import express, {
  type $Request,
  type $Response,
  type NextFunction,
} from 'express';

import { type THelpers } from '../../routes.helpers';
import { type TGuardError } from '../../routes.helpers/guard';
import { type TModelsWithHelpers } from '../../models';

import initValidators from './validators';

import {
  getList,
  getCreate,
  postCreate,
  getUpdate,
  getRemove,
  postRemove,
  postUpdate,
} from '../../controllers/admin.residences';

// ----------------------
// export default
// ----------------------

export default (helpers: THelpers, models: TModelsWithHelpers) => {
  const router = express.Router({ mergeParams: true });

  const validators = initValidators(helpers, models);

  const onGuardErrorFunction = (err: TGuardError, req: $Request, res: $Response, next: NextFunction) => {
    // redirect to login is user doest have admin/* permission
    if(err.isGuard) {
      res.redirect('/admin/login');
    } else {
      next();
    }
  };

  router.get(
    '/',
    helpers.guard.requireAny('admin/*'),
    onGuardErrorFunction,
    (req: $Request, res: $Response) => getList(req, res, helpers, models)
  );

  router.get(
    '/:id(\\d+)',
    helpers.guard.requireAny('admin/*'),
    onGuardErrorFunction,
    (req: $Request, res: $Response) => getUpdate(req, res, helpers, models)
  );

  router.get(
    '/create',
    helpers.guard.requireAny('admin/*'),
    onGuardErrorFunction,
    (req: $Request, res: $Response) => getCreate(req, res, helpers, models)
  );

  router.post(
    '/create',
    helpers.guard.requireAny('admin/*'),
    onGuardErrorFunction,
    // TODO: handle when submit fail but photos are still saved
    helpers.fileUpload('residences', 'png', ['photos']),
    // $FlowFixMe
    [
      validators.titleIsEmpty,
      validators.titleIsAlreadyInSameCity,
      validators.description,
      validators.photosLengthMin1,
      validators.photosLengthMax5,
      validators.address_street,
      validators.address_number,
      validators.address_postal_code,
      validators.address_city,
      validators.address_state,
      validators.address_nation,
      validators.starting_bid_price,
    ],
    (req: $Request, res: $Response) => postCreate(req, res, helpers, models),
  );

  router.post(
    '/:id(\\d+)/update',
    helpers.guard.requireAny('admin/*'),
    onGuardErrorFunction,
    // TODO: handle when submit fail but photos are still saved
    helpers.fileUpload('residences', 'png', ['photos']),
    // $FlowFixMe
    [
      validators.titleIsEmpty,
      validators.titleIsAlreadyInSameCity,
      validators.description,
      validators.photosLengthMin1,
      validators.photosLengthMax5,
      validators.address_street,
      validators.address_number,
      validators.address_postal_code,
      validators.address_city,
      validators.address_state,
      validators.address_nation,
      validators.starting_bid_price,
    ],
    (req: $Request, res: $Response) => postUpdate(req, res, helpers, models),
  );

  router.get(
    '/:id(\\d+)/remove',
    helpers.guard.requireAny('admin/*'),
    onGuardErrorFunction,
    (req: $Request, res: $Response) => getRemove(req, res, helpers, models),
  );

  router.post(
    '/:id(\\d+)/remove',
    helpers.guard.requireAny('admin/*'),
    onGuardErrorFunction,
    (req: $Request, res: $Response) => postRemove(req, res, helpers, models),
  );

  return router;
};

// @flow

import express, {
  type $Request,
  type $Response,
  type NextFunction,
} from 'express';

import { type THelpers } from '../../routes.helpers';
import { type TGuardError } from '../../routes.helpers/guard';
import { type TModelsWithHelpers } from '../../models';

export const validateSessionClientIdWithParamId = (
  req: $Request,
  res: $Response,
  next: NextFunction,
  helpers: THelpers,
  models: TModelsWithHelpers
) => {
  const { id } = req.params;
  if(
    typeof req.session.clientId === 'undefined' ||
    req.session.clientId.toString() !== id.toString()
  ) {
    res.status(helpers.HttpStatusCodes.INTERNAL_SERVER_ERROR).send();
  } else {
    next();
  }
};

export const getClientUsingParamId = async (
  req: $Request,
  res: $Response,
  next: NextFunction,
  helpers: THelpers,
  models: TModelsWithHelpers
) => {
  const { id } = req.params;
  const client = await models.Clients.query().findById(id);
  // extreme rare case
  if(!(client instanceof models.Clients)) {
    res.status(helpers.HttpStatusCodes.INTERNAL_SERVER_ERROR).send();
  } else {
    // put client in res.locals
    res.locals.client = client;
    next();
  }
};

export const getResidenceUsingParamId = async (
  req: $Request,
  res: $Response,
  next: NextFunction,
  helpers: THelpers,
  models: TModelsWithHelpers
) => {
  const { residenceId } = req.params;
  const residence = await models.Residences.query().findById(residenceId);
  // extreme rare case
  if(!(residence instanceof models.Residences)) {
    res.status(helpers.HttpStatusCodes.INTERNAL_SERVER_ERROR).send();
  } else {
    // put residence in res.locals
    res.locals.residence = residence;
    next();
  }
};

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
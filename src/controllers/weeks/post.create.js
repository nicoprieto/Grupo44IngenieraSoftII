// @flow

import express, {
  type $Request,
  type $Response,
} from 'express';

import { type THelpers } from '../../routes.helpers';
import { type TModels } from '../../models';

import { type TWeeks } from '../../models/Weeks';

import {
  createViewFile,
  createViewProps,
} from './constants';

export default async (
  req: $Request,
  res: $Response,
  helpers: THelpers,
  { Weeks, Residences }: TModels
) => {
  // used in the return data
  const residences = await Residences.query().select('id', 'title');
  const errors = helpers.validator.validationResult(req);
  if(errors.isEmpty()) {
    try {
      // create a week for each residence
      const weeksData = Weeks.getFromReqBody(req);
      await Promise.all(weeksData.map((weekData) =>
        Weeks.query().insert(weekData))
      );
      // redirect to weeks after creation
      res.redirect('/admin/weeks');
    // database error
    } catch(e) {
      console.error(e);
      res.render(
        createViewFile,
        {
          ...createViewProps,
          errors: [
            {
              "location": "body",
              "msg": "Fallo la creacion de la reserva, intente de vuelta",
              "param": ""
            }
          ],
          data: {
            id: null,
            ...req.body,
          },
          residences,
        }
      );
    }
  // post data submitted is invalid
  } else {
    res.render(
      createViewFile,
      {
        ...createViewProps,
        errors: errors.array(),
        data: {
          id: null,
          ...req.body,
        },
        residences,
      }
    );
  }
};

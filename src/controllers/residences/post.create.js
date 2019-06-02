// @flow

import express, {
  type $Request,
  type $Response,
} from 'express';

import { type THelpers } from '../../routes.helpers';
import { type TModels } from '../../models';

import { type TResidence, type TResidencePhoto } from '../../models/Residences';

import {
  residenceCreateViewFile,
  residenceCreateViewProps,
} from './constants';

export default async (
  req: $Request,
  res: $Response,
  helpers: THelpers,
  { Residences, ResidencesPhotos, helpers: { password, now } }: TModels
) => {
  const errors = helpers.validator.validationResult(req);
  if(errors.isEmpty()) {
    try {
      // create residence
      const residenceData = Residences.getFromReqBody(req);
      const residence = await Residences.query().insert(residenceData);
      // create residence photos
      const residencePhotosData = ResidencesPhotos.getFromReqBody({ body: { photos: req.files.photos } }, residence.id);
      await Promise.all(residencePhotosData.map((data) => ResidencesPhotos.query().insert(data)));
      // redirect to residences after creation
      res.redirect('/admin/residences');
    // database error
    } catch(e) {
      console.error(e);
      res.render(
        residenceCreateViewFile,
        {
          ...residenceCreateViewProps,
          errors: [
            {
              "location": "body",
              "msg": "Fallo la creacion de la residencia, intente de vuelta",
              "param": ""
            }
          ],
          data: {
            id: null,
            ...req.body,
          },
        }
      );
    }
  // post data submitted is invalid
  } else {
    res.render(
      residenceCreateViewFile,
      {
        ...residenceCreateViewProps,
        errors: errors.array(),
        data: {
          id: null,
          ...req.body,
        },
      }
    );
  }
};

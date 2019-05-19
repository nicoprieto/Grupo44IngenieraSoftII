// @flow

import express, {
  type $Request,
  type $Response,
} from 'express';

import { type THelpers } from '../../routes.helpers';
import { type TModels } from '../../models';

import { type TResidence, type TResidencePhoto } from '../../models/Residences';

import {
  residenceViewFile,
  residenceViewProps,
} from './constants';

export default async (
  req: $Request,
  res: $Response,
  helpers: THelpers,
  { Residences, ResidencesPhotos, helpers: { password, now } }: TModels
) => {
  const errors = helpers.validator.validationResult(req);
  if(errors.isEmpty()) {
    const {
      title,
      description,
      address_street,
      address_number,
      address_postal_code,
      address_city,
      address_state,
      address_nation,
      address_apartament,
      address_flat,
      isEnabled,
      price,
    } = req.body;
    try {
      const residenceData: TResidence = {
        id: null,
        title,
        description,
        address_street,
        address_number,
        address_postal_code,
        address_city,
        address_state,
        address_nation,
        address_apartament,
        address_flat,
        isEnabled: isEnabled === 'on',
        price,
        created_at: now(),
        updated_at: '',
        isRemoved: false,
      };
      const residence = await Residences.query().insert(residenceData);
      const residencePhotosData = req.files.photos.map(({ filename }): TResidencePhoto => ({
        id: null,
        residences_id: residence.id,
        filename,
        created_at: now(),
        updated_at: '',
        isRemoved: false,
      }));
      await Promise.all(residencePhotosData.map((data) => ResidencesPhotos.query().insert(data)));
      res.redirect('/admin/residences');
    // database error
    } catch(e) {
      console.error(e);
      res.render(
        residenceViewFile,
        {
          ...residenceViewProps,
          errors: [
            {
              "location": "body",
              "msg": "Fallo la creacion de la residencia, intente de vuelta",
              "param": ""
            }
          ],
          data: req.body,
        }
      );
    }
  // post data submitted is invalid
  } else {
    res.render(
      residenceViewFile,
      {
        ...residenceViewProps,
        errors: errors.array(),
        data: req.body,
      }
    );
  }
};

// @flow

import express, {
  type $Request,
  type $Response,
} from 'express';

import { type THelpers } from '../../routes.helpers';
import { type TModels } from '../../models';

import { type TResidence } from '../../models/Residences';

import {
  residenceViewFile,
  residenceViewProps,
} from './constants';

export default async (
  req: $Request,
  res: $Response,
  helpers: THelpers,
  { Residences, helpers: { password, now } }: TModels
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
        isEnabled,
        price,
        created_at: now(),
        updated_at: '',
        isRemoved: false,
      };
      const residence = await Residences.query().insert(residenceData);
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
              "msg": "Fallo el ingreso intente de vuelta",
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

// @flow

import express, {
  type $Request,
  type $Response,
} from 'express';

import { type THelpers } from '../../routes.helpers';
import { type TModels } from '../../models';

import { type TResidence } from '../../models/Residences';
import { type TResidencePhoto } from '../../models/ResidencesPhotos';

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
  const { id } = req.params;
  const errors = helpers.validator.validationResult(req);
  if(errors.isEmpty()) {
    try {
      // create residence... 
      const residenceData = {
        ...Residences.getFromReqBody(req),
        // ...but we are updating
        id: undefined,
      };
      let residence = await Residences
        .query()
        .patchAndFetchById(id, residenceData)
      ;
      // overwrite residence photos if there is the case
      const { photos } = req.files;
      if(Array.isArray(photos)) {
        const residencePhotosData = ResidencesPhotos.getFromReqBody({ body: { photos } }, residence.id);
        // "delete" current photos
        await ResidencesPhotos
          .query()
          .update({
            isRemoved: true,
          })
          .where({
            residences_id: id,
          })
        ;
        // insert new one
        await Promise.all(residencePhotosData.map((data) =>
          ResidencesPhotos
            .query()
            .insert(data)
        ));
      }
      // eager the photos
      residence = await Residences
        .query()
        .findById(id)
        .eager('photos')
        .modifyEager(
          'photos',
          (builder) => builder.where('isRemoved', false)
        )
      ;
      res.render(
        residenceCreateViewFile,
        {
          ...residenceCreateViewProps,
          data: residence,
          didSuccess: true,
        }
      );
    // database error
    } catch(e) {
      console.error('fail post.update', e);
      res.status(helpers.HttpStatusCodes.INTERNAL_SERVER_ERROR).send();
    }
  // post data submitted is invalid
  } else {
    // eager the photos
    const residence = await Residences
      .query()
      .findById(id)
      .eager('photos')
      .modifyEager(
        'photos',
        (builder) => builder.where('isRemoved', false)
      )
    ;
    res.render(
      residenceCreateViewFile,
      {
        ...residenceCreateViewProps,
        errors: errors.array(),
        data: {
          id,
          ...req.body,
          photos: residence.photos,
        },
      }
    );
  }
};

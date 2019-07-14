// @flow

import { type THelpers } from '../../routes.helpers';
import { type TModelsWithHelpers } from '../../models';

export default (
  helpers: THelpers,
  models: TModelsWithHelpers,
) => {
  return {
    titleIsEmpty: helpers
    .validator
      .check('title')
      .exists({ checkFalsy: true })
      .withMessage('Por favor ingrese titulo de la residencia'),

    titleIsAlreadyInSameCity: helpers
    .validator
      .check('title')
      .custom(async (title, { req }: { req: $Request }) => {
        try {
          return (await models
            .Residences
            .query()
            .where({
              title,
              address_city: req.body.address_city,
              isRemoved: false,
            })
          ).length === 0;
        } catch(e) {
          console.log(e);
          return false;
        }
      })
      .withMessage('Ya existe una residencia con el mismo titulo para esta misma localidad'),

    description: helpers
    .validator
      .check('description')
      .exists({ checkFalsy: true })
      .withMessage('Por favor ingrese descripccion de la residencia'),

    photosLengthMin1: helpers
    .validator
      .check('photosLength')
      // look for good case
      .custom((value) => parseInt(value, 10) >= 1)
      .withMessage('Por favor ingrese como minimo 1 foto de la residencia'),

    photosLengthMax5: helpers
    .validator
      .check('photosLength')
      // look for good case
      .custom((value) => parseInt(value, 10) <= 5)
      .withMessage('Maximo 5 fotos por residencia'),

    address_street: helpers
    .validator
      .check('address_street')
      .exists({ checkFalsy: true })
      .withMessage('Por favor ingrese domicilio calle'),

    address_number: helpers
    .validator
      .check('address_number')
      .exists({ checkFalsy: true })
      .withMessage('Por favor ingrese domicilio numero'),

    address_postal_code: helpers
    .validator
      .check('address_postal_code')
      .exists({ checkFalsy: true })
      .withMessage('Por favor ingrese domicilio codigo postal'),

    address_city: helpers
    .validator
      .check('address_city')
      .exists({ checkFalsy: true })
      .withMessage('Por favor ingrese domicilio ciudad'),

    address_state: helpers
    .validator
      .check('address_state')
      .exists({ checkFalsy: true })
      .withMessage('Por favor ingrese domicilio provincia'),

    address_nation: helpers
    .validator
        .check('address_nation')
        .exists({ checkFalsy: true })
        .withMessage('Por favor ingrese domicilio pais'),

    starting_bid_price: helpers
    .validator
        .check('starting_bid_price')
        .isFloat()
        .withMessage('Por favor ingrese monto basico'),

    // address_apartament is not required
    // address_flat is not required

    // TODO: how to test isEnabled?
  };
};

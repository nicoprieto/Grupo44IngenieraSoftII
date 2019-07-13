// @flow

import helpers from '../../routes.helpers';

export default {
  name: helpers
    .validator
      .check('name')
      .exists({ checkFalsy: true })
      .withMessage('Por favor ingrese su nombre'),
  surname: helpers
    .validator
      .check('surname')
      .exists({ checkFalsy: true })
      .withMessage('Por favor ingrese su apellido'),
  birth_dateEmpty: helpers
    .validator
      .check('birth_date')
      .exists({ checkFalsy: true })
      .withMessage('Por favor ingrese su fecha de nacimiento'),
  birth_dateIsAdult: helpers
    .validator
    .check('birth_date')
    // check for the good case
    .custom((value) => helpers.isBirthDateAdultAge(value))
    .withMessage('Debe tener mas de 18 años para poder usar el sitio'),
  emailEmpty: helpers
    .validator
      .check('email')
      .exists({ checkFalsy: true })
      .withMessage('Por favor ingrese su email'),
  emailInvalid: helpers
    .validator
      .check('email')
      .isEmail()
      .withMessage('Email ingresado no es valido'),
  document_numberEmpty: helpers
    .validator
      .check('document_number')
      .exists({ checkFalsy: true })
      .withMessage('Por favor ingrese su numero de documento'),
  document_numberInvalid: helpers
    .validator
      .check('document_number')
      // check for the good case
      .custom((value) => !isNaN(value))
      .withMessage('Numero de documento ingresado no es valido'),
  phone: helpers
    .validator
      .check('phone')
      .exists({ checkFalsy: true })
      .withMessage('Por favor ingrese su telefono'),
  address: helpers
    .validator
      .check('address')
      .exists({ checkFalsy: true })
      .withMessage('Por favor ingrese una direccion'),
  curPass: helpers
    .validator
      .check('curPass')
      .isLength({ min: 6 })
      .withMessage('Contrasena actual es invalida'),       
  pass: helpers
    .validator
      .check('pass')
      .isLength({ min: 6 })
      .withMessage('Por favor ingrese una contrasena valida'),
  respass: helpers
    .validator
    .check('repass')
    .custom((value, { req }) => value === req.body.pass)
    .withMessage('Las contrasena no son coindicentes'),
  credit_card_brand: helpers
    .validator
    .check('credit_card_brand')
    .exists({ checkFalsy: true })
    .withMessage('Ingrese tarjeta de credito marca, por favor'),
  credit_card_number: helpers
    .validator
      .check('credit_card_number')
      // check for the good case
      .custom((value) => /^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/.test(value))
      .withMessage('Numero de tarjeta de credito es incorrecto'),
  credit_card_expiration: helpers
    .validator
    .check('credit_card_expiration')
    // check for the good case
    .custom((value) => helpers.isCreditCardExpirationValid(value))
    .withMessage('Fecha de expiracion tarjeta es incorrecto'),
  credit_card_owner: helpers
    .validator
      .check('credit_card_owner')
      .exists({ checkFalsy: true })
      .withMessage('Ingrese nombre del titular de la tarjeta de credito'),
  credit_card_security_code: helpers
    .validator
    .check('credit_card_security_code')
    .custom((value) => /^\d{3}$/.test(value))
    .withMessage('Codigo de seguridad es invalido'),
  weeks_id: helpers
    .validator
    .check('weeks_id')
    .isInt()
    .withMessage('weeks_id is missing'),
};

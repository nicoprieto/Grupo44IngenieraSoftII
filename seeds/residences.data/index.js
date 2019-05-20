// @noflow

const moment = require('moment');

function now() {
  return moment().format('YYYY-MM-DD HH:mm:ss');
}

module.exports = [
  {
    id: null,
    title: 'Nou Camp vivienda',
    description: 'Hermosa ubicacion a metros del Nou Camp',
    address_street: 'C. d\'Arístides Maillol',
    address_number: '08028',
    address_postal_code: '12',
    address_city: 'Barcelona',
    address_state: 'Barcelona',
    address_nation: 'España',
    address_apartament: '',
    address_flat: '',
    isEnabled: true,
    created_at: now(),
    updated_at: '',
    isRemoved: false,
  },

  {
    id: null,
    title: 'Nou Camp vivienda',
    description: 'Hermosa ubicacion a metros del  Ningineer Stadium',
    address_street: '乙46 Uenomachi',
    address_number: '791-1136',
    address_postal_code: '2428888',
    address_city: 'Matsuyama',
    address_state: 'Ehime',
    address_nation: 'Japon',
    address_apartament: '',
    address_flat: '',
    isEnabled: true,
    created_at: now(),
    updated_at: '',
    isRemoved: false,
  },
];
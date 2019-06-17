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
    title: 'Ehime vivienda',
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

  {
    id: null,
    title: 'Hitch UCLA / Steinberg',
    description: 'El recientemente renovado Hitch Residencias de Estudiantes, situado en el extremo noroeste del campus, es un complejo de cuatro edificios residenciales de tres pisos organizados en torno a una serie de patios y un nuevo edificio de bienes comunes con instalaciones compartidas y espacios de reunión.',
    address_street: 'Hitch',
    address_number: 'aa-11',
    address_postal_code: '123211',
    address_city: 'Los Angeles',
    address_state: 'CA',
    address_nation: 'EEUU',
    address_apartament: '',
    address_flat: '',
    isEnabled: true,
    created_at: now(),
    updated_at: '',
    isRemoved: false,
  },

  {
    id: null,
    title: 'Casa Terraço / David Guerra',
    description: 'Descrição enviada pela equipe de projeto. O casal procurou por 4 anos um profissional que conseguisse traduzir suas ideias sobre uma casa de campo, até se identificar com o trabalho do arquiteto David Guerra. Essa história é marcada também pela coincidência de que a arquiteta da mãe da proprietária, Freusa Zechmeister, foi onde David Guerra trabalhou e aprendeu a dar o contorno a sua arquitetura do afeto.',
    address_street: 'Terraço',
    address_number: 'AB1',
    address_postal_code: '9011',
    address_city: 'Vale do Mutuca',
    address_state: 'Brasil',
    address_nation: 'Brasil',
    address_apartament: '',
    address_flat: '',
    isEnabled: true,
    created_at: now(),
    updated_at: '',
    isRemoved: false,
  },

  {
    id: null,
    title: 'RESIDENCIA Y CENTRO DE DÍA',
    description: 'La residencia de mayores en Cartagena (Murcia) ORPEA se encuentra en un entorno único para prestar una atención de calidad a nuestros residentes y usuarios. Situada en el centro de la ciudad de Cartagena, permite disfrutar de excelentes instalaciones y servicios, en un ambiente tranquilo y agradable, con las mejores comunicaciones.',
    address_street: 'C/ Beatas, 10',
    address_number: '30202',
    address_postal_code: '968 122 789',
    address_city: 'CARTAGENA',
    address_state: 'Murcia',
    address_nation: 'Spain',
    address_apartament: '',
    address_flat: '',
    isEnabled: true,
    created_at: now(),
    updated_at: '',
    isRemoved: false,
  },
];
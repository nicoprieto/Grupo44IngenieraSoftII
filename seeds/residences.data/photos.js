// @noflow

const moment = require('moment');

function now() {
  return moment().format('YYYY-MM-DD HH:mm:ss');
}

module.exports = [
  {
    id: null,
    residences_id: null,
    filename: '1.png',
    created_at: now(),
    updated_at: '',
    isRemoved: false,
  },
  {
    id: null,
    residences_id: null,
    filename: '2.png',
    created_at: now(),
    updated_at: '',
    isRemoved: false,
  },
  {
    id: null,
    residences_id: null,
    filename: '3.png',
    created_at: now(),
    updated_at: '',
    isRemoved: false,
  },
  {
    id: null,
    residences_id: null,
    filename: 'a.png',
    created_at: now(),
    updated_at: '',
    isRemoved: false,
  },
  {
    id: null,
    residences_id: null,
    filename: 'b.png',
    created_at: now(),
    updated_at: '',
    isRemoved: false,
  },
];
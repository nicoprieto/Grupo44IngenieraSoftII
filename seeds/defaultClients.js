
const Scrypt = require('scrypt-kdf');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('clients').del()
    .then(function() {
      return knex('clients_pending_premium').del();
    })
    .then(function() {
      return Scrypt.kdf('123456', { logN: 15 });
    })
    .then(function(pass) {
      // Inserts seed entries
      return knex('clients').insert([
        {
          id: null,
          email: 'test@test.com',
          pass: pass,
          name: 'Martin',
          surname: 'Ruiz',
          birth_date: '10/10/1901',
          document_number: '665544112',
          phone: '54084285',
          credit_card_brand: 'Visa',
          credit_card_number: '5412 1441 6666 1111',
          credit_card_expiration: '10/22',
          credit_card_owner: 'Martin Ruiz',
          credit_card_security_code: '996',
          address: '137 esq 64 n245',
          creditPoints: 2,
          type: 'premium',
          isEnabled: true,
          created_at: knex.fn.now(),
          updated_at: '',
          isRemoved: false,
        },
        {
          id: null,
          email: 'test2@test2.com',
          pass: pass,
          name: 'Martin',
          surname: 'Ruiz',
          birth_date: '10/10/1901',
          document_number: '665544112',
          phone: '54084285',
          credit_card_brand: 'Visa',
          credit_card_number: '5412 1441 6666 1111',
          credit_card_expiration: '10/22',
          credit_card_owner: 'Martin Ruiz',
          credit_card_security_code: '996',
          address: '137 esq 64 n245',
          creditPoints: 0,
          type: 'normal',
          isEnabled: true,
          created_at: knex.fn.now(),
          updated_at: '',
          isRemoved: false,
        },
        {
          id: null,
          email: 'test3@test3.com',
          pass: pass,
          name: 'Martin',
          surname: 'Ruiz',
          birth_date: '10/10/1901',
          document_number: '665544112',
          phone: '54084285',
          credit_card_brand: 'Visa',
          credit_card_number: '5412 1441 6666 1111',
          credit_card_expiration: '10/22',
          credit_card_owner: 'Martin Ruiz',
          credit_card_security_code: '996',
          address: '137 esq 64 n245',
          creditPoints: 0,
          type: 'premium',
          isEnabled: true,
          created_at: knex.fn.now(),
          updated_at: '',
          isRemoved: false,
        },
      ]);
    });
};

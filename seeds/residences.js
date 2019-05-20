// @noflow

const cpFile = require('cp-file');
const appRoot = require('app-root-path');

const residencesPhotosData = require('./residences.data/photos');
const residencesData = require('./residences.data');

exports.seed = function(knex, Promise) {
  return knex('residences_photos')
    .del()
    .then(function() {
      return knex('residences')
        .del()
        .then(function() {
          return Promise.all(residencesData.map((data) =>
            knex('residences').insert(data))
          )
        })
        .then(function() {
          return knex('residences').select()
        })
        .then(function(rows) {
          const id1 = rows[0].id;
          const id2 = rows[1].id;
          const id1Photo1 = residencesPhotosData[0];
          const id1Photo2 = residencesPhotosData[1];
          const id1Photo3 = residencesPhotosData[2];
          const id2Photo1 = residencesPhotosData[3];
          const id2Photo2 = residencesPhotosData[4];
          return Promise.all([
            knex('residences_photos').insert({
              ...id1Photo1,
              residences_id: id1,
            }),
            knex('residences_photos').insert({
              ...id1Photo2,
              residences_id: id1,
            }),
            knex('residences_photos').insert({
              ...id1Photo3,
              residences_id: id1,
            }),
            knex('residences_photos').insert({
              ...id2Photo1,
              residences_id: id2,
            }),
            knex('residences_photos').insert({
              ...id2Photo2,
              residences_id: id2,
            }),
          ])
        })
        .then(function() {
          return Promise.all([
            cpFile(`${appRoot}/seeds/residences.data/1.png`, `${appRoot}/uploads/residences/1.png`),
            cpFile(`${appRoot}/seeds/residences.data/2.png`, `${appRoot}/uploads/residences/2.png`),
            cpFile(`${appRoot}/seeds/residences.data/3.png`, `${appRoot}/uploads/residences/3.png`),
            cpFile(`${appRoot}/seeds/residences.data/a.png`, `${appRoot}/uploads/residences/a.png`),
            cpFile(`${appRoot}/seeds/residences.data/b.png`, `${appRoot}/uploads/residences/b.png`),
          ]);
        })
      })
};

// @noflow

const cpFile = require('cp-file');
const appRoot = require('app-root-path');

const residencesPhotosData = require('./residences.data/photos');
const residencesData = require('./residences.data');

exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('weeks').del(),

    knex('residences_photos').del().then(function() {
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
          const id3 = rows[2].id;
          const id4 = rows[3].id;
          const id5 = rows[4].id;
          const id1Photo1 = residencesPhotosData[0];
          const id1Photo2 = residencesPhotosData[1];
          const id1Photo3 = residencesPhotosData[2];
          const id2Photo1 = residencesPhotosData[3];
          const id2Photo2 = residencesPhotosData[4];
          const id3Photo11 = residencesPhotosData[5];
          const id3Photo12 = residencesPhotosData[6];
          const id3Photo13 = residencesPhotosData[7];
          const id4PhotoAA = residencesPhotosData[8];
          const id4PhotoAB = residencesPhotosData[9];
          const id5Photo111 = residencesPhotosData[8];
          const id5Photo112 = residencesPhotosData[9];
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

            knex('residences_photos').insert({
              ...id3Photo11,
              residences_id: id3,
            }),
            knex('residences_photos').insert({
              ...id3Photo12,
              residences_id: id3,
            }),
            knex('residences_photos').insert({
              ...id3Photo13,
              residences_id: id3,
            }),

            knex('residences_photos').insert({
              ...id4PhotoAA,
              residences_id: id4,
            }),
            knex('residences_photos').insert({
              ...id4PhotoAB,
              residences_id: id4,
            }),

            knex('residences_photos').insert({
              ...id5Photo111,
              residences_id: id5,
            }),
            knex('residences_photos').insert({
              ...id5Photo112,
              residences_id: id5,
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

            cpFile(`${appRoot}/seeds/residences.data/11.png`, `${appRoot}/uploads/residences/11.png`),
            cpFile(`${appRoot}/seeds/residences.data/12.png`, `${appRoot}/uploads/residences/12.png`),
            cpFile(`${appRoot}/seeds/residences.data/13.png`, `${appRoot}/uploads/residences/13.png`),

            cpFile(`${appRoot}/seeds/residences.data/aa.png`, `${appRoot}/uploads/residences/aa.png`),
            cpFile(`${appRoot}/seeds/residences.data/ab.png`, `${appRoot}/uploads/residences/ab.png`),

            cpFile(`${appRoot}/seeds/residences.data/111.png`, `${appRoot}/uploads/residences/111.png`),
            cpFile(`${appRoot}/seeds/residences.data/112.png`, `${appRoot}/uploads/residences/112.png`),
          ]);
        })
      })
    ]);
};

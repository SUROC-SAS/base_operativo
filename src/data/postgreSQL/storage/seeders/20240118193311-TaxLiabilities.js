'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, _Sequelize) {
    await queryInterface.bulkInsert(
      'TaxLiabilities',
      [
        {
          name: 'Responsable de IVA',
          code: 'RI',
        },
        {
          name: 'No responsable de IVA',
          code: 'NI',
        },
      ],
      {}
    );
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('TaxLiabilities', null, {});
  },
};

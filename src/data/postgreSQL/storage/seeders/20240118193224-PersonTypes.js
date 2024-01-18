'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, _Sequelize) {
    await queryInterface.bulkInsert(
      'PersonTypes',
      [
        {
          name: 'Persona Jurídica',
          code: 'PJ',
        },
        {
          name: 'Persona Natural',
          code: 'PN',
        },
      ],
      {}
    );
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('PersonTypes', null, {});
  },
};

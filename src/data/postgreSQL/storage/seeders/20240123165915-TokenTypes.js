"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "TokenTypes",
      [
        {
          code: "T01",
          name: "Recovery password",
        },
        {
          code: "T02",
          name: "Confirm email",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("TokenTypes", null, {});
  },
};

"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert(
      "Roles",
      [
        {
          name: "GERENCIA",
          code: "RL01",
        },
        {
          name: "COORDINADOR DE PROYECTO",
          code: "RL02",
        },
        {
          name: "GESTOR TÉCNICO",
          code: "RL03",
        },
        {
          name: "GESTOR JURÍDICO",
          code: "RL04",
        },
        {
          name: "LIDER TÉCNICO",
          code: "RL05",
        },
        {
          name: "LIDER JURÍDICO",
          code: "RL06",
        },
        {
          name: "GESTOR DE MUNICIPIO",
          code: "RL07",
        },
      ],
      {}
    );
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete("Roles", null, {});
  },
};

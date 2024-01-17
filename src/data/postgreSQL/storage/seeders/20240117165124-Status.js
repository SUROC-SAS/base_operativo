"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Status",
      [
        {
          name: "Pendiente",
          code: "ST0",
        },
        {
          name: "En Revisión",
          code: "ST1",
        },
        {
          name: "Aprobado",
          code: "ST2",
        },
        {
          name: "Rechazado",
          code: "ST3",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Status", null, {});
  },
};

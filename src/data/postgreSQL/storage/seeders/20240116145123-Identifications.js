"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert(
      "Identifications",
      [
        {
          name: "RC. Registro Civil",
          code: "DT01",
        },
        {
          name: "TI. Tarjeta de identidad.",
          code: "DT02",
        },
        {
          name: "CC. Cédula de ciudadanía",
          code: "DT03",
        },
        {
          name: "NUIP. Número único de identificación personal.",
          code: "DT04",
        },
        {
          name: "NIT. Número de identificación tributaria.",
          code: "DT05",
        },
        {
          name: "NIT. De otro país",
          code: "DT06",
        },
        {
          name: "PP. Pasaporte",
          code: "DT07",
        },
        {
          name: "PEP. Permiso especial de permanencia",
          code: "DT08",
        },
        {
          name: "DIE. Documento de identificación del extranjero",
          code: "DT09",
        },
        {
          name: "CE. Cédula de extranjería",
          code: "DT10",
        },
      ],
      {}
    );
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete("Identifications", null, {});
  },
};

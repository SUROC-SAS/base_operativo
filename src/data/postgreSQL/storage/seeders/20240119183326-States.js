"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "States",
      [
        {
          id: 1,
          name: "Amazonas",
          code: "AMA",
          countryId: 44,
        },
        {
          id: 2,
          name: "Antioquia",
          code: "ANT",
          countryId: 44,
        },
        {
          id: 3,
          name: "Arauca",
          code: "ARA",
          countryId: 44,
        },
        {
          id: 4,
          name: "Atlántico",
          code: "ATL",
          countryId: 44,
        },
        {
          id: 5,
          name: "Bolívar",
          code: "BOL",
          countryId: 44,
        },
        {
          id: 6,
          name: "Boyacá",
          code: "BOY",
          countryId: 44,
        },
        {
          id: 7,
          name: "Caldas",
          code: "CAL",
          countryId: 44,
        },
        {
          id: 8,
          name: "Caquetá",
          code: "CAQ",
          countryId: 44,
        },
        {
          id: 9,
          name: "Casanare",
          code: "CAS",
          countryId: 44,
        },
        {
          id: 10,
          name: "Cauca",
          code: "CAU",
          countryId: 44,
        },
        {
          id: 11,
          name: "Cesar",
          code: "CES",
          countryId: 44,
        },
        {
          id: 12,
          name: "Chocó",
          code: "CHO",
          countryId: 44,
        },
        {
          id: 13,
          name: "Cundinamarca",
          code: "CUN",
          countryId: 44,
        },
        {
          id: 14,
          name: "Córdoba",
          code: "COR",
          countryId: 44,
        },
        {
          id: 15,
          name: "Guainía",
          code: "GUA",
          countryId: 44,
        },
        {
          id: 16,
          name: "Guaviare",
          code: "GUV",
          countryId: 44,
        },
        {
          id: 17,
          name: "Huila",
          code: "HUI",
          countryId: 44,
        },
        {
          id: 18,
          name: "La Guajira",
          code: "LAG",
          countryId: 44,
        },
        {
          id: 19,
          name: "Magdalena",
          code: "MAG",
          countryId: 44,
        },
        {
          id: 20,
          name: "Meta",
          code: "MET",
          countryId: 44,
        },
        {
          id: 21,
          name: "Nariño",
          code: "NAR",
          countryId: 44,
        },
        {
          id: 22,
          name: "Norte de Santander",
          code: "NSA",
          countryId: 44,
        },
        {
          id: 23,
          name: "Putumayo",
          code: "PUT",
          countryId: 44,
        },
        {
          id: 24,
          name: "Quindío",
          code: "QUI",
          countryId: 44,
        },
        {
          id: 25,
          name: "Risaralda",
          code: "RIS",
          countryId: 44,
        },
        {
          id: 26,
          name: "San Andrés y Providencia",
          code: "SAP",
          countryId: 44,
        },
        {
          id: 27,
          name: "Santander",
          code: "SAN",
          countryId: 44,
        },
        {
          id: 28,
          name: "Sucre",
          code: "SUC",
          countryId: 44,
        },
        {
          id: 29,
          name: "Tolima",
          code: "TOL",
          countryId: 44,
        },
        {
          id: 30,
          name: "Valle del Cauca",
          code: "VAC",
          countryId: 44,
        },
        {
          id: 31,
          name: "Vaupés",
          code: "VAU",
          countryId: 44,
        },
        {
          id: 32,
          name: "Vichada",
          code: "VID",
          countryId: 44,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("States", null, {});
  },
};

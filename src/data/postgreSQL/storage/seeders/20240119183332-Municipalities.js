"use strict";
const departaments = require("./departaments.json");
const municipalities = [];

let cont = 0;
for (let key in departaments) {
  municipalities.push(
    ...departaments[key].municipalities.map((m) => {
      cont++;
      return {
        name: m,
        code: `MN${cont}`,
        stateId: departaments[key].id,
      };
    })
  );
}

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert("Municipalities", municipalities, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Municipalities", null, {});
  },
};

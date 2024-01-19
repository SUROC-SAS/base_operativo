"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Addresses", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      postalCode: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      stateName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      municipalityId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          key: "id",
          model: "Municipalities",
        },
      },
      stateId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          key: "id",
          model: "States",
        },
      },
      countryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          key: "id",
          model: "Countries",
        },
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          key: "id",
          model: "Users",
        },
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null,
      },
    });
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable("Addresses");
  },
};

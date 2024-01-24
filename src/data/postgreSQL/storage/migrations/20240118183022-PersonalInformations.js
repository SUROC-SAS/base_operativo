"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("PersonalInformations", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      firstName: {
        type: Sequelize.TEXT,
        allowNull: true,
        defaultValue: null,
      },
      middleName: {
        type: Sequelize.TEXT,
        allowNull: true,
        defaultValue: null,
      },
      firstSurname: {
        type: Sequelize.TEXT,
        allowNull: true,
        defaultValue: null,
      },
      secondSurname: {
        type: Sequelize.TEXT,
        allowNull: true,
        defaultValue: null,
      },
      businessName: {
        type: Sequelize.TEXT,
        allowNull: true,
        defaultValue: null,
      },
      documentNumber: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      dv: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
      },
      taxLiabilityId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          key: "id",
          model: "TaxLiabilities",
        },
      },
      identificationId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          key: "id",
          model: "Identifications",
        },
      },
      personTypeId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
        references: {
          key: "id",
          model: "PersonTypes",
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

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("PersonalInformations");
  },
};

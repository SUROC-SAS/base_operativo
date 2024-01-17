"use strict";
const { resolve } = require("path");
require("dotenv").config({ path: resolve(__dirname, "#/../", ".env") });

require("../../../../../build/index");
const User =
  require("../../../../../build/data/postgreSQL/models/user.model").default;
const Role =
  require("../../../../../build/data/postgreSQL/models/role.model").default;
const Address =
  require("../../../../../build/data/postgreSQL/models/address.model").default;
const AssignedRole =
  require("../../../../../build/data/postgreSQL/models/assigned-role.model").default;
const PersonType =
  require("../../../../../build/data/postgreSQL/models/person-type.model").default;
const ContactInformation =
  require("../../../../../build/data/postgreSQL/models/contact-information.model").default;
const Identificacion =
  require("../../../../../build/data/postgreSQL/models/identification.model").default;
const Municipality =
  require("../../../../../build/data/postgreSQL/models/municipality.model").default;
const PersonalInformation =
  require("../../../../../build/data/postgreSQL/models/personal-information.model").default;

const PersonTypeCodes =
  require("../../../../../build/domain/interfaces/personal-information.interface").PersonTypeCodes;
const IdentificationCodes =
  require("../../../../../build/domain/interfaces/identification.interface").IdentificationCodes;
const RoleCodes =
  require("../../../../../build/domain/interfaces/role.interface").RolesCodes;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let email = "";
    let password = "";

    if (process.env.NODE_ENV === "local") {
      email = "juanbetan93@gmail.com";
      password = "231293Jd!";
    } else {
      email = `${process.env.ADMIN_EMAIL}`;
      password = `${process.env.ADMIN_PASSWORD}`;
    }

    const role = await Role.findOne({
      where: {
        code: RoleCodes.GERENCIA,
      },
    });

    const [userInstance] = await User.findOrCreate({
      where: {
        email,
      },
      defaults: {
        email,
        password,
        emailValidate: true,
      },
      hooks: false,
    });

    await userInstance.update({ uid: `US${userInstance.id + 1000}` });
    await AssignedRole.bulkCreate([
      {
        userId: userInstance.id,
        roleId: role.id,
      },
    ]);

    if (process.env.NODE_ENV === "prod") {
      const identification = await Identificacion.findOne({
        where: {
          code: IdentificationCodes["CEDULA"],
        },
      });

      const personType = await PersonType.findOne({
        where: {
          code: PersonTypeCodes["PERSONA_NATURAL"],
        },
      });

      const name = process.env.ADMIN_NAMES.split("|");
      await PersonalInformation.create({
        firstName: name[0],
        middleName: name[1],
        firstSurname: name[2],
        secondSurname: name[3],
        documentNumber: process.env.ADMIN_DOCUMENT,
        documentTypeId: identification.id,
        personTypeId: personType.id,
        userId: userInstance.id,
      });

      const municipality = await Municipality.findOne({
        where: {
          code: "MN1065",
        },
        include: [
          {
            association: "state",
            include: [
              {
                association: "country",
              },
            ],
          },
        ],
      });

      await Address.create({
        address: "VALLE DEL CAUCA",
        postalCode: "760001",
        municipalityId: municipality.id,
        stateId: municipality.stateId,
        countryId: municipality.state.countryId,
        userId: userInstance.id,
      });

      await ContactInformation.create({
        mobile: process.env.ADMIN_DOCUMENT,
        phoneOne: process.env.ADMIN_DOCUMENT,
        userId: userInstance.id,
      });
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};

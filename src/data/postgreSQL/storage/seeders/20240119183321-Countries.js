"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Countries",
      [
        {
          name: "Afganistán",
          code: "AFG",
        },
        {
          name: "Albania",
          code: "ALB",
        },
        {
          name: "Alemania",
          code: "DEU",
        },
        {
          name: "Andorra",
          code: "AND",
        },
        {
          name: "Angola",
          code: "AGO",
        },
        {
          name: "Anguila",
          code: "AIA",
        },
        {
          name: "Antártida",
          code: "ATA",
        },
        {
          name: "Antigua y Barbuda",
          code: "ATG",
        },
        {
          name: "Arabia Saudita",
          code: "SAU",
        },
        {
          name: "Argelia",
          code: "DZA",
        },
        {
          name: "Argentina",
          code: "ARG",
        },
        {
          name: "Armenia",
          code: "ARM",
        },
        {
          name: "Aruba",
          code: "ABW",
        },
        {
          name: "Australia",
          code: "AUS",
        },
        {
          name: "Austria",
          code: "AUT",
        },
        {
          name: "Azerbaiyán",
          code: "AZE",
        },
        {
          name: "Bélgica",
          code: "BEL",
        },
        {
          name: "Bahamas",
          code: "BHS",
        },
        {
          name: "Bahrein",
          code: "BHR",
        },
        {
          name: "Bangladesh",
          code: "BGD",
        },
        {
          name: "Barbados",
          code: "BRB",
        },
        {
          name: "Belice",
          code: "BLZ",
        },
        {
          name: "Benín",
          code: "BEN",
        },
        {
          name: "Bhután",
          code: "BTN",
        },
        {
          name: "Bielorrusia",
          code: "BLR",
        },
        {
          name: "Birmania",
          code: "MMR",
        },
        {
          name: "Bolivia",
          code: "BOL",
        },
        {
          name: "Bosnia y Herzegovina",
          code: "BIH",
        },
        {
          name: "Botsuana",
          code: "BWA",
        },
        {
          name: "Brasil",
          code: "BRA",
        },
        {
          name: "Brunéi",
          code: "BRN",
        },
        {
          name: "Bulgaria",
          code: "BGR",
        },
        {
          name: "Burkina Faso",
          code: "BFA",
        },
        {
          name: "Burundi",
          code: "BDI",
        },
        {
          name: "Cabo Verde",
          code: "CPV",
        },
        {
          name: "Camboya",
          code: "KHM",
        },
        {
          name: "Camerún",
          code: "CMR",
        },
        {
          name: "Canadá",
          code: "CAN",
        },
        {
          name: "Chad",
          code: "TCD",
        },
        {
          name: "Chile",
          code: "CHL",
        },
        {
          name: "China",
          code: "CHN",
        },
        {
          name: "Chipre",
          code: "CYP",
        },
        {
          name: "Ciudad del Vaticano",
          code: "VAT",
        },
        {
          name: "Colombia",
          code: "COL",
        },
        {
          name: "Comoras",
          code: "COM",
        },
        {
          name: "República del Congo",
          code: "COG",
        },
        {
          name: "República Democrática del Congo",
          code: "COD",
        },
        {
          name: "Corea del Norte",
          code: "PRK",
        },
        {
          name: "Corea del Sur",
          code: "KOR",
        },
        {
          name: "Costa de Marfil",
          code: "CIV",
        },
        {
          name: "Costa Rica",
          code: "CRI",
        },
        {
          name: "Croacia",
          code: "HRV",
        },
        {
          name: "Cuba",
          code: "CUB",
        },
        {
          name: "Curazao",
          code: "CWU",
        },
        {
          name: "Dinamarca",
          code: "DNK",
        },
        {
          name: "Dominica",
          code: "DMA",
        },
        {
          name: "Ecuador",
          code: "ECU",
        },
        {
          name: "Egipto",
          code: "EGY",
        },
        {
          name: "El Salvador",
          code: "SLV",
        },
        {
          name: "Emiratos Ãrabes Unidos",
          code: "ARE",
        },
        {
          name: "Eritrea",
          code: "ERI",
        },
        {
          name: "Eslovaquia",
          code: "SVK",
        },
        {
          name: "Eslovenia",
          code: "SVN",
        },
        {
          name: "EspaÃ±a",
          code: "ESP",
        },
        {
          name: "Estados Unidos de América",
          code: "USA",
        },
        {
          name: "Estonia",
          code: "EST",
        },
        {
          name: "Etiopía",
          code: "ETH",
        },
        {
          name: "Filipinas",
          code: "PHL",
        },
        {
          name: "Finlandia",
          code: "FIN",
        },
        {
          name: "Fiyi",
          code: "FJI",
        },
        {
          name: "Francia",
          code: "FRA",
        },
        {
          name: "Gabón",
          code: "GAB",
        },
        {
          name: "Gambia",
          code: "GMB",
        },
        {
          name: "Georgia",
          code: "GEO",
        },
        {
          name: "Ghana",
          code: "GHA",
        },
        {
          name: "Gibraltar",
          code: "GIB",
        },
        {
          name: "Granada",
          code: "GRD",
        },
        {
          name: "Grecia",
          code: "GRC",
        },
        {
          name: "Groenlandia",
          code: "GRL",
        },
        {
          name: "Guadalupe",
          code: "GLP",
        },
        {
          name: "Guam",
          code: "GUM",
        },
        {
          name: "Guatemala",
          code: "GTM",
        },
        {
          name: "Guayana Francesa",
          code: "GUF",
        },
        {
          name: "Guernsey",
          code: "GGY",
        },
        {
          name: "Guinea",
          code: "GIN",
        },
        {
          name: "Guinea Ecuatorial",
          code: "GNQ",
        },
        {
          name: "Guinea-Bissau",
          code: "GNB",
        },
        {
          name: "Guyana",
          code: "GUY",
        },
        {
          name: "Haití",
          code: "HTI",
        },
        {
          name: "Honduras",
          code: "HND",
        },
        {
          name: "Hong kong",
          code: "HKG",
        },
        {
          name: "Hungría",
          code: "HUN",
        },
        {
          name: "India",
          code: "IND",
        },
        {
          name: "Indonesia",
          code: "IDN",
        },
        {
          name: "Irán",
          code: "IRN",
        },
        {
          name: "Irak",
          code: "IRQ",
        },
        {
          name: "Irlanda",
          code: "IRL",
        },
        {
          name: "Isla Bouvet",
          code: "BVT",
        },
        {
          name: "Isla de Man",
          code: "IMN",
        },
        {
          name: "Isla de Navidad",
          code: "CXR",
        },
        {
          name: "Isla Norfolk",
          code: "NFK",
        },
        {
          name: "Islandia",
          code: "ISL",
        },
        {
          name: "Islas Bermudas",
          code: "BMU",
        },
        {
          name: "Islas Caimán",
          code: "CYM",
        },
        {
          name: "Islas Cocos (Keeling)",
          code: "CCK",
        },
        {
          name: "Islas Cook",
          code: "COK",
        },
        {
          name: "Islas de Ã…land",
          code: "ALA",
        },
        {
          name: "Islas Feroe",
          code: "FRO",
        },
        {
          name: "Islas Georgias del Sur y Sandwich del Sur",
          code: "SGS",
        },
        {
          name: "Islas Heard y McDonald",
          code: "HMD",
        },
        {
          name: "Islas Maldivas",
          code: "MDV",
        },
        {
          name: "Islas Malvinas",
          code: "FLK",
        },
        {
          name: "Islas Marianas del Norte",
          code: "MNP",
        },
        {
          name: "Islas Marshall",
          code: "MHL",
        },
        {
          name: "Islas Pitcairn",
          code: "PCN",
        },
        {
          name: "Islas Salomón",
          code: "SLB",
        },
        {
          name: "Islas Turcas y Caicos",
          code: "TCA",
        },
        {
          name: "Islas Ultramarinas Menores de Estados Unidos",
          code: "UMI",
        },
        {
          name: "Islas Vírgenes Británicas",
          code: "VGB",
        },
        {
          name: "Islas Vírgenes de los Estados Unidos",
          code: "VIR",
        },
        {
          name: "Israel",
          code: "ISR",
        },
        {
          name: "Italia",
          code: "ITA",
        },
        {
          name: "Jamaica",
          code: "JAM",
        },
        {
          name: "Japón",
          code: "JPN",
        },
        {
          name: "Jersey",
          code: "JEY",
        },
        {
          name: "Jordania",
          code: "JOR",
        },
        {
          name: "Kazajistán",
          code: "KAZ",
        },
        {
          name: "Kenia",
          code: "KEN",
        },
        {
          name: "Kirguistán",
          code: "KGZ",
        },
        {
          name: "Kiribati",
          code: "KIR",
        },
        {
          name: "Kuwait",
          code: "KWT",
        },
        {
          name: "Líbano",
          code: "LBN",
        },
        {
          name: "Laos",
          code: "LAO",
        },
        {
          name: "Lesoto",
          code: "LSO",
        },
        {
          name: "Letonia",
          code: "LVA",
        },
        {
          name: "Liberia",
          code: "LBR",
        },
        {
          name: "Libia",
          code: "LBY",
        },
        {
          name: "Liechtenstein",
          code: "LIE",
        },
        {
          name: "Lituania",
          code: "LTU",
        },
        {
          name: "Luxemburgo",
          code: "LUX",
        },
        {
          name: "México",
          code: "MEX",
        },
        {
          name: "Mónaco",
          code: "MCO",
        },
        {
          name: "Macao",
          code: "MAC",
        },
        {
          name: "Macedónia",
          code: "MKD",
        },
        {
          name: "Madagascar",
          code: "MDG",
        },
        {
          name: "Malasia",
          code: "MYS",
        },
        {
          name: "Malawi",
          code: "MWI",
        },
        {
          name: "Mali",
          code: "MLI",
        },
        {
          name: "Malta",
          code: "MLT",
        },
        {
          name: "Marruecos",
          code: "MAR",
        },
        {
          name: "Martinica",
          code: "MTQ",
        },
        {
          name: "Mauricio",
          code: "MUS",
        },
        {
          name: "Mauritania",
          code: "MRT",
        },
        {
          name: "Mayotte",
          code: "MYT",
        },
        {
          name: "Micronesia",
          code: "FSM",
        },
        {
          name: "Moldavia",
          code: "MDA",
        },
        {
          name: "Mongolia",
          code: "MNG",
        },
        {
          name: "Montenegro",
          code: "MNE",
        },
        {
          name: "Montserrat",
          code: "MSR",
        },
        {
          name: "Mozambique",
          code: "MOZ",
        },
        {
          name: "Namibia",
          code: "NAM",
        },
        {
          name: "Nauru",
          code: "NRU",
        },
        {
          name: "Nepal",
          code: "NPL",
        },
        {
          name: "Nicaragua",
          code: "NIC",
        },
        {
          name: "Niger",
          code: "NER",
        },
        {
          name: "Nigeria",
          code: "NGA",
        },
        {
          name: "Niue",
          code: "NIU",
        },
        {
          name: "Noruega",
          code: "NOR",
        },
        {
          name: "Nueva Caledonia",
          code: "NCL",
        },
        {
          name: "Nueva Zelanda",
          code: "NZL",
        },
        {
          name: "Omán",
          code: "OMN",
        },
        {
          name: "Países Bajos",
          code: "NLD",
        },
        {
          name: "Pakistán",
          code: "PAK",
        },
        {
          name: "Palau",
          code: "PLW",
        },
        {
          name: "Palestina",
          code: "PSE",
        },
        {
          name: "Panamá",
          code: "PAN",
        },
        {
          name: "Papúa Nueva Guinea",
          code: "PNG",
        },
        {
          name: "Paraguay",
          code: "PRY",
        },
        {
          name: "Perú",
          code: "PER",
        },
        {
          name: "Polinesia Francesa",
          code: "PYF",
        },
        {
          name: "Polonia",
          code: "POL",
        },
        {
          name: "Portugal",
          code: "PRT",
        },
        {
          name: "Puerto Rico",
          code: "PRI",
        },
        {
          name: "Qatar",
          code: "QAT",
        },
        {
          name: "Reino Unido",
          code: "GBR",
        },
        {
          name: "República Centroafricana",
          code: "CAF",
        },
        {
          name: "República Checa",
          code: "CZE",
        },
        {
          name: "República Dominicana",
          code: "DOM",
        },
        {
          name: "República de Sudán del Sur",
          code: "SSD",
        },
        {
          name: "Reunión",
          code: "REU",
        },
        {
          name: "Ruanda",
          code: "RWA",
        },
        {
          name: "Rumanía",
          code: "ROU",
        },
        {
          name: "Rusia",
          code: "RUS",
        },
        {
          name: "Sahara Occidental",
          code: "ESH",
        },
        {
          name: "Samoa",
          code: "WSM",
        },
        {
          name: "Samoa Americana",
          code: "ASM",
        },
        {
          name: "San Bartolomé",
          code: "BLM",
        },
        {
          name: "San Cristóbal y Nieves",
          code: "KNA",
        },
        {
          name: "San Marino",
          code: "SMR",
        },
        {
          name: "San Martín (Francia)",
          code: "MAF",
        },
        {
          name: "San Pedro y Miquelón",
          code: "SPM",
        },
        {
          name: "San Vicente y las Granadinas",
          code: "VCT",
        },
        {
          name: "Santa Elena",
          code: "SHN",
        },
        {
          name: "Santa Lucía",
          code: "LCA",
        },
        {
          name: "Santo Tomé y Príncipe",
          code: "STP",
        },
        {
          name: "Senegal",
          code: "SEN",
        },
        {
          name: "Serbia",
          code: "SRB",
        },
        {
          name: "Seychelles",
          code: "SYC",
        },
        {
          name: "Sierra Leona",
          code: "SLE",
        },
        {
          name: "Singapur",
          code: "SGP",
        },
        {
          name: "Sint Maarten",
          code: "SMX",
        },
        {
          name: "Siria",
          code: "SYR",
        },
        {
          name: "Somalia",
          code: "SOM",
        },
        {
          name: "Sri lanka",
          code: "LKA",
        },
        {
          name: "Sudáfrica",
          code: "ZAF",
        },
        {
          name: "Sudán",
          code: "SDN",
        },
        {
          name: "Suecia",
          code: "SWE",
        },
        {
          name: "Suiza",
          code: "CHE",
        },
        {
          name: "Surinám",
          code: "SUR",
        },
        {
          name: "Svalbard y Jan Mayen",
          code: "SJM",
        },
        {
          name: "Swazilandia",
          code: "SWZ",
        },
        {
          name: "Tayikistán",
          code: "TJK",
        },
        {
          name: "Tailandia",
          code: "THA",
        },
        {
          name: "Taiwán",
          code: "TWN",
        },
        {
          name: "Tanzania",
          code: "TZA",
        },
        {
          name: "Territorio Británico del Océano Ãndico",
          code: "IOT",
        },
        {
          name: "Territorios Australes y Antárticas Franceses",
          code: "ATF",
        },
        {
          name: "Timor Oriental",
          code: "TLS",
        },
        {
          name: "Togo",
          code: "TGO",
        },
        {
          name: "Tokelau",
          code: "TKL",
        },
        {
          name: "Tonga",
          code: "TON",
        },
        {
          name: "Trinidad y Tobago",
          code: "TTO",
        },
        {
          name: "Tunez",
          code: "TUN",
        },
        {
          name: "Turkmenistán",
          code: "TKM",
        },
        {
          name: "Turquía",
          code: "TUR",
        },
        {
          name: "Tuvalu",
          code: "TUV",
        },
        {
          name: "Ucrania",
          code: "UKR",
        },
        {
          name: "Uganda",
          code: "UGA",
        },
        {
          name: "Uruguay",
          code: "URY",
        },
        {
          name: "Uzbekistán",
          code: "UZB",
        },
        {
          name: "Vanuatu",
          code: "VUT",
        },
        {
          name: "Venezuela",
          code: "VEN",
        },
        {
          name: "Vietnam",
          code: "VNM",
        },
        {
          name: "Wallis y Futuna",
          code: "WLF",
        },
        {
          name: "Yemen",
          code: "YEM",
        },
        {
          name: "Yibuti",
          code: "DJI",
        },
        {
          name: "Zambia",
          code: "ZMB",
        },
        {
          name: "Zimbabue",
          code: "ZWE",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Countries", null, {});
  },
};

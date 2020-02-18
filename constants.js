const REGEX_NUMBER = /^\d*\.?\d*\.?\d*/;
const REGEX_TEXT = / [A-Z]*/;
const SEARCH_FIELDS = {
    ROOMS: 'Nr. camere',
    UTIL_SURFACE: 'Suprafaţă utilă',
    BUILD_SURFACE: 'Suprafaţă construită',
    PARTITIONED: 'Compartimentare',
    CONFORT: 'Confort',
    FLOOR: 'Etaj',
    KITCHENS: 'Nr. bucătării',
    BATHROOMS: 'Nr. băi',
    BUILD_YEAR: 'An construcţie',
    REAL_ESTATE_TYPE: 'Tip imobil',
    HEIGHT_LEVEL: 'Regim înălţime'
};

module.exports = { REGEX_NUMBER, REGEX_TEXT, SEARCH_FIELDS };

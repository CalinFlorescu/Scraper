const {
  REGEX_NUMBER: regexNumber,
  REGEX_TEXT: regexText,
  SEARCH_FIELDS: fields
} = require("../constants");

/* Method that returns the price of the offer in this format */
/* 
    Price: {
        price_ron
        price_eur
        price_usd
    }
*/

const getPrice = $ => {
  var price = $(".pret.first.blue").text();

  const response = {};

  for (let i = 0; i < 3; i++) {
    if (price.length > 1) {
      const currency = price.match(regexText)[0];
      let priceString = price.match(regexNumber)[0];

      price = price.replace(priceString, "");
      price = price.replace(currency, "");

      priceString = priceString.replace(".", "");
      priceString = priceString.replace(".", "");

      if (currency === " RON") {
        response.price_ron = parseInt(priceString);
      } else if (currency === " EUR") {
        response.price_eur = parseInt(priceString);
      } else if (currency === " USD") {
        response.price_usd = parseInt(priceString);
      }
    }
  }

  return response;
};

/* Method that returns the location of the offer */

const getLocation = $ => {
  const location = $(".active > a > span").text();

  return location;
};

const getDetails = $ => {
  const list = $(".lista-tabelara").children();

  const response = {};

  list.toArray().map(element => {
    if ($(element).text()) {
      const parsedString = $(element)
        .text()
        .split(":");

      if (parsedString[0] === fields.ROOMS) {
        response.numberOfRooms = parseInt(parsedString[1]);
      } else if (parsedString[0] === fields.UTIL_SURFACE) {
        const surface = parsedString[1].match(/^[0-9]*/);
        response.utilSurface = parseFloat(surface);
      } else if (parsedString[0] === fields.BUILD_SURFACE) {
        const surface = parsedString[1].match(/^[0-9]*/);
        response.buildSurface = parseFloat(surface);
      } else if (parsedString[0] === fields.PARTITIONED) {
        response.partitioned = parsedString[1];
      } else if (parsedString[0] === fields.CONFORT) {
        response.confort = parsedString[1];
      } else if (parsedString[0] === fields.FLOOR) {
        response.floor = parsedString[1];
      } else if (parsedString[0] === fields.KITCHENS) {
        response.kitchens = parseInt(parsedString[1]);
      } else if (parsedString[0] === fields.BATHROOMS) {
        response.bathrooms = parseInt(parsedString[1]);
      } else if (parsedString[0] === fields.BUILD_YEAR) {
        response.buildYear = parseInt(parsedString[1]);
      } else if (parsedString[0] === fields.REAL_ESTATE_TYPE) {
        response.realEstateType = parsedString[1];
      } else if (parsedString[0] === fields.HEIGHT_LEVEL) {
        response.heightRegime = parsedString[1];
      }
    }
  });

  return response;
};

module.exports = { getPrice, getLocation, getDetails };

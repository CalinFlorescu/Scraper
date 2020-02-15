const {
  REGEX_NUMBER: regexNumber,
  REGEX_TEXT: regexText
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
  const prices = [];
  const price = $(".pret.first.blue").text();

  prices.push(price.slice(0, 11));
  prices.push(price.slice(11, 23));
  prices.push(price.slice(22, 33));

  const response = {};
  prices.forEach(price => {
    const currency = price.match(regexText)[0];
    let priceString = price.match(regexNumber)[0];
    priceString = priceString.replace(".", "");

    if (currency === " RON") {
      response.price_ron = parseInt(priceString);
    } else if (currency === " EUR") {
      response.price_eur = parseInt(priceString);
    } else if (currency === " USD") {
      response.price_usd = parseInt(priceString);
    }
  });

  return response;
};

module.exports = { getPrice };

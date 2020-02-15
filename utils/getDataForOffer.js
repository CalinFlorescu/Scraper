const getLinks = require("./getIndividualLinks");
const request = require("request-promise");
const cheerio = require("cheerio");
const {
  getPrice,
  getLocation,
  getDetails
} = require("../helpers/dataParsersForOffers");

// Announce object view model
/*
 - Price
    - price_eur
    - price_ron
    - price_usd
 - Nr. of rooms
 - Build surface
 - Util surface
 - Partitioned
 - Floor 
 - Build Year
 - Balconies
 - Real Estate Type
 - Height Regime
 - Bathrooms
 - Kitchens
 - Location
*/

const offers = [];

const getOffers = async () => {
  const links = await getLinks();

  links.forEach(async link => {
    const offer = await request({
      method: "GET",
      url: link
    }).then(body => {
      const $ = cheerio.load(body);

      try {
        const price = getPrice($);
        const location = getLocation($);
        const details = getDetails($);

        return { price, location, ...details };
      } catch (err) {
        console.error(err);
      }
    });

    offers.push(offer);
    console.log(offer);
  });

  return offers;
};

getOffers();

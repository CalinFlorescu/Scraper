const {getAllLinks} = require("./getIndividualLinks");
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
  const links = await getAllLinks();

  for(const link of links) {
      try {
        const body = await request({
          method: "GET",
          url: link
        });

        const $ = cheerio.load(body);
        const price = getPrice($);
        const location = getLocation($);
        const details = getDetails($);

        offers.push({price, location, ...details});
      } catch (err) {
        console.error(err);
      }
  }

  return offers;
};

getOffers().then(() => console.log(resp));

module.exports = getOffers;
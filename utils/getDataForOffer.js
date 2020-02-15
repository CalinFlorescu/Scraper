const getLinks = require("./getIndividualLinks");
const request = require("requrest-promise");
const cheerio = require("cheerio");

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

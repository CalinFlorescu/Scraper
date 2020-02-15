const request = require("request-promise");
const cheerio = require("cheerio");
const { BASE_URL: baseUrl } = require("../config");

const announces = [];

const getNumberOfPages = async () => {
  return request({
    method: "GET",
    url: baseUrl
  }).then(body => {
    let $ = cheerio.load(body);

    const numberOfPages = $(".butonpaginare:nth-child(7)").attr("data-pagina");

    return numberOfPages;
  });
};

const getLinks = async url => {
  return request({
    method: "GET",
    url: url
  }).then(body => {
    let $ = cheerio.load(body);

    $(".border-box h2 a").each((index, element) => {
      const individualLink = $(element).attr("href");
      announces.push(individualLink);
    });

    return announces;
  });
};

const getAllLinks = async () => {
  const pages = await getNumberOfPages();

  for (let i = 1; i < pages + 1; i++) {
    if (i === 1) {
      await getLinks(baseUrl);
    } else {
      const specificUrl = `${baseUrl}/?pagina=${i}`;
      await getLinks(specificUrl);
    }
  }

  return announces;
};

module.exports = getAllLinks;

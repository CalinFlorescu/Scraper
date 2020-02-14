const request = require('request-promise');
const cheerio = require('cheerio');
const {BASE_URL: baseUrl, NUMBER_OF_PAGES: pages} = require('../config');

const announces = [];

const getLinks = async (url) => {
    return request({
        method: 'GET',
        url: url
    }).then(body => {
        let $ = cheerio.load(body);

        $('.border-box h2 a').each((index, element) => {
            const individualLink = $(element).attr('href');
            announces.push(individualLink);
        });

        return announces;
    });
};

const getAllLinks = async () => {
    for(let i = 1; i < pages + 1; i++) {
        if(i === 1) {
            await getLinks(baseUrl);
        } else {
            const specificUrl = `${baseUrl}/?pagina=${i}`;
            await getLinks(specificUrl);
        }
    }

    return announces;
};

getAllLinks().then(resp => console.log(resp));





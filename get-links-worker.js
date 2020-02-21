const amqp = require('amqplib/callback_api');
const {getLinks} = require('./utils/getIndividualLinks');
const getOffers = require('./utils/getDataForOffer');

const linkList = [];

amqp.connect('amqp://localhost', (errorZero, connection) => {
    if (errorZero) {
        throw errorZero;
    }

    connection.createChannel((errorOne, channel) => {
      if(errorOne) {
          throw errorOne;
      }

      const queue = 'links';

      channel.assertQueue(queue, {
          durable: false
      });

        const detailsQueue = 'details';

        channel.assertQueue(detailsQueue, {
            durable: false
        });

      channel.consume(queue, async (msg) => {
          try {
              let links = await getLinks(msg.content.toString());

              links.forEach((link) => {
                  channel.sendToQueue(detailsQueue, Buffer.from(link));
              });

              links.length = 0;
          } catch (err) {
              console.log(`Error Here ${err.message}`);
          }

      }, {
          noAck: true
      })
    });
});
const amqp = require('amqplib/callback_api');
const {getLinks} = require('./utils/getIndividualLinks');

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

      channel.consume(queue, async (msg) => {
          // console.log(`[x] received ${msg.content.toString()}`);

          console.log(await getLinks(msg.content.toString()));
      }, {
          noAck: true
      })
    });

    setTimeout(() => {
        connection.close()
    }, 5000);
});
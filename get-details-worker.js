const amqp = require('amqplib/callback_api');
const getOffers = require('./utils/getDataForOffer');

const offers = [];

amqp.connect('amqp://localhost', (errorZero, connection) => {
    if (errorZero) {
        throw errorZero;
    }

    connection.createChannel((errorOne, channel) => {
        if(errorOne) {
            throw errorOne;
        }

        const queue = 'details';

        channel.assertQueue(queue, {
            durable: false
        });

        channel.consume(queue, async (msg) => {
            // console.log(`[x] received ${msg.content.toString()}`);
            try {
                const offer = await getOffers(msg.content.toString());
                // console.log(msg.content.toString());
            } catch (err) {
                console.log('Error here');
            }

            // offers.push(offer);

            // console.log(offer);
        }, {
            noAck: true
        })
    });
});
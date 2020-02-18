const amqp = require('amqplib/callback_api');
const { BASE_URL: baseUrl } = require("./config");

amqp.connect('amqp://localhost', (errorZero, connection) => {
   if (errorZero) {
       throw errorZero;
   }

   connection.createChannel((errorOne, channel) => {
       if (errorOne) {
           throw errorOne;
       }

       const queue = 'links';
       const msg = baseUrl;

       channel.assertQueue(queue, {
           durable: false
       });

       for(let i = 1; i < 286; i++) {
           if (i === 1) {
               channel.sendToQueue(queue, Buffer.from(msg));
               console.log(`[x] sent ${msg}`);
           }
           channel.sendToQueue(queue, Buffer.from(`${msg}/?pagina=${i}`));
           console.log(`[x] sent ${msg}`);
       }
   });

   setTimeout(() => {
       connection.close();
       process.exit(0);
   }, 500);
});
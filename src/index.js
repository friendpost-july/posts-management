import express from 'express';
import bodyParser from 'body-parser';
import { dbInit } from './dbInit.js';
import postsRoute from './routes/posts.route.js';
import { createCounterCollection } from './helper/common.js';
import { searchRouter } from './routes/posts.search.route.js';
import amqp from 'amqplib';
//const amqp = require('amqplib');

const app = express();
const port = process.env.LISTEN_PORT || 8080;

// RabbitMQ configuration
const rabbitMqUrl = process.env.RABBITMQ_URL || 'amqp://user:password@localhost'; // Replace with your RabbitMQ server URL
const exchangeName = process.env.RABBITMQ_EXCHANGE_NAME || '';
//const storedMessages = [];
// Connect to RabbitMQ and start listening
async function listenToRabbitMQ() {
  try {
    console.log("RABBITMQ_URL",rabbitMqUrl)
    console.log("RABBITMQ_EXCHANGE_NAME",exchangeName)
    const connection = await amqp.connect(rabbitMqUrl);
    const channel = await connection.createChannel();

    await channel.assertExchange(exchangeName, 'fanout', { durable: false });
    const queue = await channel.assertQueue('', { exclusive: true });
    await channel.bindQueue(queue.queue, exchangeName, '');

    channel.consume(queue.queue, (msg) => {
      // Write stuff to react to receiving the event
      const message = msg.content.toString();
      console.log('Received message:', message);
      //storedMessages.push(message);
    }, { noAck: true });

    console.log('Listening for messages on exchange:', exchangeName);
  } catch (error) {
    console.error('Error connecting to RabbitMQ:', error);
  }
}

// Middleware
app.use(bodyParser.json());
dbInit(); //Initializing DB
//creating counter collection
createCounterCollection();
//Create a post
app.use('/v1/posts', postsRoute);

app.use('/v1/searchposts', searchRouter);

listenToRabbitMQ().then(() => {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
});

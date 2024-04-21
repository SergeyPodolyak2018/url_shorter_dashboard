const { createClient } = require('redis');
const { REDIS_HOST, REDIS_PORT } = require('../const');
console.log(REDIS_HOST, REDIS_PORT);
const client = createClient({
  host: REDIS_HOST,
  port: REDIS_PORT,
});

client.on('error', (err) => console.log('Redis Client Error', err));

client.connect();

module.exports = client;

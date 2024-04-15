const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const PORT = process.env['PORT'];
const BASE_URI = process.env['BASE_URI'] || '';
const ACCESS_TOKEN_SECRET = process.env['ACCESS_TOKEN_SECRET'] || '';
const USER_RATE = process.env['USER_RATE']
  ? Number(process.env['USER_RATE'])
  : 1000;
const URL_RATE = process.env['URL_RATE']
  ? Number(process.env['URL_RATE'])
  : 100;

module.exports = { PORT, BASE_URI, ACCESS_TOKEN_SECRET, USER_RATE, URL_RATE };

const jwt = require('jsonwebtoken');

const payload = { id: 1234567, username: 'Larson' };

require('dotenv').config();
const secret = process.env.SECRET;
// const secret = 'secret word';
const token = jwt.sign(payload, secret);

// console.log(token);

const decode = jwt.decode(token);
console.log(decode);

const verify = jwt.verify(token, secret);
console.log(verify);


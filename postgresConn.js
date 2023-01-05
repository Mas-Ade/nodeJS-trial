
const { Client } = require('pg')

const client = new Client({
host: 'localhost',
port: 5334,
user: 'database-user',
password: 'secretpassword!!',
});

module.exports = client ;

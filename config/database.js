const options = {
    client: 'mysql',
        connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'studentinfo'
    }
}
const knex = require('knex')(options);


module.exports = {knex}
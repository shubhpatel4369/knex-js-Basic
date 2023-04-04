const User = require("../config/database")

User.schema.createTable('users', (table) => {
    table.increments('id')
    table.string('username')
    table.varchar('password_hash')
   
}).then(() => console.log("table created"))
    .catch((err) => { console.log("table already exist");  })
    .finally(() => {
        User.destroy();
    });

module.exports = User 
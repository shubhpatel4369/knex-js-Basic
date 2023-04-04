const mysql = require("mysql")
const Sequelize = require("sequelize")




const sequelize = new Sequelize('user_Id', 'user_name', 'user_email', {
    host: 'localhost',
    dialect: 'mysql'
  });
  
  const user = sequelize.define('user', {
    userId: {
        type: Sequelize.INTEGER,
      },
    username: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING
    },
    token : {
      type:Sequelize.STRING
    }

})

user.findAll().then(users => {
    console.log("All users:", JSON.stringify(users, null, 4));
});

module.exports = user 

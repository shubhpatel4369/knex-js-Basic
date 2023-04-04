const express = require("express")
const router = express.Router()
const User = require("../config/database")
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")

router.post("/users", ( request, response ) => {

    let jwtSecretKey = process.env.JWT_SECRET_KEY || fgadjhfbvvbhkjhfek

    const user  = request.body
   
    bcrypt.hash(user.password_hash, 12)
    const token = jwt.sign(jwtSecretKey)
        .then(hashed_password => {
           return User("user1")
                .insert({
                    username: user.username,
                    password_hash: hashed_password
                }) 
                .returning("*")
                .then(users => {
                    const user = users[0]
                    response.send(user,token)
                    response.json({ user })
                }).catch(error => {
                    response.json({ error: error.message })
                })
        })
})


// router.post("/login", ( request, response ) => {
//     const { user } = request.body
//     database("users")
//         .where({username: user.username })
//         .first()
//         .then(retrievedUser => {
//             if(!retrievedUser) throw new Error("user not found!")
//             return Promise.all([
//                 bcrypt.compare(user.password, retrievedUser.password),
//                 Promise.resolve(retrievedUser)
//             ]).then(results => {
//                 const areSamePasswords = results[0]
//                 if(!areSamePasswords) throw new Error("wrong Password!")
//                 const user = results[1]
//                 const payload = {username: user.username}
//                 const secret =  "SECRET"
//                 jwt.sign(payload, secret, (error, token) => {
//                     if(error) throw new Error("Sign in error!")
//                     response.json({token, user})
//                 }).catch(error => {
//                     response.json({message: error.message})
//                 })
//             })
//         })
// })


module.exports = router

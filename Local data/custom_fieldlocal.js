const express = require('express')
const router = express.Router()
const knex = require("../config/database")

router.get('/local/cf',(req,res)=>{


    knex.from('bigcommerce').select("*").then((rows)=>{
      // res.send(res.data)
      return res.json(rows);
    })
    .catch((err)=>{
      console.log(err);
      // return res.json({success : false,message:"sww"})
    })
  })
  
  router.get("/local/cf/:id",(req,res)=>{
    let Id=req.params.id
  // knex.select('*').from('bigcommerce').where({'id':Id})
    knex('bigcommerce').where({'id':Id}).first()
    .then((results)=>{ 
  
      // console.log(results)
      res.send(results)
      // return knex('bigcommerce').where({'id':Id}).first()
  }).catch((err)=>{
    console.log(err); 
    res.send(err)
  })
  })
  
  router.post("/locals/cf",(req,res)=>{
    knex.from('bigcommerce').insert(req.body).then((res) => {
      res.send(res.data)
      console.log("data inserted")})
    .catch((err)=>{console.log(err); })
  })
  
  router.delete("/locals/cf/:id",(req,res)=>{
    knex('bigcommerce')
    .where({id: parseInt(req.params.id)})
    .del()
    .then((res)=>{
      res.json("data deleted")
      console.log("data deleted")
      // res.json('data deleted')
    }).catch((err) =>{res.send(err)})
  })
  
  router.put("/locals/cf/:id",(req,res)=>{
    knex('bigcommerce').where({id:parseInt(req.params.id)})
    .update(req.body)
    .then(()=>{res.send(res.data)})
  
  .catch(function (error) {console.error(error)})
  })
module.exports = router
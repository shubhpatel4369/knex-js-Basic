const express = require('express')
const router = express.Router()
const axios = require('axios')

router.get("/cs",(req,res)=>{

    var options = {
      method: 'GET',
      url: 'https://api.bigcommerce.com/stores/39n5p4x8ny/v3/catalog/categories',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-Auth-Token': 'arto2ufvjyt6h9ke178lkclrze8mq3e'
      }
    };
    
  
  axios.request(options).then(function (response) {
    // console.log(response.data);
    res.send(response.data)
  }).catch(function (error) {
    console.error(error);
  });
    
})

router.get("/cs/:id",(req,res)=>{
    let Id = req.params.id
    var values = {
      method: 'GET',
      url: `https://api.bigcommerce.com/stores/39n5p4x8ny/v3/catalog/categories/${Id}`,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-Auth-Token': 'arto2ufvjyt6h9ke178lkclrze8mq3e'
      },
    }
  
    axios.request(values).then(function (response) {
      // console.log(response.data);
      res.send(response.data)
    }).catch(function (error) {
      console.error(error);
    });
})
  
  
router.post("/cs",(req,res)=>{
    var values = {
      method: 'POST',
      url: 'https://api.bigcommerce.com/stores/39n5p4x8ny/v3/catalog/categories',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-Auth-Token': 'arto2ufvjyt6h9ke178lkclrze8mq3e'
      },
      data:req.body
    }
  
    axios.request(values).then(function (response) {
      // console.log(response.data);
      res.send(response.data)
    }).catch(function (error) {
      console.error(error);
    });
  
})
  
  
router.put("/cs/:id",(req,res)=>{
  
    let Id = req.params.id
    var values = {
      method: 'PUT',
      url: `https://api.bigcommerce.com/stores/39n5p4x8ny/v3/catalog/categories/${Id}`,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-Auth-Token': 'arto2ufvjyt6h9ke178lkclrze8mq3e'
      },
      data:req.body
    }
  
    axios.request(values).then(function (response) {
      // console.log(response.data);
      res.send(response.data)
    }).catch(function (error) {
      console.error(error);
    });
})
  
  
router.delete("/cs/:id",(req,res)=>{
    let Id = req.params.id
    var values = {
      method: 'DELETE',
      url: `https://api.bigcommerce.com/stores/39n5p4x8ny/v3/catalog/categories/${Id}`,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-Auth-Token': 'arto2ufvjyt6h9ke178lkclrze8mq3e'
      },
    }
  
    axios.request(values).then(function (response) {
      // console.log(response.data);
      res.json("data deleted")
    }).catch(function (error) {
      console.error(error);
    })
})

module.exports = router
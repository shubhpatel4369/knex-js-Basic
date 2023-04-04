const express = require('express')
const router = express.Router()
const axios = require('axios')

router.get("/pv",(req,res)=>{
    var options = {
      method: 'GET',
      url: 'https://api.bigcommerce.com/stores/39n5p4x8ny/v3/catalog/products/88/variants',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-Auth-Token': 'arto2ufvjyt6h9ke178lkclrze8mq3e'
      },
    }
    axios.request(options).then(function (response) {
      // console.log(response.data);
      res.send(response.data)
    }).catch(function (error) {
      console.error(error);
    });
  
})
  
router.get("/pv/:id",(req,res)=>{
    let Id = req.params.id
  
    var options = {
      method: 'GET',
      url: `https://api.bigcommerce.com/stores/39n5p4x8ny/v3/catalog/products/88/variants/${Id}`,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-Auth-Token': 'arto2ufvjyt6h9ke178lkclrze8mq3e'
      }
    };
    
    axios.request(options).then(function (response) {
    //   console.log(response.data);
    res.send(response.data)
    }).catch(function (error) {
      console.error(error);
    });
})
  
router.post("/po",(req,res)=>{
    var options = {
      method: 'POST',
      url: 'https://api.bigcommerce.com/stores/39n5p4x8ny/v3/catalog/products/88/variants',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-Auth-Token': 'arto2ufvjyt6h9ke178lkclrze8mq3e'
      },
      data: req.body
    };
    
    axios.request(options).then(function (response) {
      // console.log(response.data);
      res.send(response.data)
    }).catch(function (error) {
      console.error(error);
    });
})
  
router.put("/po/:id",(req,res)=>{
  
    let Id =req.params.id
  
    var options = {
      method: 'PUT',
      url: `https://api.bigcommerce.com/stores/39n5p4x8ny/v3/catalog/products/88/variants/${Id}`,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-Auth-Token': 'arto2ufvjyt6h9ke178lkclrze8mq3e'
      },
      data: req.body
    };
    
    axios.request(options).then(function (response) {
      // console.log(response.data);
      res.send(response.data)
    }).catch(function (error) {
      console.error(error);
    });
})
  
  
router.delete("/po/:id",(req,res)=>{
  
    let Id = req.params.id
  
    var options = {
      method: 'DELETE',
      url: `https://api.bigcommerce.com/stores/39n5p4x8ny/v3/catalog/products/88/variants/${Id}`,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-Auth-Token': 'arto2ufvjyt6h9ke178lkclrze8mq3e'
      }
    };
    
    axios.request(options).then(function (response) {
      // console.log(response.data);
      res.json("data deleted")
    }).catch(function (error) {
      console.error(error);
    });
})

  module.exports = router
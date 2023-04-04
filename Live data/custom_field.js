const express = require('express')
const router = express.Router()
const axios = require('axios')

router.get("/pcf",(req,res)=>{
    var options = {
      method: 'GET',
      url: 'https://api.bigcommerce.com/stores/39n5p4x8ny/v3/catalog/products',
      params: {include: 'custom_fields'},
      headers: {
        'Content-Type': 'application/json',
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


router.get("/cfd/:id",(req,res)=>{

    let Id = req.params.id
    var options = {
      method: 'GET',
      url: `https://api.bigcommerce.com/stores/39n5p4x8ny/v3/catalog/products/${Id}`,
      params: {include: 'custom_fields'},
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': 'arto2ufvjyt6h9ke178lkclrze8mq3e'
      },
    }
    
    axios.request(options).then(function (response) {
      // console.log(response.data);
      // res.send(response.data)
      res.send(response.data)
    }).catch(function (error) {
      console.error(error);
    });
})
  
router.post("/cfd",(req,res)=>{
    var options = {
      method: 'POST',
      url: 'https://api.bigcommerce.com/stores/39n5p4x8ny/v3/catalog/products',
      params: {include: 'custom_fields'},
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': 'arto2ufvjyt6h9ke178lkclrze8mq3e'
      },
      data:req.body
    }
    
    axios.request(options).then(function (response) {
      // console.log(response.data);
      res.send(response.data)
    }).catch(function (error) {
      console.error(error);
    });
})
  
router.put("/cfd/:id",(req,res)=>{

    let Id = req.params.id
    var options = {
      method: 'PUT',
      url: `https://api.bigcommerce.com/stores/39n5p4x8ny/v3/catalog/products/${Id}`,
      params: {include: 'custom_fields'},
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': 'arto2ufvjyt6h9ke178lkclrze8mq3e'
      },
      data:req.body
    }
    
    axios.request(options).then(function (response) {
      // console.log(response.data);
      res.send(response.data)
    }).catch(function (error) {
      console.error(error);
    });
})
  
router.delete("/cfd/:id",(req,res)=>{
  
    let Id = req.params.id
    var options = {
      method: 'DELETE',
      url: `https://api.bigcommerce.com/stores/39n5p4x8ny/v3/catalog/products/${Id}`,
      params: {include: 'custom_fields'},
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': 'arto2ufvjyt6h9ke178lkclrze8mq3e'
      },
    }
    
    axios.request(options).then(function (response) {
      // console.log(response.data);
      // res.send(response.data)
      res.json("data deleted")
    }).catch(function (error) {
      console.error(error);
    });
})

module.exports = router
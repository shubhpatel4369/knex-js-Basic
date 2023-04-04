const express = require("express")
const app = express()
var cors = require("cors")
const mysql = require("mysql")
const axios = require('axios')
var bodyParser = require("body-parser")
const dbo = require("./Service/pn")
const knex = require("./config/database")
const productlocal = require("./Local data/Productlocal")
const categorylocal = require("./Local data/Categorylocal")
const productoptionlocal= require("./Local data/productoptionlocal")
const customfieldlocal= require("./Local data/custom_fieldlocal")
const productlive= require("./Live data/product")
const categorylive= require("./Live data/category")
const productoptionlive= require("./Live data/productoption")
const custom_fieldlive= require("./Live data/custom_field")
const imageurllive= require("./Live data/imageurl")
const dotenv = require('dotenv');
const getjwt = require("./Service/jsonwebtoken")
const user_controller = require("./Controller/user_controller")
// const auth = require("./Middleware/auth")
const users = require("./Controller/demo")
const productvariants = require("./Live data/productvariants")
const productreview = require("./Live data/productreview")
const productreviewlocal = require("./Local data/productreviewlocal")
const productmetafields = require('./Live data/productmetafields')
const jwt = require('jsonwebtoken');
const {v4: uuidv4} = require('uuid');


require ("dotenv").config()

// knex.select("*").from("orders").offset(0).limit(50);
let port = process.env.port 
// || 40000

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


app.get ("/",function(req,res){
  res.json("welcome")
  res.end()
  
})

// -------insert products in local data ---------

app.get('/foods',(req,res)=>{

    var values = {
        method: 'GET',
        url: 'https://api.bigcommerce.com/stores/39n5p4x8ny/v3/catalog/products',
        params: {availability: 'available'},
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': 'arto2ufvjyt6h9ke178lkclrze8mq3e'
        }
      };
      
      axios.request(values) .then(function(resp){
        // console.log(resp.data)
        res.send(resp.data.data)
            for(i in resp.data.data){
               for(j in resp.data.data [i]){
                  if(typeof(  resp.data.data [i][j])=='object'){

                      resp.data.data [i][j]= JSON.stringify(resp.data.data [i][j])
        }
    }
    // console.log( resp.data.data)
    }
    knex('bigcommerce') .insert(resp.data.data).then(() => {console.log("data inserted")})
         .catch((err)=>{console.log(err); })
  })
})

// --------insert categories data in local-----

app.get('/cy',(req,res)=>{

  var options = {
    method: 'GET',
    url: 'https://api.bigcommerce.com/stores/39n5p4x8ny/v3/catalog/categories',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-Auth-Token': 'arto2ufvjyt6h9ke178lkclrze8mq3e'
    }
  };
  

axios.request(options).then(function (resp) {
  // console.log(response.data);
  res.send(resp.data)
  for(i in resp.data.data){
    for(j in resp.data.data [i]){
       if(typeof(  resp.data.data [i][j])=='object'){
           resp.data.data [i][j]= JSON.stringify(resp.data.data [i][j])
}}}
  knex('bigc_category') .insert(resp.data.data).then(() => {console.log("data inserted")})
  .catch((err)=>{console.log(err); })
})
})

// ____ insert custom field----

app.get("/pl",(req,res)=>{
  let Id = req.params.id
  var options = {
  method: 'GET',
  url: `https://api.bigcommerce.com/stores/39n5p4x8ny/v3/catalog/products/81/custom-fields`,
  params: {include_fields: 'custom_fields'},
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-Auth-Token': 'arto2ufvjyt6h9ke178lkclrze8mq3e'
  }
};
  
  axios.request(options).then(function (resp) {
    res.send(resp.data)
    for(i in resp.data.data){
      for(j in resp.data.data [i]){
         if(typeof(  resp.data.data [i][j])=='object'){
  
             resp.data.data [i][j]= JSON.stringify(resp.data.data [i][j])
  }
  }
  }
    knex('bigcommerce') .insert(resp.data.data).then(() => {console.log("data inserted")})
    .catch((err)=>{console.log(err); })
  })
  })

//local storage insert product option 

app.get("/pov",(req,res)=>{

  var options = {
    method: 'GET',
    url: 'https://api.bigcommerce.com/stores/39n5p4x8ny/v3/catalog/products/81/options',
    headers: {
      'Content-Type': 'application/json',
      'X-Auth-Token': 'arto2ufvjyt6h9ke178lkclrze8mq3e'
    }
  };
  axios.request(options).then(function (resp) {
    res.send(resp.data)
    for(i in resp.data.data){
      for(j in resp.data.data [i]){
         if(typeof(  resp.data.data [i][j])=='object'){
  
             resp.data.data [i][j]= JSON.stringify(resp.data.data [i][j])
  } } }
    knex('bigcommerce') .insert(resp.data.data).then(() => {console.log("data inserted")})
    .catch((err)=>{console.log(err); })
  })
})


app.get("/prd",(req,res)=>{
  var options = {
    method: 'GET',
    url: 'https://api.bigcommerce.com/stores/39n5p4x8ny/v3/catalog/products/81/reviews',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-Auth-Token': 'arto2ufvjyt6h9ke178lkclrze8mq3e'
    }};

    axios.request(options).then(function (resp) {
      res.send(resp.data)
      for(i in resp.data.data){
        for(j in resp.data.data [i]){
           if(typeof(  resp.data.data [i][j])=='object'){
    
               resp.data.data [i][j]= JSON.stringify(resp.data.data [i][j])
    } } }
      knex('bigcommerce') .insert(resp.data.data).then(() => {console.log("data inserted")})
      .catch((err)=>{console.log(err); })
    })

})

app.get("/pv",(req,res)=>{
  var options = {
    method: 'GET',
    url: 'https://api.bigcommerce.com/stores/39n5p4x8ny/v3/catalog/products/88/variants',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-Auth-Token': 'arto2ufvjyt6h9ke178lkclrze8mq3e'
    }};

    axios.request(options).then(function (resp) {
      res.send(resp.data)
      for(i in resp.data.data){
        for(j in resp.data.data [i]){
           if(typeof(  resp.data.data [i][j])=='object'){
    
               resp.data.data [i][j]= JSON.stringify(resp.data.data [i][j])
    } } }
      knex('bigcommerce') .insert(resp.data.data).then(() => {console.log("data inserted")})
      .catch((err)=>{console.log(err); })
    })
})

app.get("/pvm",(req,res)=>{
  var options = {
    method: 'GET',
    url: 'https://api.bigcommerce.com/stores/39n5p4x8ny/v3/catalog/products/88/variants/67/metafields',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-Auth-Token': 'arto2ufvjyt6h9ke178lkclrze8mq3e'
    }};

    axios.request(options).then(function (resp) {
      res.send(resp.data)
      for(i in resp.data.data){
        for(j in resp.data.data [i]){
           if(typeof(  resp.data.data [i][j])=='object'){
    
               resp.data.data [i][j]= JSON.stringify(resp.data.data [i][j])
    } } }
      knex('bigcommerce') .insert(resp.data.data).then(() => {console.log("data inserted")})
      .catch((err)=>{console.log(err); })
    })
})

app.post("/signup",(req,res)=>{
  var options = {
    method: 'POST',
    url: 'https://api.bigcommerce.com/stores/39n5p4x8ny/v3/customers',
    headers: {
      'Content-Type': 'application/json',
      'X-Auth-Token': 'arto2ufvjyt6h9ke178lkclrze8mq3e'
    },
    data:[req.body]
  };
  axios.request(options).then(function (response) {
    if(response.status == 200){
       function getLoginUrl(customerId, storeHash, storeUrl, clientId, clientSecret) {

        const dateCreated = Math. round((new Date()). getTime() / 1000);
        const  payload = {
            "iss": clientId,
            "iat": dateCreated,
            "jti": uuidv4(),
            "operation": "customer_login",
            "store_hash": storeHash,
            "customer_id": customerId,
        }
        let token = jwt.sign(payload, clientSecret, {algorithm:'HS256'});
       
        // res.send(response.data)
        return `${storeUrl}login/token/${token}`;
        // res.send()
     };
      
     const clientId = "687efxc3hohpwnpw67cffn95amyeu5g";
     const clientSecret = "3f7995163bcf88037a1df6478e109a9da2daadd7c0f13b3d103787256d721f0a";
     const customerId = 26;
     const storeHash = "39n5p4x8ny";
     const storeUrl = "https://umiya.mybigcommerce.com/";




     
     const loginUrl = getLoginUrl(customerId, storeHash, storeUrl, clientId, clientSecret);
     res.send(loginUrl)
    }
  }).catch(function (error) {
    console.error(error);
  });
})


app.post("/pId",(req,res)=>{
  const options = {
    method: 'POST',
    url: 'https://api.bigcommerce.com/stores/hw9fq6q6i6/v3/customers/attributes',
    headers: {
      'Content-Type': '',
      Accept: '',
      'X-Auth-Token': 'arto2ufvjyt6h9ke178lkclrze8mq3e'
    },
    data: [{name: 'personal_category_id'}]
  };
  
  axios.request(options).then(function (response) {
    console.log(response.data);
  }).catch(function (error) {
    console.error(error);
  });
})

app.get("/foo",dbo.getAllfoods)

app.use('/', productlocal)
app.use('/', categorylocal)
app.use('/', productoptionlocal)
app.use('/',customfieldlocal)
app.use('/',productlive)
app.use('/',categorylive)
app.use('/',productoptionlive)
app.use('/',custom_fieldlive)
app.use('/',imageurllive)
app.use('/',getjwt)
app.use('/',productreview)
app.use('/',productvariants)
app.use('/',productreviewlocal)
app.use('/',productmetafields)

// app.use('/',auth)
app.use("/",user_controller)
app.use('/',users)



app.listen(port,function(){
    console.log(`server running on ${port}`);
});
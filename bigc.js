const express = require("express")
const app = express()
var cors = require("cors")
const mysql = require("mysql")
const axios = require('axios')
var bodyParser = require("body-parser")
const dbo = require("./db")
const db = require("./config/database")


app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

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

app.get ("/",function(req,res){
  res.json("welcome")
  res.end()
  
})


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
    knex('bigcommerce') .insert(resp.data.data).then(() => {   console.log("data inserted")})
         .catch((err)=>{console.log(err); })
  })
})




// app.get("/foods/add", (req, res) => {

//     var reqData = req.query;
//     var pagination = {};
//     var per_page = reqData.per_page || 10;
//     var page = reqData.current_page || 1;
//     if (page < 1) page = 1;
//     var offset = (page - 1) * per_page;
//     return Promise.all([
//         db.count('* as count').from("foods").first(),
//         db.select("*").from("foods").offset(offset).limit(per_page)
//     ]).then(([total, rows]) => {
//         var count = total.count;
//         var rows = rows;
//         pagination.total = count;
//         pagination.per_page = per_page;
//         pagination.offset = offset;
//         pagination.to = offset + rows.length;
//         pagination.last_page = Math.ceil(count / per_page);
//         pagination.current_page = page;
//         pagination.from = offset;
//         pagination.data = rows;
//         res.render("foods", {
//             data: pagination
//         });
//     });
// });


app.get("/foo",dbo.getAllfoods)



// const { attachPaginate } = require('knex-paginate');
// attachPaginate();



// app.get("/paginated-results", (req, res) => {

// var reqData = req.query;
// var pagination = {};
// var per_page = reqData.per_page || 5;
// var page = reqData.current_page || 1;
// if (page < 1) page = 1;
// var offset = (page * per_page)-per_page;
// // const page = req.query.page;
  
//     return knex("bigcommerce").paginate.offset(offset)({
//       perPage: 5,
//       currentPage: page
//     }).then(results => {
//       res.json(results)
//     }).catch((err)=>{
//         console.log(err);
//     })
//   })
// app.get("/products", (req, res) => {




//   const  getAllproducts = async(page_q,limit_q,term)=>{
//     let params = {
//       page:page_q,
//       limit:limit_q,
//       term:term
//     }
//     return findAll('products',params)
//   }



// // })
// app.get("/food",dbo.getAllfoods)


// app.get("/foods",params, (req, res) => { 
  
  
// axios.request(values).then(function (response) {
//   console.log(response.data);


// knex.select('*')
//   .from('bigcommerce')
//   .limit(10)
//   .offset(10).findAll("foods",params)


// .catch(function (error) {
//   console.error(error);
// })
// })
// })




// var axios = require("axios").default;


app.get('/join',(req,res)=>{

  var values = {
    method: 'GET',
    url: 'https://api.bigcommerce.com/stores/39n5p4x8ny/v3/catalog/products',
    headers: {
      'Content-Type': 'application/json',
      'X-Auth-Token': 'arto2ufvjyt6h9ke178lkclrze8mq3e'
    }
  };
  
  axios.request(values).then(function (response) {
    console.log(response.data);
    res.send(response.data)
    knex('bigcommerce')
      .join('bigcommerce', 'name', '=', 'sku')
      .select('id', 'width')
  }).catch(function (error) {
    console.error(error);
  });
  
  })

app.get('/products',(req,res)=>{

var values = {
  method: 'GET',
  url: 'https://api.bigcommerce.com/stores/39n5p4x8ny/v3/catalog/products',
  headers: {
    'Content-Type': 'application/json',
    'X-Auth-Token': 'arto2ufvjyt6h9ke178lkclrze8mq3e'
  }
};

axios.request(values).then(function (response) {
  // console.log(response.data);
  res.send(response.data)
  // knex('foods')
  // .then((data)=>{
  //   res.json(data)
  // })
}).catch(function (error) {
  console.error(error);
});

})


  
  app.get('/product',(req,res)=>{

    var options = {
      method: 'GET',
      url: 'https://api.bigcommerce.com/stores/39n5p4x8ny/v3/catalog/products/80',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-Auth-Token': 'arto2ufvjyt6h9ke178lkclrze8mq3e'
      }
    };
  
  axios.request(options).then(function (response) {
    console.log(response.data);
    res.send(response.data)
    // knex('foods')
    // .then((data)=>{
    //   res.json(data)
    //      return knex(bigcommerce).where(`${bigcommerce}.id`,id).first()
    // })
  }).catch(function (error) {
    console.error(error);
  });
  
  })

app.post('/product/add',(req,res)=>{
  var options = {
    method: 'POST',
    url: 'https://api.bigcommerce.com/stores/39n5p4x8ny/v3/catalog/products',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-Auth-Token': 'arto2ufvjyt6h9ke178lkclrze8mq3e'
    },
    data: {
      id: 0,
      name: 'Smith Journal 13',
      type: 'physical',
      sku: 'SM-13',
      description: '<p><span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vel metus ac est egestas porta sed quis erat. Integer id nulla massa. Proin vitae enim nisi. Praesent non dignissim nulla. Nulla mattis id massa ac pharetra. Mauris et nisi in dolor aliquam sodales. Aliquam dui nisl, dictum quis leo sit amet, rutrum volutpat metus. Curabitur libero nunc, interdum ac libero non, tristique porttitor metus. Ut non dignissim lorem, in vestibulum leo. Vivamus sodales quis turpis eget.</span></p>',
      weight: 0,
      width: 0,
      depth: 0,
      height: 0,
      price: 0,
      cost_price: 0,
      retail_price: 0,
      sale_price: 0,
      map_price: 0,
      tax_class_id: 0,
      product_tax_code: 'string',
      categories: [0],
      brand_id: 0,
      inventory_level: 0,
      inventory_warning_level: 0,
      inventory_tracking: 'none',
      fixed_cost_shipping_price: 0,
      is_free_shipping: true,
      is_visible: true,
      is_featured: true,
      related_products: [0],
      warranty: 'string',
      bin_picking_number: 'string',
      layout_file: 'string',
      upc: 'string',
      search_keywords: 'string',
      availability_description: 'string',
      availability: 'available',
      gift_wrapping_options_type: 'any',
      sort_order: -2147483648,
      condition: 'New',
      is_condition_shown: true,
      order_quantity_minimum: 0,
      order_quantity_maximum: 0,
      page_title: 'string',
      meta_keywords: ['string'],
      meta_description: 'string',
      view_count: 0,
      preorder_release_date: '2019-08-24T14:15:22Z',
      preorder_message: 'string',
      is_preorder_only: true,
      is_price_hidden: true,
      price_hidden_label: 'string',
      custom_url: {url: 'string', is_customized: true},
      open_graph_type: 'product',
      open_graph_title: 'string',
      open_graph_description: 'string',
      open_graph_use_meta_description: true,
      open_graph_use_product_name: true,
      open_graph_use_image: true,
      'brand_name or brand_id': 'Common Good',
      gtin: 'string',
      mpn: 'string',
      reviews_rating_sum: 3,
      reviews_count: 4,
      total_sold: 80,
      custom_fields: [{id: 6, name: 'ISBN', value: '1234567890123'}],
      images: [
        {
          image_file: 'string',
          is_thumbnail: true,
          sort_order: -2147483648,
          description: 'string',
          id: 0,
          product_id: 0,
          url_zoom: 'string',
          url_standard: 'string',
          url_thumbnail: 'string',
          url_tiny: 'string',
          date_modified: '2019-08-24T14:15:22Z'
        }
      ],
      videos: [
        {
          title: 'Writing Great Documentation',
          description: 'A video about documenation',
          sort_order: 1,
          type: 'youtube',
          video_id: 'z3fRu9pkuXE',
          id: 0,
          product_id: 0,
          length: 'string'
        }
      ]
    }
  };
  
  axios.request(options).then(function (response) {
    console.log(response.data);
    res.send(response.data)
  }).catch(function (error) {
    console.error(error);
  });

})

// 


app.delete('/product',(req,res)=>{
  var options= {
    method: 'DELETE',
    url: 'https://api.bigcommerce.com/stores/39n5p4x8ny/v3/catalog/products/80',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-Auth-Token': 'arto2ufvjyt6h9ke178lkclrze8mq3e'
    }
  };

axios.request(options).then(function (response) {
  console.log(response.data)
  // knex('bigcommerce')
  // .where({id: parseInt(req.params.id)})
  // .del()
  // .then(()=>{
  //   res.json('data deleted')
  // })
}).catch(function (error) {
  console.error(error);
});
})



app.put('/product',(req,res)=>{
  var options = {
    method: 'PUT',
    url: 'https://api.bigcommerce.com/stores/39n5p4x8ny/v3/catalog/products/86',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-Auth-Token': 'arto2ufvjyt6h9ke178lkclrze8mq3e'
    },
    data: {
      id: 0,
      name: 'Smith Journal 13',
      type: 'physical',
      sku: 'SM-13',
      description: '<p><span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vel metus ac est egestas porta sed quis erat. Integer id nulla massa. Proin vitae enim nisi. Praesent non dignissim nulla. Nulla mattis id massa ac pharetra. Mauris et nisi in dolor aliquam sodales. Aliquam dui nisl, dictum quis leo sit amet, rutrum volutpat metus. Curabitur libero nunc, interdum ac libero non, tristique porttitor metus. Ut non dignissim lorem, in vestibulum leo. Vivamus sodales quis turpis eget.</span></p>',
      weight: 0,
      width: 0,
      depth: 0,
      height: 0,
      price: 0,
      cost_price: 0,
      retail_price: 0,
      sale_price: 0,
      map_price: 0,
      tax_class_id: 0,
      product_tax_code: 'string',
      categories: [0],
      brand_id: 0,
      inventory_level: 0,
      inventory_warning_level: 0,
      inventory_tracking: 'none',
      fixed_cost_shipping_price: 0,
      is_free_shipping: true,
      is_visible: true,
      is_featured: true,
      related_products: [0],
      warranty: 'string',
      bin_picking_number: 'string',
      layout_file: 'string',
      upc: 'string',
      search_keywords: 'string',
      availability_description: 'string',
      availability: 'available',
      gift_wrapping_options_type: 'any',
      gift_wrapping_options_list: [0],
      sort_order: -2147483648,
      condition: 'New',
      is_condition_shown: true,
      order_quantity_minimum: 0,
      order_quantity_maximum: 0,
      page_title: 'string',
      meta_keywords: ['string'],
      meta_description: 'string',
      view_count: 0,
      preorder_release_date: '2019-08-24T14:15:22Z',
      preorder_message: 'string',
      is_preorder_only: true,
      is_price_hidden: true,
      price_hidden_label: 'string',
      custom_url: {url: 'string', is_customized: true},
      open_graph_type: 'product',
      open_graph_title: 'string',
      open_graph_description: 'string',
      open_graph_use_meta_description: true,
      open_graph_use_product_name: true,
      open_graph_use_image: true,
      'brand_name or brand_id': 'Common Good',
      gtin: 'string',
      mpn: 'string',
      reviews_rating_sum: 3,
      reviews_count: 4,
      total_sold: 80,
      custom_fields: [{id: 6, name: 'ISBN', value: '1234567890123'}],
      bulk_pricing_rules: [{id: 0, quantity_min: 10, quantity_max: 50, type: 'price', amount: 10}],
      images: [
        {
          image_file: 'string',
          is_thumbnail: true,
          sort_order: -2147483648,
          description: 'string',
          image_url: 'string',
          id: 0,
          product_id: 0,
          url_zoom: 'string',
          url_standard: 'string',
          url_thumbnail: 'string',
          url_tiny: 'string',
          date_modified: '2019-08-24T14:15:22Z'
        }
      ],
      videos: [
        {
          title: 'Writing Great Documentation',
          description: 'A video about documenation',
          sort_order: 1,
          type: 'youtube',
          video_id: 'z3fRu9pkuXE',
          id: 0,
          product_id: 0,
          length: 'string'
        }
      ],
      variants: [
        {
          cost_price: 0,
          price: 0,
          sale_price: 0,
          retail_price: 0,
          weight: 0,
          width: 0,
          height: 0,
          depth: 0,
          is_free_shipping: true,
          fixed_cost_shipping_price: 0,
          purchasing_disabled: true,
          purchasing_disabled_message: 'string',
          upc: 'string',
          inventory_level: 0,
          inventory_warning_level: 0,
          bin_picking_number: 'string',
          product_id: 0,
          sku: 'string'
        }
      ]
    }
  };

axios.request(options).then(function (response) {
  console.log(response.data);
  res.send(response.data)
    // knex('foods').where({id:parseInt(req.params.id)})
    .update(req.body)
}).catch(function (error) {
  console.error(error);
});
})
// app.get('/foods/:id',(req,res)=>{

//   var values = {
//       method: 'GET',
//       url: 'https://api.bigcommerce.com/stores/39n5p4x8ny/v3/catalog/products',
//       params: {availability: 'available'},
//       headers: {
//         'Content-Type': 'application/json',
//         'X-Auth-Token': 'arto2ufvjyt6h9ke178lkclrze8mq3e'
//       }
//     };

//     knex('values')
//     .where({id : req.params.id})
//     .then((data)=>{
//       res.json(data)
//     })
//     .catch(()=>{
//       res.json("wrong")
//     })
//   })

// app.post('/foods',(req,res)=>{

//   var values = {
//       method: 'POST',
//       url: 'https://api.bigcommerce.com/stores/39n5p4x8ny/v3/catalog/products',
//       params: {availability: 'available'},
//       headers: {
//         'Content-Type': 'application/json',
//         'X-Auth-Token': 'arto2ufvjyt6h9ke178lkclrze8mq3e'
//       }
//     };
// axios.request(values).then(function(resp){
//   res.json(resp.data)
// }).catch(function(error){
//   res.json(error)
// })


//   })

//   app.delete('/foods/:id',(req,res)=>{

//     var values = {
//         method: 'DELETE',
//         url: 'https://api.bigcommerce.com/stores/39n5p4x8ny/v3/catalog/products',
//         params: {availability: 'available'},
//         headers: {
//           'Content-Type': 'application/json',
//           'X-Auth-Token': 'arto2ufvjyt6h9ke178lkclrze8mq3e'
//         }
//       };
//   axios.request(values).then(function(resp){
//     res.json(resp.data)
//   }).catch(function(error){
//     res.json(error)
//   })
  
  
//     })


// ************** categories *************

app.get("/categories",(req,res)=>{



axios.request(options).then(function (response) {
  console.log(response.data);
  res.send(response.data)
}).catch(function (error) {
  console.error(error);
});
  
})

app.post("/category",(req,res)=>{
  var options = {
    method: 'POST',
    url: 'https://api.bigcommerce.com/stores/39n5p4x8ny/v3/catalog/categories',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-Auth-Token': 'arto2ufvjyt6h9ke178lkclrze8mq3e'
    },
    data: {
      id: 0,
      parent_id: 2,
      name: 'Bath',
      description: '<p>We offer a wide variety of products perfect for relaxing</p>',
      views: 1050,
      sort_order: 3,
      page_title: 'Bath',
      search_keywords: 'string',
      meta_keywords: ['string'],
      meta_description: 'string',
      layout_file: 'category.html',
      is_visible: true,
      default_product_sort: 'use_store_settings',
      image_url: 'https://cdn8.bigcommerce.com/s-123456/product_images/d/fakeimage.png',
      custom_url: {url: '/shoes', is_customized: true}
    }
  };
  
  axios.request(options).then(function (response) {
    console.log(response.data);
    res.send(response.data)
  }).catch(function (error) {
    console.error(error);
  });

})

app.delete("/category",(req,res)=>{
var options = {
  method: 'DELETE',
  url: 'https://api.bigcommerce.com/stores/39n5p4x8ny/v3/catalog/categories/18',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-Auth-Token': 'arto2ufvjyt6h9ke178lkclrze8mq3e'
  }
};

axios.request(options).then(function (response) {
  console.log(response.data);
  res.send(response.data)
  console.log("data deleted")
}).catch(function (error) {
  console.error(error);
});
})



app.put("/category",(req,res)=>{
  var options = {
    method: 'PUT',
    url: 'https://api.bigcommerce.com/stores/39n5p4x8ny/v3/catalog/categories/20',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-Auth-Token': 'arto2ufvjyt6h9ke178lkclrze8mq3e'
    },
    data: {
      id: 0,
      parent_id: 2,
      name: 'Bath',
      description: '<p>We offer a wide variety of products perfect for relaxing</p>',
      views: 1050,
      sort_order: 3,
      page_title: 'Bath',
      search_keywords: 'string',
      meta_keywords: ['string'],
      meta_description: 'string',
      layout_file: 'category.html',
      is_visible: true,
      default_product_sort: 'use_store_settings',
      image_url: 'https://cdn8.bigcommerce.com/s-123456/product_images/d/fakeimage.png',
      custom_url: {url: '/shoes', is_customized: true}
    }
  };
  
  axios.request(options).then(function (response) {
    console.log(response.data);
  }).catch(function (error) {
    console.error(error);
  });
})

app.get("/category",(req,res)=>{
  var options = {
    method: 'GET',
    url: 'https://api.bigcommerce.com/stores/39n5p4x8ny/v3/catalog/categories/20',
    headers: {
      'Content-Type': 'application/json',
      'X-Auth-Token': 'arto2ufvjyt6h9ke178lkclrze8mq3e'
    }
  };
  
  axios.request(options).then(function (response) {
    console.log(response.data);
    res.send(response.data)
  }).catch(function (error) {
    console.error(error);
  });
})
app.get('/locals',(req,res)=>{


  knex.from('bigcommerce').select("*").then((rows)=>{
    // res.send(res.data)
    return res.json(rows);
  })
  .catch((err)=>{
    console.log(err);
    // return res.json({success : false,message:"sww"})
  })
})

app.get('/locals/:id',(req,res)=>{


  knex('bigcommerce')
  .then((data)=>{
    res.json(data)
      return knex('bigcommerce').select("*").where(`${bigcommerce}.id`,id).first()  
  })
  .catch((err)=>{
    console.log(err);
    // return res.json({success : false,message:"sww"})
  })
})

app.post('/locals',(req,res)=>{


  knex('bigcommerce').insert(req.body)
    .then(()=>{res.json('data added')
    .catch(()=>{res.json('sww')
    })    
       
  })
  .catch((err)=>{
    console.log(err);
    // return res.json({success : false,message:"sww"})
  })
})


app.put('/locals/:id',(req,res)=>{


  knex('bigcommerce').where({id:parseInt(req.params.id)})
  .update(req.body)
  .then(()=>{
    // res.send(res.data)
    res.json('data updated')
  })

.catch(function (error) {
console.error(error);
})
  
})




// ____________***********______________

app.get('/ps',(req,res)=>{

  var options = {
    method: 'GET',
    url: 'http://localhost:4000/locals',
    
  };
  
  axios.request(options).then(function (response) {
    // console.log(response.data);
    res.send(response.rows)
    knex('bigcommerce')
    .then((rows)=>{
      res.json(rows)
    })
  }).catch(function (error) {
    console.error(error);
  });
  
  })

  app.get('/p',(req,res)=>{

    var options = {
      method: 'GET',
      url: 'http://localhost:4000/locals/81',
      
    };
  
  axios.request(options).then(function (response) {
    // console.log(response.data);
    res.send(response.data)
    knex('bigcommerce')
    .then((data)=>{
      res.json(data)
         return knex(bigcommerce).where(`${bigcommerce}.id`,id).first()
    })
  }).catch(function (error) {
    console.error(error);
  });
  
  })



  app.post('/p',(req,res)=>{

    var options = {
      method: 'GET',
      url: 'http://localhost:4000/locals',
      
    };

    axios.request(options) .then(function(resp){
      console.log(resp.data)
      res.send(resp.data.data)
      })
  knex('bigcommerce').insert(req.body).then(()=>{
    res.json('data added').catch(()=>{
      res.json('sww')
    })
  })
       .catch((err)=>{console.log(err); })
})





app.delete('/p/:id',(req,res)=>{
  var options = {
    method: 'GET',
    url: 'http://localhost:4000/locals',
    
  };

axios.request(options).then(function (response) {
  console.log(response.data)
  knex('bigcommerce')
  .where({id: parseInt(req.params.id)})
  .del()
  .then(()=>{
    res.json('data deleted')
  })
}).catch(function (error) {
  console.error(error);
});
})



app.put('/p',(req,res)=>{

  var options = {
    method: 'GET',
    url: 'http://localhost:4000/locals/81',
    
  };

axios.request(options).then(function (response) {
  // console.log(response.data);
  res.send(response.data)
    // knex('bigcommerce').where({id:parseInt(req.params.id)})
    // .update(req.body)
    // .then(()=>{
    //   res.send(response.data)
    //   res.json('data updated')
    // })
}).catch(function (error) {
  console.error(error);
})
})



// app.get("/local",(req,res)=>{

//   knex.select('*').from('bigcommerce')
// })

// *********custom fields ********






app.get("/pcf",(req,res)=>{
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


app.post("/pcf",(req,res)=>{
  var options = {
    method: 'POST',
    url: 'https://api.bigcommerce.com/stores/39n5p4x8ny/v3/catalog/products/88/custom-fields',
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

app.get("/pcfd",(req,res) => {

  var options = {
    method: 'GET',
    url: 'https://api.bigcommerce.com/stores/39n5p4x8ny/v3/catalog/products/81/custom-fields/2',
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

app.put("/pcf",(req,res)=>{
  var options = {
    method: 'PUT',
    url: 'https://api.bigcommerce.com/stores/39n5p4x8ny/v3/catalog/products/81/custom-fields/4',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-Auth-Token': 'arto2ufvjyt6h9ke178lkclrze8mq3e'
    },
    // data: {id: 6, name: 'ISBN', value: '1234567890123'}
    data:req.body
  };
  
  axios.request(options).then(function (response) {
    // console.log(response.data);
    res.send(response.data)
  }).catch(function (error) {
    console.error(error);
  });
})

app.delete("/pcf",(req,res)=>{
  var options = {
    method: 'DELETE',
    url: 'https://api.bigcommerce.com/stores/39n5p4x8ny/v3/catalog/products/88/custom-fields/7',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-Auth-Token': 'arto2ufvjyt6h9ke178lkclrze8mq3e'
    }
  };
  
  axios.request(options).then(function (response) {
    // console.log(response.data);
    // res.send(response.data)
    res.json("data deleted")
  }).catch(function (error) {
    console.error(error);
  });
})

app.put("/p1",(req,res)=>{
  
  var options = {
    method: 'PUT',
    url: 'https://api.bigcommercef.com/stores/39n5p4x8ny/v3/catalog/products',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-Auth-Token': 'arto2ufvjyt6h9ke178lkclrze8mq3e'
    },
    
    data: [
    {
      "id": 81,
      "name": "[Sample] Orbit Terrarium - Small22222222",
      "type": "physical",
      "sku": "OTS",
      "description": "<p>This strikingly beautiful terrarium will make a welcome addition to your home bringing some green to the scene. A handblown glass sphere rests freely on a thick, concave carved fir base allowing it to be angled in any direction.</p>\n<p><em>Plants, rocks and soil are not included.</em></p>\n<p>Measures 16.5 cm dia x 17.8 cm h / 6.5 in dia x 7 in h</p>",
      "weight": 1,
      "width": 0,
      "depth": 0,
      "height": 0,
      "price": 89,
      "cost_price": 0,
      "retail_price": 0,
      "sale_price": 0,
      "map_price": 0,
      "tax_class_id": 0,
      "product_tax_code": "",
      "calculated_price": 89,
      "categories": [
        19,
        23
      ],
      "brand_id": 0,
      "option_set_id": null,
      "option_set_display": "right",
      "inventory_level": 0,
      "inventory_warning_level": 0,
      "inventory_tracking": "none",
      "reviews_rating_sum": 0,
      "reviews_count": 0,
      "total_sold": 1,
      "fixed_cost_shipping_price": 0,
      "is_free_shipping": false,
      "is_visible": true,
      "is_featured": false,
      "related_products": [
        -1
      ],
      "warranty": "",
      "bin_picking_number": "0",
      "layout_file": "product.html",
      "upc": "",
      "mpn": "",
      "gtin": "",
      "search_keywords": "",
      "availability": "available",
      "availability_description": "",
      "gift_wrapping_options_type": "any",
      "gift_wrapping_options_list": [],
      "sort_order": 0,
      "condition": "New",
      "is_condition_shown": false,
      "order_quantity_minimum": 0,
      "order_quantity_maximum": 0,
      "page_title": "",
      "meta_keywords": [],
      "meta_description": "",
      "date_created": "2015-07-03T18:03:57+00:00",
      "date_modified": "2015-12-15T06:22:30+00:00",
      "view_count": 62,
      "preorder_release_date": null,
      "preorder_message": "0",
      "is_preorder_only": false,
      "is_price_hidden": false,
      "price_hidden_label": "0",
      "custom_url": {
        "url": "/orbit-terrarium-small/",
        "is_customized": false
      },
      "base_variant_id": 65,
      "open_graph_type": "product",
      "open_graph_title": "",
      "open_graph_description": "",
      "open_graph_use_meta_description": true,
      "open_graph_use_product_name": true,
      "open_graph_use_image": true
    },
  ]

  };



axios.request(options).then(function (response) {
  console.log(response.data);
}).catch(function (error) {
  console.error(error);
});
})



app.post("/p1",(req,res)=>{
  
  var options = {
    method: 'POST',
    url: 'https://api.bigcommerce.com/stores/39n5p4x8ny/v3/catalog/products',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-Auth-Token': 'arto2ufvjyt6h9ke178lkclrze8mq3e'
    },
    data: {
      id: 86,
      name: 'Smith Journal 13445444',
      type: 'physical',
      sku: 'SM-13',
      description: '<p><span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vel metus ac est egestas porta sed quis erat. Integer id nulla massa. Proin vitae enim nisi. Praesent non dignissim nulla. Nulla mattis id massa ac pharetra. Mauris et nisi in dolor aliquam sodales. Aliquam dui nisl, dictum quis leo sit amet, rutrum volutpat metus. Curabitur libero nunc, interdum ac libero non, tristique porttitor metus. Ut non dignissim lorem, in vestibulum leo. Vivamus sodales quis turpis eget.</span></p>',
      weight: 0,
      width: 0,
      depth: 0,
      height: 0,
      price: 0,
      cost_price: 0,
      retail_price: 0,
      sale_price: 0,
      map_price: 0,
      tax_class_id: 0,
      product_tax_code: 'string',
      brand_id: 0,
      inventory_level: 0,
      inventory_warning_level: 0,
      inventory_tracking: 'none',
      fixed_cost_shipping_price: 0,
      is_free_shipping: true,
      is_visible: true,
      is_featured: true,
      related_products: [0],
      warranty: 'string',
      bin_picking_number: 'string',
      layout_file: 'string',
      upc: 'string',
      search_keywords: 'string',
      availability_description: 'string',
      availability: 'available',
      gift_wrapping_options_type: 'any',
      gift_wrapping_options_list: [],
      sort_order: 147483648,
      condition: 'New',
      is_condition_shown: true,
      order_quantity_minimum: 0,
      order_quantity_maximum: 0,
      page_title: 'string',
      meta_keywords: ['string'],
      meta_description: 'string',
      view_count: 0,
      preorder_release_date: '2019-08-24T14:15:22Z',
      preorder_message: 'string',
      is_preorder_only: true,
      is_price_hidden: true,
      price_hidden_label: 'string',
      custom_url: {url: 'string', is_customized: true},
      open_graph_type: 'product',
      open_graph_title: 'string',
      open_graph_description: 'string',
      open_graph_use_meta_description: true,
      open_graph_use_product_name: true,
      open_graph_use_image: true,
      'brand_name or brand_id': 'Common Good',
      gtin: 'string',
      mpn: 'string',
      reviews_rating_sum: 3,
      reviews_count: 4,
      total_sold: 80,
      custom_fields: [],
      videos: [
        {
          title: 'Writing Great Documentation',
          description: 'A video about documenation',
          sort_order: 1,
          type: 'youtube',
          video_id: 'z3fRu9pkuXE',
          id: 0,
          product_id: 0,
          length: 'string'
        }
      ]
    }
  };
  
  axios.request(options).then(function (response) {
    console.log(response.data);
  }).catch(function (error) {
    console.error(error);
  });
})


app.put("p1",(req,res)=>{
  var options = {
    method: 'PUT',
    url: 'https://api.bigcommerce.com/stores/39n5p4x8ny/v3/catalog/products/81',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-Auth-Token': 'arto2ufvjyt6h9ke178lkclrze8mq3e'
    },
    data: '   {\n      "id" :"81"\n      "name": "[Sample] Orbit Terrarium - Small1111111",\n      "type": "physical",\n      "sku": "OTS",\n      "description": "<p>This strikingly beautiful terrarium will make a welcome addition to your home bringing some green to the scene. A handblown glass sphere rests freely on a thick, concave carved fir base allowing it to be angled in any direction.</p>\n<p><em>Plants, rocks and soil are not included.</em></p>\n<p>Measures 16.5 cm dia x 17.8 cm h / 6.5 in dia x 7 in h</p>",\n      "weight": 1,\n      "width": 0,\n      "depth": 0,\n      "height": 0,\n      "price": 89,\n      "cost_price": 0,\n      "retail_price": 0,\n      "sale_price": 0,\n      "map_price": 0,\n      "tax_class_id": 0,\n      "product_tax_code": "",\n      "calculated_price": 89,\n      "categories": [\n        19,\n        23\n      ],\n      "brand_id": 0,\n      "option_set_id": null,\n      "option_set_display": "right",\n      "inventory_level": 0,\n      "inventory_warning_level": 0,\n      "inventory_tracking": "none",\n      "reviews_rating_sum": 0,\n      "reviews_count": 0,\n      "total_sold": 1,\n      "fixed_cost_shipping_price": 0,\n      "is_free_shipping": false,\n      "is_visible": true,\n      "is_featured": false,\n      "related_products": [\n        -1\n      ],\n      "warranty": "",\n      "bin_picking_number": "0",\n      "layout_file": "product.html",\n      "upc": "",\n      "mpn": "",\n      "gtin": "",\n      "search_keywords": "",\n      "availability": "available",\n      "availability_description": "",\n      "gift_wrapping_options_type": "any",\n      "gift_wrapping_options_list": [],\n      "sort_order": 0,\n      "condition": "New",\n      "is_condition_shown": false,\n      "order_quantity_minimum": 0,\n      "order_quantity_maximum": 0,\n      "page_title": "",\n      "meta_keywords": [],\n      "meta_description": "",\n      "date_created": "2015-07-03T18:03:57+00:00",\n      "date_modified": "2015-12-15T06:22:30+00:00",\n      "view_count": 62,\n      "preorder_release_date": null,\n      "preorder_message": "0",\n      "is_preorder_only": false,\n      "is_price_hidden": false,\n      "price_hidden_label": "0",\n      "custom_url": {\n        "url": "/orbit-terrarium-small/",\n        "is_customized": false\n      },\n      "base_variant_id": 65,\n      "open_graph_type": "product",\n      "open_graph_title": "",\n      "open_graph_description": "",\n      "open_graph_use_meta_description": true,\n      "open_graph_use_product_name": true,\n      "open_graph_use_image": true\n    }'
  };
  
  axios.request(options).then(function (response) {
    console.log(response.data);
  }).catch(function (error) {
    console.error(error);
  });
  
})



app.get("/po",(req,res)=>{
  var options = {
    method: 'GET',
    url: 'https://api.bigcommerce.com/stores/39n5p4x8ny/v2/products/81/options',
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


app.post("/po",(req,res)=>{
  var options = {
    method: 'POST',
    url: 'https://api.bigcommerce.com/stores/39n5p4x8ny/v3/catalog/products/81/options',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-Auth-Token': 'arto2ufvjyt6h9ke178lkclrze8mq3e'
    },
    data: {
      product_id: 4,
      display_name: 'Add-a-$5-Donation1535042499-187',
      type: 'radio_buttons',
      config: {
        default_value: 'string',
        checked_by_default: true,
        checkbox_label: 'string',
        date_limited: true,
        date_limit_mode: 'earliest',
        date_earliest_value: '2018-08-31T00:00:00.000Z',
        date_latest_value: '2019-01-01T00:00:00.000Z',
        file_types_mode: 'specific',
        file_types_supported: ['images', 'documents', 'other'],
        file_types_other: ['pdf', 'txt'],
        file_max_size: 5,
        text_characters_limited: true,
        text_min_length: 1,
        text_max_length: 55,
        text_lines_limited: true,
        text_max_lines: 4,
        number_limited: true,
        number_limit_mode: 'lowest',
        number_lowest_value: 100,
        number_highest_value: 0,
        number_integers_only: false,
        product_list_adjusts_inventory: true,
        product_list_adjusts_pricing: true,
        product_list_shipping_calc: 'none'
      },
      sort_order: 1,
      option_values: [{is_default: false, label: 'Green', sort_order: 0, value_data: {}, id: 0}],
      image_url: 'string'
    }
  };
  
  axios.request(options).then(function (response) {
    // console.log(response.data);
    res.send(response.data)
  }).catch(function (error) {
    console.error(error);
  });
})

app.get("/pod",(req,res)=>{
  var options = {
    method: 'GET',
    url: 'https://api.bigcommerce.com/stores/39n5p4x8ny/v3/catalog/products/81/options/113',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-Auth-Token': 'arto2ufvjyt6h9ke178lkclrze8mq3e'
    }
  };
  
  axios.request(options).then(function (response) {
    console.log(response.data);
  }).catch(function (error) {
    console.error(error);
  });
})

app.put("/po",(req,res)=>{
  var options = {
    method: 'PUT',
    url: 'https://api.bigcommerce.com/stores/39n5p4x8ny/v3/catalog/products/81/options/113',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-Auth-Token': 'arto2ufvjyt6h9ke178lkclrze8mq3e'
    },
    data: {
      id: 55,
      product_id: 4,
      display_name: 'Add-a-$5-Donation1535042499-187',
      type: 'radio_buttons',
      config: {
        default_value: 'string',
        checked_by_default: true,
        checkbox_label: 'string',
        date_limited: true,
        date_limit_mode: 'earliest',
        date_earliest_value: '2018-08-31T00:00:00.000Z',
        date_latest_value: '2019-01-01T00:00:00.000Z',
        file_types_mode: 'specific',
        file_types_supported: ['images', 'documents', 'other'],
        file_types_other: ['pdf', 'txt'],
        file_max_size: 5,
        text_characters_limited: true,
        text_min_length: 1,
        text_max_length: 55,
        text_lines_limited: true,
        text_max_lines: 4,
        number_limited: true,
        number_limit_mode: 'lowest',
        number_lowest_value: 100,
        number_highest_value: 0,
        number_integers_only: false,
        product_list_adjusts_inventory: true,
        product_list_adjusts_pricing: true,
        product_list_shipping_calc: 'none'
      },
      sort_order: 1,
      image_url: 'string'
    }
  };
  
  axios.request(options).then(function (response) {
    console.log(response.data);
  }).catch(function (error) {
    console.error(error);
  });
})


app.delete("/po",(req,res)=>{
  var options = {
    method: 'DELETE',
    url: 'https://api.bigcommerce.com/stores/39n5p4x8ny/v3/catalog/products/81/options/114',
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





app.listen(4000,function(){
    console.log("server started on 4000");
});
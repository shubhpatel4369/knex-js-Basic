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
      knex('foods')
        .join('bigcommerce', 'name', '=', 'sku')
        .select('id', 'width')
    }).catch(function (error) {
      console.error(error);
    });
    
    })




knex('users')
.join('contacts', 'users.id', '=', 'contacts.user_id')
.select('users.id', 'contacts.phone')


// async getUser(id) {
//     return camelizeKeys(
//         await knex
//         .select(
//             'u.id',
//             'u.first_name',
//             'u.last_name',
//             'u.username',
//             'u.image_url',
//             'u.is_admin',
//             'u.phone',
//             'u.info',
//             'la.email',
//             'cu.customer_id',
//             'cu.department_id'
//         )
//         .from('user AS u')
//         .leftJoin('local_auth AS la', 'la.user_id', 'u.id')
//         .leftJoin('customer_user AS cu', 'cu.user_id', 'u.id')
//         .where('u.id', '=', id)
//         .first()
//     );
// }

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
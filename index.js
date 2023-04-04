const express = require("express")
const app = express()
var cors = require("cors")
const mysql = require("mysql")
const axios = require('axios')
var bodyParser = require("body-parser")





app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


// const options = {
//     client: 'mysql',
//         connection: {
//         host: '127.0.0.1',
//         user: 'root',
//         password: '',
//         database: 'studentinfo'
//     }
// }

// const knex = require('knex')(options);
const connection = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "",
    database: "studentinfo",
})
connection.connect(function(err){
    if(err){
        console.log(err)
    }else{
        console.log("database connected")
    }
})
app.get("/products",function(req,res){

    axios.get('https://dummyjson.com/products').then(resp => {
        res.json(resp.data)
        // console.log(resp.data);

})
})

// Use Studentinfo;
// CREATE TABLE `Studentinfo` (
// `userId` int(11) NOT NULL AUTO_INCREMENT,
// `username` varchar(45) DEFAULT NULL,
// `useremail` varchar(200) DEFAULT NULL,
// PRIMARY KEY (`userId`)
// )ENGINE=innoDB AUTO_INCREMENT = 0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

// });

app.get('/users',(req,res)=>{
    // connection.getconnection((err,connection)=>{
    //     if(err)throw err
    //     console.log('connected as id' + connection.userId)
        connection.query('SELECT *FROM studentinfo',(err,rows)=>{
            // connection.release()

            if(!err){
                res.send(rows)
            }else{
                console.log(err)
            }
            console.log('the data from studentinfo table are: \n',rows)
        })
    // })
})

app.get('/users/:id',(req,res)=>{
    // connection.getconnection((err,connection)=>{
    //     if(err) throw err
        connection.query('SELECT *FROM studentinfo WHERE user_id= ?',[req.params.id],(err,rows)=>{
            // connection.release()

            
            if(!err){
                res.send(rows)
            }else{
                console.log(err)
            }
            console.log('the data from studentinfo table are: \n',rows)
        })
    // })
})

app.post('/users',(req,res)=>{
    // connection.getconnection((err,connection)=>{
    //     if(err) throw err
        const params = req.body 
        connection.query('INSERT INTO studentinfo ?',params,(err,rows)=>{
            // connection.release()

            
            if(!err){
                res.send(rows)
            }else{
                console.log(err)
            }
            console.log('the data from studentinfo table are: \n',rows)
        })
    // })
})



app.delete('/users/:id',(req,res)=>{
    // connection.getconnection((err,connection)=>{
    //     if(err) throw err
        connection.query('DELETE *FROM studentinfo BY user_id= ?',[req.params.id],(err,rows)=>{
            // connection.release()

            
            if(!err){
                res.send(`rows with thhis id is romoved`)
            }else{
                console.log(err)
            }
            console.log('the data from studentinfo table are: \n',rows)
        })
    // })
})

app.put('/users/:id',(req,res)=>{
    // connection.getconnection((err,connection)=>{
    //     if(err) throw err
    //     console.log(connected)
        const {user_name,user_email,user_Id}=req.body

        connection.query('UPDATE `studentinfo` SET `user_name`=?,`user_email`=?,`user_id`= ? WHERE user_id=?',[user_name,user_email,user_Id],(err,rows)=>{
            // connection.release()

            
            if(!err){
                res.send(rows)
            }else{
                console.log(err)
                res.send(err)
            }
            console.log('the data from studentinfo table are: \n',rows)
        })
    // })
})



app.get ("/",function(req,res){
    res.json("welcome")
    res.end()
    
})






var values = {
  method: 'GET',
  url: 'https://api.bigcommerce.com/stores/39n5p4x8ny/v3/catalog/products',
  params: {availability: 'available'},
  headers: {
    'Content-Type': 'application/json',
    'X-Auth-Token': 'arto2ufvjyt6h9ke178lkclrze8mq3e'
  }
};

// app.get('/foods',(req,res)=>{
//     axios.request(data).then(function (response) {
//         res.send(response.data)
     
//     }).catch(function (error) {
//         res.send(error)
     
//     });
//     })









app.get('/foods',(req,res)=>{

    // knex('bigcommerce').insert(values)
   axios.request(values) .then(function(resp){
        
        for(i in resp.data){

            for(j in resp.data [i])
            {
                if(typeof(resp.data[i][j])== "object")
                {
                    resp.data[i][j] = JSON.stringify(resp.data[i][j])
                }
            }
        }

     let bgc  =   knex('bigcommerce').insert(values).toString()
        console.log(bgc)
        res.send(resp.data)
        // console.log("data inserted")
    } 
  )
    
    .catch((err) => {
        res.send(err)
         console.log(err); throw err })
    
    });



    
// .query('INSERT INTO bigcommerce ?',params,(err,rows)=>{
           

//             if(!err){
//                 res.send(`rows with this id updated`)
//             }else{
//                 console.log(err)
//             }
//             console.log('the data from bigcommerce table are: \n',rows)
//         })
//             insert(values)
// })



// conn.query(sql, [values], function(err) {
//     if (err) throw err;
//     conn.end();
// });



app.listen(4000,function(){
    console.log("server started on 4000");
});
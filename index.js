/* package.json adalah file untuk setting semua js/express
request = proses pengiriman data dari api ke localhost atau web
response = proses pengiriman data dari browser atau localhost ke api

*/
 /* nodemon untuk auto reload after save tidak perlu mati server*/
  /*body-parser untuk get data body dari html atau web*/
  // terdapat function params & query

const express = require('express') // variable untuk memanggil modul atau library
const app = express() // deklarasi variable untuk penghubung ke library
const port = 3000
const bodyParser = require('body-parser') // merubah dan menerima data respon menjadi format json
const database = require('./connection') // memanggil file connection.js
const responses = require('./responses') 
const { request } = require('express')
const db = require('./queries')

// app.use(bodyParser.json())
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

// =========================================================================================================
// tutorial CRUD API dengan postgre
app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/users', db.getUsers)
app.get('/users/id', db.getUserById)

// =========================================================================================================
// tutorial CRUD API dengan mysql
// rout URL atau bisa disebut endpoint
app.get('/', (req, res) => {
  database.query("SELECT * FROM tbuser", (error, result) => {
    // hasil dari mysql
    responses(200, result, 'get all data from table', res)
  })
})


app.get('/database',(req,res) => {
  const sql = "select * from tbuser"
  database.query(sql, (error,result)=> {
    responses(200, result, ' data berhasi ditampilkan', res)
  })
} )

app.get('/find', (req,res) => {
  console.log('find noreg: ' , req.query.no_registrasi)
  const sql1 = `SELECT nama from tbuser WHERE no_registrasi = '${req.query.no_registrasi}'`
  database.query(sql1, (error, result)=> {
    responses(200, result , 'mencari data nama' , res)
  })
})

app.get('/find/:id_pelanggan', (req,res) => {
  // const id = req.params.id_pelanggan
  const id = req.params.id_pelanggan
  const sql2 = `SELECT * FROM tbuser where id_pelanggan = ${id}`
  database.query(sql2, (error,result) => {
  responses (200,'result','Berhasil terhubung',res)
  console.log('id : ', result)
  })
  
})

// method POST
app.post('/insert',(req,res) => {
  // buat variable untuk request data body html
  const {id,noReg,namaUser,noTelp,email,address,passwordUser} = req.body
  // buat variable sql untuk insert data
  console.log(req.body)
  const sql = `INSERT INTO tbuser VALUE ('${id}','${noReg}','${namaUser}','${noTelp}','${email}','${address}','${passwordUser}')`
  database.query( sql, (error,field) => {
    if(error) throw error
    console.log('hasil input : ', field )
    // responses (200, field , 'Berhasil Kirim Data',res)
    res.send('Berhasil Insert data')
  })
  // responses(200,'insert data','Data berhasil di insert',res)
})

app.put('/update', (req,res) => {
  console.log({updateUsername: req.body})
} )

app.delete('/update', (req,res) => {
  console.log({updateUsername: req.body})
} )

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

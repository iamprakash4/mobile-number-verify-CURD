

const express = require('express');
const bodyParser = require('body-parser')
const httpReq = require('request');
const cors = require('cors');
const { init,insertItem, getItems, updateQuary, getByIdQuary,deleteUserItem } = require('./db');
const app = express();
const portNum = 50002;
      
app.use(bodyParser.json())
app.use(cors({
   origin: '*'
}));

init().then((tt) => {
   app.listen(portNum, displayStarted);
 })

app.get('/user', getUserById);
app.get('/user/all', getAllUser);
app.get('/number-validate',validateNumber);
app.put('/user', updateUser);
app.post('/user', createUser);
app.delete('/user',deleteUser);

function displayStarted() {
   console.log(' user microservice listening on port ' + portNum);
} 

function deleteUser(req, res) {
   const { id } = req.query
   deleteUserItem(id)
    .then((item) => {
      res.status(200).json({"success" : true})
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({"success" : false})
    })
}

function getUserById(req, res) {
   const { id } = req.query
   getByIdQuary(id)
    .then((item) => {
      res.status(200).json({"success" : true,data:item})
    })
   .catch((err) => {
      console.log(err)
      res.status(500).json({"success" : false,data:[]})
   })
}

function updateUser(req, res) {
   const { id } = req.query
   const body = req.body
   updateQuary(id, body)
    .then(() => {
      res.status(200).json({"success" : true})
    })
   .catch((err) => {
      console.log(err)
      res.status(500).json({"success" : false})
   })
}

function createUser(req, res) {
   const item = req.body
   const result = item
   if (result.error) {
      console.log(result.error)
      res.status(400).end()
      return
   }
   insertItem(item)
   .then(() => {
      res.status(200).json({"success" : true})
   })
   .catch((err) => {
      console.log(err)
      res.status(500).json({"success" : false})
   })
}

function getAllUser(req, res) {
   getItems()
   .then((items) => {
     items = items.map((item) => ({
       id: item._id,
       name: item.name,
       address: item.address,
       mobile:item.mobile
     }))
     res.status(200).json({"success":true,data:items})
   })
   .catch((err) => {
     console.log(err)
     res.status(500).json({"success":false,data:[]})
   })
}

async function validateNumber(req, res) {
   const { number } = req.query
   await httpReq({
      uri : `http://localhost:50001/validate?number=${number}`,
      method: 'GET'
   }, async function (err, ress, body) {
      return await res.status(200).send(body)
   });
}
module.exports = app;

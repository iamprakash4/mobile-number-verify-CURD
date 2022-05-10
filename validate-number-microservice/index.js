var express = require('express');
var httpReq = require('request');
const bodyParser = require('body-parser')
var app = express();
var portNum = 50001;
var apiKey = "4M7hDtYUEnhiryUdc3ejpQF4DhnoFQ5M"
     
app.use(bodyParser.json())
app.listen(portNum, displayStarted);

function displayStarted() {
   console.log('mobile number microservice listening on port ' + portNum);
} 

app.get('/validate',validateNumber);

async function validateNumber(req, res) {
   const { number } = req.query
   await httpReq({
      headers: {
      'apikey': apiKey
      },
      uri : `https://api.apilayer.com/number_verification/validate?number=${number}`,
      method: 'GET'
   }, async function (err, ress, body) {
      body = JSON.parse(body)
      if(!err){
         if(body && body.valid){
            const {country_code,country_name,carrier} = body
         return await res.status(200).send({valid: true, country_code,country_name,carrier});
         }else{
         return await res.status(200).send({valid: false, message:"Invalid number"});
         }
      }
   });
}

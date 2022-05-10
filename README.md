# Sample ReactJS and NodeJS application for mobile number search with user CRUD operation

# Before run this application, install nodeJS and mongoDB on developer machine and run this application

# validate-number-microservice
 ```
 npm install
 ```
 1. Login on https://apilayer.com and get acess key
 2. replace api key with new access key on line no 6 in index.js file

 ```
 npm run start
 ```

# user-microservice
 ```
 npm install
 ```
 set database name on db.js file at 5th line and 9th line on tests/server.test.js for test cases

 ```
 npm run start
 npm run test
 ```

 # web-microservice
 ```
 npm install
 npm start
 ```


# API List
 1. GET http://localhost:50002/user/all
 2. POST http://localhost:50002/user
  payload ==>
    {
      "name":"Aniruth",
      "address":"Salem",
      "mobile":+918898838499
    }
 3. GET http://localhost:50002/user?id=6278f0fe8e75a5bab154bfe9
 4. PUT http://localhost:50002/user?id=6278f0fe8e75a5bab154bfe9
  payload ==>
    {
      "name":"Aniruth",
      "address":"Salem",
      "mobile":+918898838499
    }
 5. DELETE http://localhost:50002/user?id=6278f0fe8e75a5bab154bfe9
 6. GET http://localhost:50002/number-validate?number=+919043976304

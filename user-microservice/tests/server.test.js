
const app = require("../");
const mongoose = require("mongoose");
const supertest = require("supertest");
const { init,insertItem, getItems, updateQuary, getByIdQuary,deleteUserItem } = require('../db');


beforeEach((done) => {
    mongoose.connect("mongodb://127.0.0.1:27017/store",
    { useNewUrlParser: true,useUnifiedTopology: true  },
      () => done());
  });
  
  afterEach((done) => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(() => done())
    });
  });


  test("GET /user/all", async () => {
    const data = {
        "name":"Raj",
        "address":"SLM",
        "mobile":"+912324983492"
    }
    await insertItem(data)
    await supertest(app).get("/user/all")
      .expect(200)
      .then((response) => {
        expect(Array.isArray(response.body));
        expect(response.body.data[0].name).toBe(data.name);
        expect(response.body.data[0].address).toBe(data.address);
        expect(response.body.data[0].mobile).toBe(data.mobile);
      });
  });

  test("POST /user", async () => {
    const data = {
        "name":"Raj",
        "address":"SLM",
        "mobile":"+912324983492"
    }
    await insertItem(data)
    await supertest(app).post("/user")
      .expect(200)
      .then((response) => {
        expect(response.body.success).toBe(true);
      });
  });

  test("GET /user?id=6278f0fe8e75a5bab154bfe9", async () => {
    const data = {
        "name":"Raj",
        "address":"SLM",
        "mobile":"+912324983492"
    }
    await insertItem(data)
    await supertest(app).get("/user?id=6278f0fe8e75a5bab154bfe9")
      .expect(200)
      .then((response) => {
        expect(response.body.success).toBe(true);
        expect(Array.isArray(response.body.data));
      });
  });

  test("PUT /user?id=6278f0fe8e75a5bab154bfe9", async () => {
    const data = {
        "name":"Raj",
        "address":"SLM",
        "mobile":"+912324983492"
    }
    await insertItem(data)
    await supertest(app).put("/user?id=6278f0fe8e75a5bab154bfe9")
      .expect(200)
      .then((response) => {
        expect(response.body.success).toBe(true);
      });
  });

  test("DELETE /user?id=6278f0fe8e75a5bab154bfe9", async () => {
    const data = {
        "name":"Raj",
        "address":"SLM",
        "mobile":"+912324983492"
    }
    await insertItem(data)
    await supertest(app).delete("/user?id=6278f0fe8e75a5bab154bfe9")
      .expect(200)
      .then((response) => {
        expect(response.body.success).toBe(true);
      });
  });

  test("GET /number-validate?number=+919043976304", async () => {
    await supertest(app).get("/number-validate?number=+919043976304")
      .expect(200)
      .then((response) => {
          const data = JSON.parse(response.text)
        expect(typeof data).toBe('object');
      });
  });

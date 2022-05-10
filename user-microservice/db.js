  
const { MongoClient, ObjectId } = require('mongodb')

const connectionUrl = 'mongodb://127.0.0.1:27017'
const dbName = 'store'

let db

const init = () =>
  MongoClient.connect(connectionUrl, { useNewUrlParser: true }).then((client) => {
    db = client.db(dbName)
})

const insertItem = (item) => {
  const collection = db.collection('user')
  return collection.insertOne(item)
}

const getItems = () => {
  const collection = db.collection('user')
  return collection.find({}).toArray()
}

const getByIdQuary = (id) => {
    const collection = db.collection('user')
    return collection.find({_id: ObjectId(id)}).toArray()
}

const deleteUserItem = (id) => {
    const collection = db.collection('user')
    return collection.deleteOne({_id: ObjectId(id)})
}

const updateQuary = (id, item) => {
    const collection = db.collection('user')
    return collection.update({"_id" : ObjectId(id)},{$set: item});
}

module.exports = { init, insertItem, getItems, updateQuary, getByIdQuary,deleteUserItem }

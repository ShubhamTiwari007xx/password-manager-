const express = require('express');
const { json } = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
require('dotenv').config()


// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'passop'
const app = express ()
const port = 3000
app.use(json());
app.use(cors())


//get pass
client.connect();
app.get('/', async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    res.json(findResult)
  
})

//save
app.post('/', async (req, res) => {
    const password = req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.insertOne(password);
    res.send({success: true , result : findResult})
   
});

app.delete('/', async (req, res) => {
    const password = req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.deleteOne(password);
    res.send({success: true , result : findResult})
   
});



//delete
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
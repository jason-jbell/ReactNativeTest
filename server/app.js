const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('./Store');

const Store = mongoose.model('store');

const uri =
  'mongodb+srv://Jasonjbell:5rPoMbT2dJrCZAiK@pos365-jasonbell.l36uwdx.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(uri);
mongoose.connection.on('connected', () => {
  console.log('connected to mongo');
});
mongoose.connection.on('error', (error) => {
  console.error(error);
});
// const { MongoClient, ServerApiVersion } = require('mongodb');

// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   serverApi: ServerApiVersion.v1,
// });

// client.connect((err) => {
//   const collection = client.db('test').collection('devices');
//   // perform actions on the collection object
//   client.close();
// });

app.get('/', (req, res) => {
  res.send(App);
});

app.listen(3000, () => {
  console.log('Fuckin it up on port 3000');
});

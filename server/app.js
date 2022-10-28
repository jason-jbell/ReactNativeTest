const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('./Store');
const pass = process.env.PASSWORD;
app.use(bodyParser.json());

const Store = mongoose.model('store');

const uri = `mongodb+srv://Jasonjbell:${pass}@pos365-jasonbell.l36uwdx.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('connected', () => {
  console.log('connected to mongo');
});
mongoose.connection.on('error', (error) => {
  console.error(error);
});

app.get('/', (req, res) => {
  res.send(App);
});

app.post('/send', (req, res, next) => {
  const curr = req.body;
  const store = new Store({
    name: curr.name,
    phone: curr.phone,
    address: curr.address,
    status: curr.status,
  });
  try {
    store.save();
    res.send('successful post');
  } catch (e) {
    console.error(e);
  }
});

app.listen(3000, () => {
  console.log('Fuckin it up on port 3000');
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

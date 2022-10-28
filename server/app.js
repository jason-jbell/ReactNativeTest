const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('./Store');
require('dotenv').config();
const PASS = process.env.PASSWORD;
app.use(bodyParser.json());

const Store = mongoose.model('store');

const uri = `mongodb+srv://Jasonjbell:${PASS}@pos365-jasonbell.l36uwdx.mongodb.net/?retryWrites=true&w=majority`;
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

// app.get('/', (req, res) => {
//   res.send(App);
// });

// app.put('/update', (req, res, next) => {
//   try {
//     const store = Store.findOne({
//       where: {
//         id: req.body.id
//       }
//     })
//   } catch (error) {

//   }
// });

app.post('/send', async (req, res, next) => {
  const { name, phone, address, status } = req.body;
  const store = new Store({
    name,
    phone,
    address,
    status,
  });

  try {
    await store.save();
    console.log('saved');
    res.send('successful post');
  } catch (e) {
    console.error(e);
  }
});
app.delete('/delete', async (req, res, next) => {
  try {
    const store = Store.findById(req.body.id);
    await Store.deleteOne(store);
    res.send('deleted');
  } catch (e) {
    console.error(e);
  }
});
// app.post('/delete', async (req, res, next) => {
//   try {
//     await Store.findByIdAndRemove(req.body.id);
//     res.send('deleted');
//   } catch (e) {
//     console.error(e);
//   }
// });
app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .send(err.message || "Internal server error, you're fucked!");
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

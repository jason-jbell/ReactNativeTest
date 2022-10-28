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

// GET all stores
app.get('/stores', async (req, res, next) => {
  try {
    const stores = await Store.find();
    res.send(stores);
  } catch (e) {
    next(e);
  }
});
// GET one store by params id
app.get('/stores/:id', async (req, res, next) => {
  try {
    const store = await Store.findById(req.params.id);
    res.send(store);
  } catch (e) {
    next(e);
  }
});
// PUT update route by params id
app.put('/update/:id', async (req, res, next) => {
  try {
    const { name, phone, address, status } = req.body;
    const store = await Store.findById(req.params.id);

    if (name) {
      store.name = name;
    }
    if (phone) {
      store.phone = phone;
    }
    if (address) {
      store.address = address;
    }
    if (store.status !== status) {
      store.status === status;
    }

    await store.save().then(res.send(store));
  } catch (e) {
    next(e);
  }
});
// POST route by req.body
app.post('/send', async (req, res, next) => {
  try {
    const { name, phone, address, status } = req.body;
    const store = await new Store({
      name,
      phone,
      address,
      status,
    });
    await store.save().then(res.send('Successfully posted'));
  } catch (e) {
    next(e);
  }
});
// DELETE route by params id
app.delete('/delete/:id', async (req, res, next) => {
  try {
    await Store.findByIdAndDelete(req.params.id).then(
      res.send('Successfully deleted')
    );
  } catch (e) {
    next(e);
  }
});

app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .send(err.message || "Internal server error, you're fucked!");
});
app.listen(3000, () => {
  console.log('Fuckin it up on port 3000');
});

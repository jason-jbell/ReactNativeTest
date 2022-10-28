const app = require('express')();
require('./Store');
require('./User');
require('dotenv').config();
const bodyParser = require('body-parser');
const JWT = require('jsonwebtoken');
const Bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const Store = mongoose.model('store');
const User = mongoose.model('user');
const db = mongoose.connection;
const MONGODB_URI_PASS = process.env.PASSWORD;
const PORT = process.env.PORT;
const JWT_SECRET = 'psmR3Hu0ihHkfqZymo1m';

app.use(bodyParser.json());

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

// Error handler
app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .send(err.message || "Internal server error, you're fucked!");
});

// User SIGNUP POST
app.post('/user/signup', async (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    res.json({ success: false, error: 'Missing Parameters' });
    return;
  }
  try {
    const user = await new User({
      email: req.body.email,
      password: Bcrypt.hashSync(req.body.password, 10),
    });
    await user.save().then((user) => {
      const token = JWT.sign({ id: user._id, email: user.email }, JWT_SECRET);
      res.json({ success: true, token: token, user: user });
    });
  } catch (e) {
    next(e);
  }
});

// User LOGIN POST
app.post('/user/login', async (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    res.json({ success: false, error: 'Missing parameters' });
    return;
  }
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.json({ success: false, error: 'User does not exist' });
      return;
    } else {
      if (!Bcrypt.compareSync(req.body.password, user.password)) {
        res.json({ success: false, error: 'Incorrect password' });
      } else {
        const token = JWT.sign({ id: user.id, email: user.email }, JWT_SECRET);
        console.log('successful log in with user: ', user.email);
        res.send({ user: user, token: token });
      }
    }
  } catch (e) {
    next(e);
  }
});

// App startup on port 3000
app.listen(PORT, () => {
  mongoose.connect(
    `mongodb+srv://Jasonjbell:${MONGODB_URI_PASS}@pos365-jasonbell.l36uwdx.mongodb.net/?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  db.on('connected', () => {
    console.log('connected to mongo');
  });
  db.on('error', (error) => {
    console.error(error);
  });
  console.log(`Fuckin it up on port ${PORT}`);
});

module.exports = { db };

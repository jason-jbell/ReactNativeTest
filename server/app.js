const app = require('express')();
const { Owner, Store } = require('./Models');
require('dotenv').config();
const bodyParser = require('body-parser');
const JWT = require('jsonwebtoken');
const Bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const db = mongoose.connection;
const MONGODB_URI_PASS = process.env.PASSWORD;
const PORT = process.env.PORT;
const JWT_SECRET = 'psmR3Hu0ihHkfqZymo1m';

app.use(bodyParser.json());

app.use('/api', require('./api'));

// // GET all stores
// app.get('/stores', async (req, res, next) => {
//   try {
//     const stores = await Store.find();
//     res.send(stores);
//   } catch (e) {
//     next(e);
//   }
// });

// // GET one store by params id
// app.get('/stores/:id', async (req, res, next) => {
//   try {
//     const store = await Store.findById(req.params.id);
//     res.send(store);
//   } catch (e) {
//     next(e);
//   }
// });

// Error handler
app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .send(err.message || "Internal server error, you're fucked!");
});

// Owner SIGNUP POST
app.post('/owner/signup', async (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    res.json({ success: false, error: 'Missing Parameters' });
    return;
  }
  try {
    const owner = await new Owner({
      _id: new mongoose.Types.ObjectId(),
      email: req.body.email,
      password: Bcrypt.hashSync(req.body.password, 10),
    });
    await owner.save().then((owner) => {
      // TEST STORE CREATE ON USER
      const store1 = new Store({
        name: 'TestStore1',
        address: '365 P.O.S. Dr',
        owner: owner._id,
        phone: '8059159336',
        status: 'online',
      });
      store1.save();

      const token = JWT.sign({ id: owner._id, email: owner.email }, JWT_SECRET);
      console.log('successful SIGN UP with owner: ', owner.email);
      res.send({ owner: owner, token: token });
    });
  } catch (e) {
    next(e);
  }
});

// Owner LOGIN POST
app.post('/owner/login', async (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    res.json({ success: false, error: 'Missing parameters' });
    return;
  }
  try {
    const owner = await Owner.findOne({ email: req.body.email });
    if (!owner) {
      res.json({ success: false, error: 'Owner does not exist' });
      return;
    } else {
      if (!Bcrypt.compareSync(req.body.password, owner.password)) {
        res.json({ success: false, error: 'Incorrect password' });
      } else {
        const token = JWT.sign(
          { id: owner.id, email: owner.email },
          JWT_SECRET
        );
        console.log('successful log in with owner: ', owner.email);
        res.send({ owner: owner, token: token });
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

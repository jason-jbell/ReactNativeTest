const router = require('express').Router();
require('dotenv').config();
const JWT = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const Bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const { Owner, Store } = require('../Models');

// Owner SIGNUP POST /api/owners/signup
router.post('/signup', async (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    res.json({ success: false, error: 'Missing Parameters' });
    return;
  }

  try {
    const isOwner = Boolean(await Owner.findOne({ email: req.body.email }));
    if (isOwner) {
      res.json({ success: false, error: 'Email already in-use' });
      return;
    }
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
      res.send({ success: true, owner: owner, token: token });
    });
  } catch (e) {
    next(e);
  }
});

// Owner LOGIN POST /api/owners/login
router.post('/login', async (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    res.json({ success: false, error: 'Missing parameters' });
    return;
  }
  try {
    const owner = await Owner.findOne({ email: req.body.email });
    if (!owner) {
      res.json({ success: false, error: 'No user found with that email' });
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
        res.send({ success: true, owner: owner, token: token });
      }
    }
  } catch (e) {
    next(e);
  }
});

// Deletes all owners except test@test.com /api/owners/reset
router.delete('/reset', async (req, res, next) => {
  try {
    const all = await Owner.find();
    const lots = all.filter((owner) => owner.email !== req.body.email);
    await Promise.all(lots.map((owner) => Owner.deleteOne(owner)));
    res.send({ success: true });
  } catch (e) {
    next(e);
  }
});

module.exports = router;

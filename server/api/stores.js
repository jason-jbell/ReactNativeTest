const router = require('express').Router();
const { Store } = require('../Models');

// GET all stores /api/stores
router.get('/', async (req, res, next) => {
  try {
    const stores = await Store.find();
    res.send(stores);
  } catch (e) {
    next(e);
  }
});

// GET one store by params id /api/stores/:id
router.get('/:id', async (req, res, next) => {
  try {
    const store = await Store.findById(req.params.id);
    res.send(store);
  } catch (e) {
    next(e);
  }
});

// PUT update route by params id /api/stores/update/:id
router.put('/update/:id', async (req, res, next) => {
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

// POST route by req.body /api/stores/send
router.post('/send/:ownerId', async (req, res, next) => {
  try {
    const { name, phone, address, status } = req.body;
    const store = await new Store({
      name,
      owner: req.params.ownerId,
      phone,
      address: address ? address : '',
      status,
    });
    await store.save();
    await res.json({ created: true, store: store });
  } catch (e) {
    next(e);
  }
});

// DELETE route by params id /api/stores/delete/:id
router.delete('/delete/:id', async (req, res, next) => {
  try {
    await Store.findByIdAndDelete(req.params.id);
    await res.send('Successfully deleted');
  } catch (e) {
    next(e);
  }
});

module.exports = router;

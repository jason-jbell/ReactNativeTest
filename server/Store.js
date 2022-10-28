const mongoose = require('mongoose');

const StoreSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true
  },
  phone: {
    type: String,
    // required: true
  },
  address: {
    type: String,
    // required: true
  },
  status: 'Online' | 'Offline',
});

mongoose.model('store', StoreSchema);

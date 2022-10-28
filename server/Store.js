const mongoose = require('mongoose');

const StoreSchema = new mongoose.Schema(
  {
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
  },
  { collection: 'stores' }
);

exports.Store = mongoose.model('store', StoreSchema);

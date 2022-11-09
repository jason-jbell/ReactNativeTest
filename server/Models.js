const mongoose = require('mongoose');
const { Schema } = mongoose;
const OwnerSchema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    stores: [{ type: Schema.Types.ObjectId, ref: 'Store' }],
  },
  { collection: 'Owners' }
);

const StoreSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'Owner',
      required: true,
    },
    phone: {
      type: String,
      // required: true
    },
    address: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      value: 'online' | 'offline',
      required: true,
    },
    // status: 'Online' | 'Offline',
  },
  { collection: 'Stores' }
);

const Owner = mongoose.model('Owner', OwnerSchema);
const Store = mongoose.model('Store', StoreSchema);

module.exports = {
  Owner,
  Store,
};

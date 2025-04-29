const mongoose = require('mongoose');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config({ path: '../.env' }); // Ensure this points to correct location

const Vendor = require('../models/Vendor');

// Connect to MongoDB using URI from .env
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected for data import');
  insertData();
}).catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

// Read and insert mock service data
const vendors = JSON.parse(fs.readFileSync('./Vendor.json', 'utf-8'));

const insertData = async () => {
  try {
    await Vendor.deleteMany(); // optional: clear existing data
    await Vendor.insertMany(vendors);
    console.log('✅ Service data imported successfully!');
    process.exit();
  } catch (err) {
    console.error('❌ Error importing data:', err);
    process.exit(1);
  }
};

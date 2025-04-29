const mongoose = require('mongoose');
const fs = require('fs');
const dotenv = require('dotenv');
const path = require('path');

// Load .env file from the root directory (adjust if needed)
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const Vendor = require('../models/Vendor');

// Read JSON data from file
const vendors = JSON.parse(fs.readFileSync(path.resolve(__dirname, './Vendor.json'), 'utf-8'));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ MongoDB connected for vendor import');
  insertData();
}).catch(err => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);
});

// Insert vendors
async function insertData() {
  try {
    await Vendor.deleteMany(); // Optional: clear existing vendors
    await Vendor.insertMany(vendors);
    console.log('✅ Vendor data imported successfully!');
    process.exit();
  } catch (err) {
    console.error('❌ Error importing vendor data:', err);
    process.exit(1);
  }
}

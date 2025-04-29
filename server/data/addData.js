const mongoose = require('mongoose');
const fs = require('fs');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const Service = require('../models/Service');
const Services = JSON.parse(fs.readFileSync(path.resolve(__dirname, './Service.json'), 'utf-8'));

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('✅ MongoDB connected for Service import');
  insertData();
}).catch(err => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);
});

async function insertData() {
  try {
    await Service.deleteMany();
    await Service.insertMany(Services);
    console.log('data imported successfully!');
    process.exit();
  } catch (err) {
    console.error('Error importing Service data:', err);
    process.exit(1);
  }
}

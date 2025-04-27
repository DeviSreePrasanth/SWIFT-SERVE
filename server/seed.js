const mongoose = require('mongoose');
const connectDB = require('./config/connectDB');
const Service = require('./models/Service');

const services = [
  {
    name: 'Deep Cleaning',
    category: 'Cleaning',
    price: 1500,
    vendor: new mongoose.Types.ObjectId('507f1f77bcf86cd799439011'),
    timeEstimated: 4, // 4 hours
  },
  {
    name: 'AC Repair',
    category: 'AC Repair',
    price: 2000,
    vendor: new mongoose.Types.ObjectId('507f191e810c19729de860ea'),
    timeEstimated: 2, // 2 hours
  },
  {
    name: 'Haircut',
    category: 'Salon',
    price: 500,
    vendor: new mongoose.Types.ObjectId('507f1f77bcf86cd799439012'),
    timeEstimated: 1, // 1 hour
  },
  {
    name: 'Spa Massage',
    category: 'Spa',
    price: 2500,
    vendor: new mongoose.Types.ObjectId('507f191e810c19729de860eb'),
    timeEstimated: 1.5, // 1.5 hours
  },
  {
    name: 'Plumbing Fix',
    category: 'Plumbing',
    price: 1000,
    vendor: new mongoose.Types.ObjectId('507f1f77bcf86cd799439013'),
    timeEstimated: 3, // 3 hours
  },
];

const seedServices = async () => {
  try {
    await connectDB();
    await Service.deleteMany(); // Clear existing data
    await Service.insertMany(services);
    console.log('Sample services inserted');
    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedServices();
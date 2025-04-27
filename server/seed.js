const mongoose = require('mongoose');
const connectDB = require('./config/connectDB');
const Service = require('./models/Service');
const Cart = require('./models/CartSchema');
const Booking = require('./models/Booking');

const services = [
  {
    name: 'Deep Cleaning',
    category: 'Cleaning',
    price: 1500,
    vendor: new mongoose.Types.ObjectId('507f1f77bcf86cd799439011'),
    timeEstimated: 4,
  },
  {
    name: 'AC Repair',
    category: 'AC Repair',
    price: 2000,
    vendor: new mongoose.Types.ObjectId('507f191e810c19729de860ea'),
    timeEstimated: 2,
  },
  {
    name: 'Haircut',
    category: 'Salon',
    price: 500,
    vendor: new mongoose.Types.ObjectId('507f1f77bcf86cd799439012'),
    timeEstimated: 1,
  },
  {
    name: 'Spa Massage',
    category: 'Spa',
    price: 2500,
    vendor: new mongoose.Types.ObjectId('507f191e810c19729de860eb'),
    timeEstimated: 1.5,
  },
  {
    name: 'Plumbing Fix',
    category: 'Plumbing',
    price: 1000,
    vendor: new mongoose.Types.ObjectId('507f1f77bcf86cd799439013'),
    timeEstimated: 3,
  },
];

const seedData = async () => {
  try {
    await connectDB();
    // Drop collections if they exist
    await mongoose.connection.db.dropCollection('services').catch(() => console.log('No services collection to drop'));
    //await mongoose.connection.db.dropCollection('carts').catch(() => console.log('No carts collection to drop'));
    await mongoose.connection.db.dropCollection('bookings').catch(() => console.log('No bookings collection to drop'));
    // Insert sample services
    await Service.insertMany(services);
    console.log('Services collection created and sample data inserted');
    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
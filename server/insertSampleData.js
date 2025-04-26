const { MongoClient, ObjectId } = require('mongodb');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

// Sample data
const servicesData = [
  {
    _id: new ObjectId('507f1f77bcf86cd799439011'),
    name: 'Cleaning',
    description: 'Professional home cleaning services',
    isFeatured: true,
    createdAt: new Date('2025-04-26T10:00:00.000Z'),
  },
  {
    _id: new ObjectId('507f1f77bcf86cd799439012'),
    name: 'Plumbing',
    description: 'Expert plumbing repairs and installations',
    isFeatured: false,
    createdAt: new Date('2025-04-26T10:00:00.000Z'),
  },
  {
    _id: new ObjectId('507f1f77bcf86cd799439013'),
    name: 'Electrician',
    description: 'Electrical repairs and wiring',
    isFeatured: true,
    createdAt: new Date('2025-04-26T10:00:00.000Z'),
  },
];

const vendorsData = [
  {
    _id: new ObjectId('507f1f77bcf86cd799439014'),
    name: 'John Doe',
    businessName: 'Doe Services',
    email: 'john.doe@example.com',
    phone: '1234567890',
    password: 'hashed_password_123',
    experience: 5,
    services: [
      {
        serviceId: new ObjectId('507f1f77bcf86cd799439011'),
        name: 'Cleaning',
        description: 'Deep cleaning for homes',
        price: 100,
        serviceRadius: 10,
      },
      {
        serviceId: new ObjectId('507f1f77bcf86cd799439012'),
        name: 'Plumbing',
        description: 'Pipe repairs and installations',
        price: 150,
        serviceRadius: 8,
      },
    ],
    serviceArea: {
      coordinates: { lat: 40.7128, lng: -74.0060 },
      radius: 15,
    },
    ratings: [
      {
        userId: new ObjectId('507f1f77bcf86cd799439017'),
        rating: 4.5,
        comment: 'Excellent cleaning service!',
      },
    ],
    portfolioImages: [
      'https://example.com/images/cleaning1.jpg',
      'https://example.com/images/plumbing1.jpg',
    ],
    availability: [
      {
        date: new Date('2025-05-01T00:00:00.000Z'),
        timeSlots: [
          { start: '09:00', end: '10:00', isBooked: false },
          { start: '11:00', end: '12:00', isBooked: false },
        ],
      },
      {
        date: new Date('2025-05-02T00:00:00.000Z'),
        timeSlots: [
          { start: '14:00', end: '15:00', isBooked: false },
        ],
      },
    ],
    status: 'approved',
    createdAt: new Date('2025-04-26T10:00:00.000Z'),
  },
  {
    _id: new ObjectId('507f1f77bcf86cd799439015'),
    name: 'Jane Smith',
    businessName: 'Smith Electricals',
    email: 'jane.smith@example.com',
    phone: '0987654321',
    password: 'hashed_password_456',
    experience: 3,
    services: [
      {
        serviceId: new ObjectId('507f1f77bcf86cd799439013'),
        name: 'Electrician',
        description: 'Wiring and electrical repairs',
        price: 120,
        serviceRadius: 12,
      },
    ],
    serviceArea: {
      coordinates: { lat: 40.7309, lng: -73.9973 },
      radius: 10,
    },
    ratings: [
      {
        userId: new ObjectId('507f1f77bcf86cd799439018'),
        rating: 4.0,
        comment: 'Fixed my wiring issue quickly.',
      },
    ],
    portfolioImages: [
      'https://example.com/images/electrical1.jpg',
    ],
    availability: [
      {
        date: new Date('2025-05-01T00:00:00.000Z'),
        timeSlots: [
          { start: '10:00', end: '11:00', isBooked: false },
        ],
      },
    ],
    status: 'approved',
    createdAt: new Date('2025-04-26T10:00:00.000Z'),
  },
];

const usersData = [
  {
    _id: new ObjectId('507f1f77bcf86cd799439017'),
    name: 'Alice Johnson',
    email: 'alice@example.com',
    phone: '5551234567',
    password: 'hashed_password_789',
    address: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      pincode: '10001',
      coordinates: { lat: 40.7128, lng: -74.0060 },
    },
    bookings: [],
    createdAt: new Date('2025-04-26T10:00:00.000Z'),
  },
  {
    _id: new ObjectId('507f1f77bcf86cd799439018'),
    name: 'Bob Wilson',
    email: 'bob@example.com',
    phone: '5559876543',
    password: 'hashed_password_012',
    address: {
      street: '456 Elm St',
      city: 'New York',
      state: 'NY',
      pincode: '10002',
      coordinates: { lat: 40.7309, lng: -73.9973 },
    },
    bookings: [],
    createdAt: new Date('2025-04-26T10:00:00.000Z'),
  },
];

const bookingsData = [
  {
    _id: new ObjectId('507f1f77bcf86cd799439019'),
    userId: new ObjectId('507f1f77bcf86cd799439017'),
    vendorId: new ObjectId('507f1f77bcf86cd799439014'),
    serviceId: new ObjectId('507f1f77bcf86cd799439011'),
    date: new Date('2025-05-01T00:00:00.000Z'),
    timeSlot: {
      start: '09:00',
      end: '10:00',
    },
    specialInstructions: 'Focus on kitchen cleaning',
    status: 'confirmed',
    payment: {
      amount: 100,
      method: 'card',
      status: 'completed',
      transactionId: 'txn_123456',
    },
    createdAt: new Date('2025-04-26T12:00:00.000Z'),
  },
];

async function insertSampleData() {
  const client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    // Connect to MongoDB Atlas
    await client.connect();
    console.log('Connected to MongoDB Atlas');

    const db = client.db('swiftserve');

    // Drop existing collections to avoid duplicates (optional, comment out if not desired)
    await db.collection('services').drop().catch(() => console.log('No services collection to drop'));
    await db.collection('vendors').drop().catch(() => console.log('No vendors collection to drop'));
    await db.collection('users').drop().catch(() => console.log('No users collection to drop'));
    await db.collection('bookings').drop().catch(() => console.log('No bookings collection to drop'));

    // Insert data into collections
    console.log('Inserting services...');
    await db.collection('services').insertMany(servicesData);
    console.log(`Inserted ${servicesData.length} services`);

    console.log('Inserting vendors...');
    await db.collection('vendors').insertMany(vendorsData);
    console.log(`Inserted ${vendorsData.length} vendors`);

    console.log('Inserting users...');
    await db.collection('users').insertMany(usersData);
    console.log(`Inserted ${usersData.length} users`);

    console.log('Inserting bookings...');
    await db.collection('bookings').insertMany(bookingsData);
    console.log(`Inserted ${bookingsData.length} bookings`);

    console.log('Sample data insertion completed successfully!');
  } catch (error) {
    console.error('Error inserting sample data:', error);
    if (error.code === 11000) {
      console.error('Duplicate key error: Some data may already exist. Consider dropping collections first.');
    }
  } finally {
    // Close the connection
    await client.close();
    console.log('Disconnected from MongoDB Atlas');
  }
}

// Run the script
insertSampleData().catch(console.error);
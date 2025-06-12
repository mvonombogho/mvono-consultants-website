const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { config } = require('dotenv');

// Load environment variables
config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
  process.exit(1);
});

// Define schemas
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

const ServiceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  category: { type: String, required: true },
  price: { type: Number },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

// Define models
const User = mongoose.model('User', UserSchema);
const Service = mongoose.model('Service', ServiceSchema);

// Seed data
async function seedDatabase() {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Service.deleteMany({});

    // Create admin user
    const adminPassword = await bcrypt.hash('Admin@123', 10);
    await User.create({
      email: 'admin@mvonoconsultants.com',
      name: 'Admin User',
      password: adminPassword,
      role: 'admin'
    });
    console.log('Admin user created');

    // Create services
    const services = [
      {
        name: 'Environmental Impact Assessment',
        description: 'Comprehensive assessment of environmental impacts of projects and activities.',
        category: 'Environmental',
        price: 100000,
        isActive: true
      },
      {
        name: 'Occupational Safety',
        description: 'Assessment and implementation of workplace safety measures.',
        category: 'Safety',
        price: 75000,
        isActive: true
      },
      {
        name: 'Fire Safety Audit',
        description: 'Thorough audit of fire safety systems and protocols.',
        category: 'Safety',
        price: 60000,
        isActive: true
      },
      {
        name: 'Energy Audit',
        description: 'Analysis of energy consumption and efficiency recommendations.',
        category: 'Energy',
        price: 85000,
        isActive: true
      },
      {
        name: 'Statutory Inspection',
        description: 'Inspection services to ensure compliance with statutory requirements.',
        category: 'Compliance',
        price: 50000,
        isActive: true
      },
      {
        name: 'Non-Destructive Testing',
        description: 'Testing methods that don\'t cause damage to the materials being tested.',
        category: 'Testing',
        price: 70000,
        isActive: true
      },
      {
        name: 'Fire Safety Training',
        description: 'Training for employees on fire safety procedures and protocols.',
        category: 'Training',
        price: 40000,
        isActive: true
      },
      {
        name: 'First Aider Training',
        description: 'Training for employees on first aid procedures and protocols.',
        category: 'Training',
        price: 35000,
        isActive: true
      }
    ];

    await Service.insertMany(services);
    console.log('Services created');

    console.log('Database seeded successfully');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding database:', error);
    mongoose.connection.close();
    process.exit(1);
  }
}

// Run the seed function
seedDatabase();

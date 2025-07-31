const bcrypt = require('bcrypt');
const { MongoClient } = require('mongodb');

async function createTestUser() {
  let client;
  
  try {
    // Connect to MongoDB
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/mvono_db';
    client = new MongoClient(uri);
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db();
    const usersCollection = db.collection('users');
    
    // Check if test user already exists
    const existingUser = await usersCollection.findOne({ email: 'admin@mvonoconsultants.com' });
    
    if (existingUser) {
      console.log('Test user already exists');
      return;
    }
    
    // Hash the password
    const hashedPassword = await bcrypt.hash('Test@123', 10);
    
    // Create the test user
    const user = {
      name: 'Admin User',
      email: 'admin@mvonoconsultants.com',
      password: hashedPassword,
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    await usersCollection.insertOne(user);
    console.log('Test user created successfully');
    
  } catch (error) {
    console.error('Error creating test user:', error);
  } finally {
    if (client) await client.close();
  }
}

createTestUser();

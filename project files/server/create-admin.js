const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import User model
const User = require('./models/User');

async function createAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ MongoDB connected successfully');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@shopsmart.com' });
    
    if (existingAdmin) {
      console.log('⚠️  Admin user already exists!');
      console.log('\nAdmin Login Credentials:');
      console.log('Email: admin@shopsmart.com');
      console.log('Password: admin123');
      console.log('\n🔗 Access admin panel at: http://localhost:4200/admin');
    } else {
      // Create admin user (password will be hashed automatically by the model)
      const admin = new User({
        name: 'Admin',
        email: 'admin@shopsmart.com',
        password: 'admin123',
        role: 'admin',
        isActive: true,
        phone: '1234567890',
        address: {
          street: 'Admin Street',
          city: 'Admin City',
          state: 'Admin State',
          zipCode: '123456'
        }
      });

      await admin.save();
      console.log('✅ Admin user created successfully!');
      console.log('\n📧 Admin Login Credentials:');
      console.log('Email: admin@shopsmart.com');
      console.log('Password: admin123');
      console.log('\n🔗 Access admin panel at: http://localhost:4200/admin');
    }

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\n👋 Database connection closed');
    process.exit(0);
  }
}

// Run the function
createAdmin();

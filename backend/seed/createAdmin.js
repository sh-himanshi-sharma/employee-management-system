const dotenv = require('dotenv');
const path = require('path');

// Load env variables
dotenv.config({ path: path.join(__dirname, '../.env') });

const connectDB = require('../config/db');
const Admin = require('../models/Admin');

const seedAdmin = async () => {
  try {
    await connectDB();

    const adminUsername = 'admin';
    const adminPassword = 'admin123';

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username: adminUsername });

    if (existingAdmin) {
      console.log(`Admin user '${adminUsername}' already exists. Updating password...`);
      existingAdmin.password = adminPassword;
      await existingAdmin.save();
      console.log('✅ Admin password updated successfully!');
    } else {
      console.log(`Creating default admin user (${adminUsername})...`);
      const newAdmin = new Admin({
        username: adminUsername,
        password: adminPassword,
      });
      await newAdmin.save();
      console.log('✅ Default Admin created successfully!');
    }

    console.log('-----------------------------------');
    console.log('Credentials:');
    console.log(`Username: ${adminUsername}`);
    console.log(`Password: ${adminPassword}`);
    console.log('-----------------------------------');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding admin user:', error.message);
    process.exit(1);
  }
};

seedAdmin();

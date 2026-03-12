const mongoose = require('mongoose');
const User = require('./models/User');
const dotenv = require('dotenv');

dotenv.config();

const resetAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Remove any existing user with this email to be sure
        await User.deleteMany({ email: 'admin@gmail.com' });
        console.log('Existing admin users with this email cleared');

        const admin = new User({
            name: 'Super Admin',
            email: 'admin@gmail.com',
            password: 'admin@123',
            role: 'admin'
        });

        await admin.save();
        console.log('Default admin user created successfully');
        console.log('Email: admin@gmail.com');
        console.log('Password: admin@123');
        process.exit();
    } catch (error) {
        console.error('Error resetting admin:', error);
        process.exit(1);
    }
};

resetAdmin();

const mongoose = require('mongoose');
const User = require('./models/User');
const dotenv = require('dotenv');

dotenv.config();

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const adminExists = await User.findOne({ email: 'admin@techagent.tech' });
        if (adminExists) {
            console.log('Admin user already exists');
            process.exit();
        }

        const admin = new User({
            name: 'Super Admin',
            email: 'admin@techagent.tech',
            password: 'adminpassword123', // This will be hashed by the pre-save hook
            role: 'admin'
        });

        await admin.save();
        console.log('Default admin user created successfully');
        console.log('Email: admin@techagent.tech');
        console.log('Password: adminpassword123');
        process.exit();
    } catch (error) {
        console.error('Error seeding admin:', error);
        process.exit(1);
    }
};

seedAdmin();

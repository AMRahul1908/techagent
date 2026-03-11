const supabase = require('./config/supabase');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

const resetAdmin = async () => {
    try {
        const email = 'admin@techagent.tech';
        const password = 'adminpassword123';

        console.log('Attempting to reset admin in Supabase...');

        // 1. Delete existing
        const { error: deleteError } = await supabase
            .from('users')
            .delete()
            .eq('email', email);

        if (deleteError) {
            console.error('Error deleting existing admin:', deleteError);
            // Non-fatal, might not exist
        }

        // 2. Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 3. Create new
        const { data, error: insertError } = await supabase
            .from('users')
            .insert([{
                name: 'Super Admin',
                email: email,
                password: hashedPassword,
                role: 'admin'
            }]);

        if (insertError) {
            throw insertError;
        }

        console.log('Default admin user created successfully in Supabase');
        console.log('Email:', email);
        console.log('Password:', password);
        process.exit(0);
    } catch (error) {
        console.error('Error resetting admin in Supabase:', error);
        process.exit(1);
    }
};

resetAdmin();

const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey || supabaseUrl === 'your_supabase_url') {
    console.warn('Supabase credentials are missing or have placeholder values.');
}

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;

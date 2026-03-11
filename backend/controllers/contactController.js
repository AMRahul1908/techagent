const supabase = require('../config/supabase');

exports.submitContact = async (req, res) => {
    try {
        const { error } = await supabase
            .from('contacts')
            .insert([req.body]);

        if (error) throw error;
        res.status(201).json({ message: 'Contact form submitted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

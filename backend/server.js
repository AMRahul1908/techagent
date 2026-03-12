const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const contactRoutes = require('./routes/contactRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: ['http://localhost:3000', 'https://tech-agent.netlify.app'],
    credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/contact', contactRoutes);

// Serverless alias for Netlify
app.use('/.netlify/functions/api/auth', authRoutes);
app.use('/.netlify/functions/api/products', productRoutes);
app.use('/.netlify/functions/api/contact', contactRoutes);

// Database Connection - Supabase is used via controllers
console.log('Backend initialized with Supabase integration.');

app.get('/', (req, res) => {
    res.send('Tech Agent API is running');
});

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;

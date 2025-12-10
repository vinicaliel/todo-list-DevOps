const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const taskRoutes = require('./routes/tasks');
app.use('/api/tasks', taskRoutes);

// Database Connection & Sync with Retry
const connectWithRetry = async (retries = 5, delay = 5000) => {
    for (let i = 0; i < retries; i++) {
        try {
            await sequelize.authenticate();
            console.log('PostgreSQL connection established successfully.');
            await sequelize.sync();
            console.log('PostgreSQL synced.');

            app.listen(PORT, () => {
                console.log(`Server running on port ${PORT}`);
            });
            return;
        } catch (err) {
            console.error(`Error connecting to database (attempt ${i + 1}/${retries}):`, err.message);
            if (i < retries - 1) {
                console.log(`Retrying in ${delay / 1000} seconds...`);
                await new Promise(res => setTimeout(res, delay));
            }
        }
    }
    console.error('Could not connect to database after multiple attempts. Exiting.');
    process.exit(1);
};

connectWithRetry();

// Health Check
app.get('/', (req, res) => {
    res.send('API is running...');
});

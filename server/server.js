require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

//Connecting to Database
mongoose.connect(process.env.MONGODB_URI, 
    { useNewUrlParser: true, useUnifiedTopology: true });
const db_client = mongoose.connection;
db_client.on('error', (err) => console.error('Failed to connect to database'));
db_client.once('open', () => console.log('Database connection successful') );

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Mapping Routes Middlewares
const stateRoutes = require('./admin/routes/api/state');
const userRoutes = require('./routes/api/user');
const productRoutes = require('./routes/api/product');
const orderRoutes = require('./routes/api/order');
app.use('/admin/state', stateRoutes);
app.use('/user', userRoutes);
app.use('/product', productRoutes);
app.use('/order', orderRoutes);

// Starting Server
app.listen(PORT, () => console.log(`Server live on port ${PORT}.`) );

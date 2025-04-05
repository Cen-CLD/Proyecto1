const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const session = require('express-session');
const passport = require('passport');
require('./config/passport');

dotenv.config();
connectDB();

const app = express();

app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());

app.use('/api/auth', require('./routes/authRoute'));
app.use('/api/products', require('./routes/productRoute'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running in port ${PORT}`));
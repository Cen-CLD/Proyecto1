const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
//const session = require('express-session');
//const passport = require('passport');
//require("./config/passport");

dotenv.config();
connectDB();

const app = express();

/*
 * He comentado esto porque no tengo el google key ni nada
 * Node estuvo fallando por la falta de estos datos
 *
 * Cuando se mande a prod, se descomentara esto
 *
 *
 * */

//app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: true }));
//app.use(passport.initialize());
//app.use(passport.session());

app.use(express.json());
app.use(cors());

app.use("/api/auth", require("./routes/AuthRoute"));
app.use("/api/roles", require("./routes/RolRoute"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running in port ${PORT}`));


const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const PORT = 5000;
const cors = require('cors');

//Middleware
app.use(express.json());
app.use(cors());

//Start server
app.listen(PORT, () => {
  console.log(`Backend-Server started successfully at port: ${PORT}`);
});

//DB
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;

const dbConnect = `mongodb+srv://${dbUser}:${dbPass}@cluster0.1cqrd.mongodb.net/records_db?retryWrites=true&w=majority`;

mongoose
  .connect(dbConnect, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log(`Yay - Connection to cloud database established!`))
  .catch((err) => console.log('[ERROR] DB Connection failed', err));

// errorhandler

app.use(function errorHandler(err, req, res, next) {
  res.status(err.status || 500).send({
    error: { message: err.message },
  });
});

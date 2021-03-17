require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT;

//Routes
const usersRouter = require('./src/routes/usersRouter');
const signupRouter = require('./src/routes/loginRouter');
const recordRouter = require('./src/routes/recordRouter');
const loginRouter = require('./src/routes/loginRouter');

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

const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};

mongoose
  .connect(dbConnect, mongooseOptions)
  .then(() => console.log(`Yay - Connection to cloud database established!`))
  .catch((err) => console.log('[ERROR] DB Connection failed', err));

// Routes
app.use('/users', usersRouter);
app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('/dashboard', recordRouter);

//Main
app.get('/', (req, res) => {
  res.send({ message: 'Hello World' });
});

// Errorhandler
app.use((err, req, res, next) => {
  res.status(err.status || 500).send({
    error: { message: err.message },
  });
});

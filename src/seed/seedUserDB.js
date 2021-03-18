const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const mongoose = require('mongoose');
const faker = require('faker');
const User = require('../models/User');
const Record = require('../models/Record');

console.log(`build script `);

(async () => {
  // DB Connection
  const dbUser = process.env.DB_USER;
  const dbPass = process.env.DB_PASS;
  const port = process.env.PORT;

  const dbConnect = `mongodb+srv://${dbUser}:${dbPass}@cluster0.1cqrd.mongodb.net/records_db?retryWrites=true&w=majority`;

  const mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  };

  mongoose.connect(dbConnect, mongooseOptions);

  mongoose.connection.on('open', () =>
    console.log('Connection to database established!')
  );
  mongoose.connection.on('error', () =>
    console.log(`can not connect to the db`)
  );

  // delete old records
  try {
    await Record.deleteMany({});
    console.log(`Old Records deleted`);
  } catch (error) {
    console.log(error);
  }

  // 20 fake record

  const recordPromises = Array(20)
    .fill(null)
    .map(() => {
      const recordData = {
        cover: `http:localhost:${port}/statics/assets/record01.png`,
        title: faker.name.firstName() + faker.name.lastName(),
        artist: faker.company.companyName(),
        year: faker.date.past().getFullYear(),
      };

      console.log(`record ${recordData.title} has been created`);
      const newRecords = Record.create(recordData);
      return newRecords;
    });

  try {
    await Promise.all(recordPromises);
    console.log('we stored 20 records');
  } catch (error) {
    console.log(error);
  }

  // 10 fake users

  const userPromises = Array(10)
    .fill(null)
    .map(() => {
      const userData = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        nickname: faker.internet.userName(),
        email: faker.internet.email(),
        password: 'psw123',
      };
      console.log(`User ${userData.email} has been `);
      const user = new User(userData);
      return user.save();
    });

  try {
    await Promise.all(userPromises);
    console.log('we stored 10 users');
  } catch (error) {
    console.log(error);
  }

  mongoose.connection.close();
})();

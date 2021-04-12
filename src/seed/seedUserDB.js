const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const mongoose = require('mongoose');
const faker = require('faker');
const User = require('../models/User');
const Record = require('../models/Record');
const Order = require('../models/Order');
console.log(`build script `);

(async () => {
  // DB Connection
  const dbUser = process.env.DB_USER;
  const dbPass = process.env.DB_PASS;
  const dbName = process.env.DB_NAME;
  const port = process.env.PORT;

  const dbConnect = `mongodb+srv://${dbUser}:${dbPass}@cluster0.1cqrd.mongodb.net/${dbName}?retryWrites=true&w=majority`;

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
    await Order.deleteMany({});
    console.log(`old orders deleted`);
    User.deleteMany({});
    console.log(`old users deleted`);
  } catch (error) {
    console.log(error);
  }

  // 20 fake record
  let records = [];
  try {
    for (let i = 0; i < 20; i++) {
      let record = await Record.create({
        cover: `http://localhost:${port}/statics/assets/record${i + 1}.png`,
        title: faker.name.firstName() + faker.name.lastName(),
        artist: faker.company.companyName(),
        year: faker.date.past().getFullYear(),
        price: faker.commerce.price(),
      });
      records.push(record);
    }
    console.log(`stored 20 new records in the db`);
  } catch (err) {
    console.log(err);
  }

  // const recordPromises = Array(20)
  //   .fill(null)
  //   .map((_, i) => {
  //     const recordData = {
  //       cover: `http://localhost:${port}/statics/assets/record${i + 1}.png`,
  //       title: faker.name.firstName() + faker.name.lastName(),
  //       artist: faker.company.companyName(),
  //       year: faker.date.past().getFullYear(),
  //       price: faker.commerce.price(),
  //     };

  //     console.log(`record ${recordData.title} has been created`);
  //     const newRecords = Record.create(recordData);
  //     return newRecords;
  //   });

  // try {
  //   let allRecords = await Promise.all(recordPromises);
  //   console.log('we stored 20 records', allRecords);
  //   res.json(allRecords);
  // } catch (error) {
  //   console.log(error);
  // }

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

  const recordIds = records.map((record) => record._id);

  //3 orders

  try {
    await Order.insertMany([
      {
        totalPrice: faker.commerce.price(),
        records: [
          {
            recordId: faker.random.arrayElement(recordIds),
            quantity: 2,
          },
        ],
      },
      {
        totalPrice: faker.commerce.price(),
        records: [
          {
            recordId: faker.random.arrayElement(recordIds),
            quantity: 1,
          },
          {
            recordId: faker.random.arrayElement(recordIds),
            quantity: 2,
          },
        ],
      },
      {
        totalPrice: faker.commerce.price(),
        records: [
          {
            recordId: faker.random.arrayElement(recordIds),
            quantity: 2,
          },
        ],
      },
    ]);

    console.log(`stored 3 new Orders in the db`);
    const allOrdersAndRecords = await Order.find().populate('recordId');
    return allOrdersAndRecords;
  } catch (err) {
    console.log(err);
  }

  mongoose.connection.close();
})();

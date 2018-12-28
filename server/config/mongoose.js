const mongoose = require('mongoose');
const config = require('./config');

var importData = require('./importData');

// connect to mongo db
const mongoUri = config.mongo.host;
mongoose.connect(mongoUri, { keepAlive: 1 });
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${mongoUri}`);
});

//feed data into Database
importData.importData();
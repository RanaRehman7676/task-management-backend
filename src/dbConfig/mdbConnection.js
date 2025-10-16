const mongoose = require("mongoose");
const ENV = require("../Helper/ENV/environment");
const queryString = ENV.DB_STRING;

mongoose.connect(queryString).then(async () => {
  console.log('Mongoose Connection Established');
}).catch((err) => {
  console.error(`Error connecting to the database Auth. n${err}`)
})

module.exports = mongoose;
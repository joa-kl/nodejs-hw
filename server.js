const app = require('./app')
const mongoose = require('mongoose');
mongoose.Promise = require('mongoose');
require('dotenv').config()

const uriDb = process.env.DB_HOST

mongoose.set("strictQuery", false);

const connection = mongoose.connect(uriDb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection
  .then(() => {
    app.listen(3000, () => {
      // console.log("Server running. Use our API on port: 3000")
      console.log("Database connection successful");
    })
  })
  .catch((error) => {
    console.log(`Server error: ${error.message}`, uriDb);
    process.exit();
  } 
)
  




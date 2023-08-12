const app = require('./app')
const mongoose = require('mongoose');
mongoose.Promise = require('mongoose');
require('dotenv').config()

// const process = require('node:process');
const uriDb = process.env.DB_HOST

mongoose.set("strictQuery", false);

// const { exit } = require('node:process');
// const cors = require('cors')
// app.use(cors())





const connection = mongoose.connect(uriDb, {
  // useNewUrlParser: true,
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
    // process.exit(1)
    // console.log(`Server not running. Error message: ${err.message}`),
  
  )




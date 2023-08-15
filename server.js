// const app = require('./app')
// const mongoose = require('mongoose');
// mongoose.Promise = require('mongoose');
// require('dotenv').config()

// const uriDb = process.env.DB_HOST

// mongoose.set("strictQuery", false);

// const connection = mongoose.connect(uriDb, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// connection
//   .then(() => {
//     app.listen(3000, () => {
//       console.log("Database connection successful");
//     })
//   })
//   .catch((error) => {
//     console.log(`Server error: ${error.message}`, uriDb);
//     process.exit();
//   }
// )

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();

// parse application/json
app.use(express.json());
// cors
app.use(cors());

const routerApi = require('./api/index');
app.use('/api/contacts', routerApi);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

// const PORT = process.env.PORT || 3000;
const uriDb = process.env.DB_HOST;

const connection = mongoose.connect(uriDb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useFindAndModify: false,
 
//   useUnifiedTopology: true,
});

connection
  .then(() => {
    app.listen(3000, () => {
      console.log("Database connection successful");
    })
  })
  .catch((error) => {
    console.log(`Server error: ${error.message}`, uriDb);
    process.exit();
  }
)





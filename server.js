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
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const contactsRouter = require('./api/index');
const app = express();
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

require('dotenv').config();

app.use(express.json());
app.use(cors());
app.use(logger(formatsLogger))

app.use('/api/contacts', contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

const uriDb = process.env.DB_HOST;

const connection = mongoose.connect(uriDb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
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





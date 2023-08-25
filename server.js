const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const contactsRouter = require('./api/index');
const usersRouter = require('./api/user')
const app = express();
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'
mongoose.Promise = global.Promise;

require('dotenv').config();

app.use(express.json());
app.use(cors());
app.use(logger(formatsLogger))

require('./config/config-passport');

app.use('/api/contacts', contactsRouter);
app.use('/api/users', usersRouter);

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
    process.exit(1);
  }
)



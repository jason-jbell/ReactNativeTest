const app = require('express')();
require('dotenv').config();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const db = mongoose.connection;
const MONGODB_URI_PASS = process.env.PASSWORD;
const PORT = process.env.PORT;

app.use(bodyParser.json());

app.use('/api', require('./api'));

// Error handler
app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .send(err.message || "Internal server error, you're fucked!");
});

// App startup on port 3000

app.listen(PORT, () => {
  mongoose.connect(
    `mongodb+srv://Jasonjbell:${MONGODB_URI_PASS}@pos365-jasonbell.l36uwdx.mongodb.net/?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  db.on('connected', () => {
    console.log('connected to mongo');
  });
  db.on('error', (error) => {
    console.error(error);
  });
  console.log(`Fuckin it up on port ${PORT}`);
});

module.exports = { db };

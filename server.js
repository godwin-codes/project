require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const booksRouter = require('./routes/books');
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/books', booksRouter);
const PORT = process.env.PORT || 5000;
async function startServer(){
  try {
    let mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
      // start an in-memory MongoDB for development/demo
      console.log('No MONGODB_URI provided — starting in-memory MongoDB');
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongod = await MongoMemoryServer.create();
      mongoUri = mongod.getUri();
    }

    await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error('Failed to connect to MongoDB', err && err.message ? err.message : err);
    process.exit(1);
  }
}
startServer();

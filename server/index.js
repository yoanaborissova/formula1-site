const express = require('express');
const bodyParser = require('body-parser');
const articleRoutes = require('./routes/article');
const teamRoutes = require('./routes/team');
const racerRoutes = require('./routes/racer');
const commentRoutes = require('./routes/comment');
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');
const authRoutes = require('./routes/auth');
require('./database/database')();
const port = 9999;
const app = express();
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
app.use('/feed', articleRoutes);
app.use('/feed', teamRoutes);
app.use('/feed', racerRoutes);
app.use('/feed', commentRoutes);
app.use('/feed', productRoutes);
app.use('/feed', orderRoutes);
app.use('/auth', authRoutes);

// General error handling
app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
  next();
});

app.listen(port, () => { console.log(`REST API listening on port: ${port}`) });
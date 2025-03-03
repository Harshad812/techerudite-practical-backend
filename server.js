const express = require('express');
const cors = require('cors');
const usersRoute = require('./routes/users.routes');

const app = express();

var corsOptions = {
  origin: '*',
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', usersRoute);

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Server started' });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

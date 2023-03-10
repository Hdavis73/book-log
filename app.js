const express = require('express');
// const cors = require('cors')
const bodyParser = require('body-parser');
// const booksApi = require('./helpers/booksApi'); //=====
const app = express();

app.set('view engine', 'ejs');

app.listen(5000);

// app.use(cors())
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

const logRoutes = require('./routes/logs')
const findBookRoutes = require('./routes/findBook')
const bookDetailsRoutes = require('./routes/bookDetails')
const viewLibraryRoutes = require('./routes/library');

app.get('/', (req, res) => {
  res.render('index');
});

app.use('/Logs', logRoutes)

app.use('/findBook', findBookRoutes)

app.use('/bookDetails', bookDetailsRoutes)

app.use('/viewLibrary', viewLibraryRoutes);
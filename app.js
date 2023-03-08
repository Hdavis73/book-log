const express = require('express');
// const cors = require('cors')
const bodyParser = require('body-parser');
const booksApi = require('./helpers/booksApi'); //=====
const app = express();

app.set('view engine', 'ejs');

app.listen(5000);

// app.use(cors())
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

const logRoutes = require('./routes/logsRoute')

app.get('/', (req, res) => {
  res.render('index');
});

// app.get('/chooseLog', (req, res) => {
//   res.render('choose-log');
// });

app.use('/chooseLog', logRoutes)

app.get('/bookLog', (req, res) => {
  res.render('fullLog');
});

app.get('/chapterLog', (req, res) => {
  res.render('chapterLog');
});

app.get('/findBook', async (req, res) => {
  bestSellers = await booksApi.getBestSellers();
  res.render('findBook', { items: bestSellers, bestSellers: true });
});

app.get('/searchBook/:searchQuery', async (req, res) => {
  console.log('first');

  res.send({ redirectTo: `/searchDisplay/${req.params.searchQuery}` });
});

app.get('/searchDisplay/:searchQuery', async (req, res) => {
  let searchItems;
  searchItems = await booksApi.getSearchedBook(req.params.searchQuery);
  console.log('third');
  res.render('findBook', { items: searchItems, bestSellers: false });
});

app.get('/loadBestSellerDetails/:body', async (req, res) => {
  console.log('in get req');

  res.send({ redirectTo: `/bestSellerDetails/${req.params.body}` });
});

app.get('/bestSellerDetails/:body', async (req, res) => {
  // console.log(req.params)
  let clickedBook = await booksApi.getSelectedBestSellerDetails(req.params.body);
  let clickedBookDetails = {
    title: clickedBook.volumeInfo.title,
    cover: clickedBook.volumeInfo.imageLinks.thumbnail,
    author: clickedBook.volumeInfo.authors[0],
    description: clickedBook.volumeInfo.description,
    rating: clickedBook.volumeInfo.averageRating,
  };

  console.log(clickedBook);
  res.render('book-details', { bookDetails: clickedBookDetails });
});

app.get('/loadSelectedDetails/:body', async (req, res) => {
  console.log('in get req');

  res.send({ redirectTo: `/selectedDetails/${req.params.body}`, runBestSellers: false });
});

app.get('/selectedDetails/:body', async (req, res) => {
  // console.log(req.params)
  let clickedBook = await booksApi.getSelectedBookDetails(req.params.body);
  let clickedBookDetails = {
    title: clickedBook.volumeInfo.title,
    cover: clickedBook.volumeInfo.imageLinks.thumbnail,
    author: clickedBook.volumeInfo.authors[0],
    description: clickedBook.volumeInfo.description,
    rating: clickedBook.volumeInfo.averageRating,
  };
  console.log(clickedBook);
  res.render('book-details', { bookDetails: clickedBookDetails });
});

app.get('/viewLibrary', (req, res) => {
  res.render('view-library');
});










// // ================================================================================================

// const express = require('express');
// // const cors = require('cors')
// const bodyParser = require('body-parser');
// const booksApi = require('./helpers/booksApi'); //=====
// const app = express();

// app.set('view engine', 'ejs');

// app.listen(5000);

// // app.use(cors())
// app.use(bodyParser.json());
// app.use(express.static('public'));
// app.use(express.urlencoded({ extended: true }));

// app.get('/', (req, res) => {
//   res.render('index');
// });

// app.get('/chooseLog', (req, res) => {
//   res.render('choose-log');
// });

// app.get('/bookLog', (req, res) => {
//   res.render('fullLog');
// });

// app.get('/chapterLog', (req, res) => {
//   res.render('chapterLog');
// });

// app.get('/findBook', async (req, res) => {
//   bestSellers = await booksApi.getBestSellers();
//   res.render('findBook', { items: bestSellers, bestSellers: true });
// });

// app.get('/searchBook/:searchQuery', async (req, res) => {
//   console.log('first');

//   res.send({ redirectTo: `/searchDisplay/${req.params.searchQuery}` });
// });

// app.get('/searchDisplay/:searchQuery', async (req, res) => {
//   let searchItems;
//   searchItems = await booksApi.getSearchedBook(req.params.searchQuery);
//   console.log('third');
//   res.render('findBook', { items: searchItems, bestSellers: false });
// });

// app.get('/loadBestSellerDetails/:body', async (req, res) => {
//   console.log('in get req');

//   res.send({ redirectTo: `/bestSellerDetails/${req.params.body}` });
// });

// app.get('/bestSellerDetails/:body', async (req, res) => {
//   // console.log(req.params)
//   let clickedBook = await booksApi.getSelectedBestSellerDetails(req.params.body);
//   let clickedBookDetails = {
//     title: clickedBook.volumeInfo.title,
//     cover: clickedBook.volumeInfo.imageLinks.thumbnail,
//     author: clickedBook.volumeInfo.authors[0],
//     description: clickedBook.volumeInfo.description,
//     rating: clickedBook.volumeInfo.averageRating,
//   };

//   console.log(clickedBook);
//   res.render('book-details', { bookDetails: clickedBookDetails });
// });

// app.get('/loadSelectedDetails/:body', async (req, res) => {
//   console.log('in get req');

//   res.send({ redirectTo: `/selectedDetails/${req.params.body}`, runBestSellers: false });
// });

// app.get('/selectedDetails/:body', async (req, res) => {
//   // console.log(req.params)
//   let clickedBook = await booksApi.getSelectedBookDetails(req.params.body);
//   let clickedBookDetails = {
//     title: clickedBook.volumeInfo.title,
//     cover: clickedBook.volumeInfo.imageLinks.thumbnail,
//     author: clickedBook.volumeInfo.authors[0],
//     description: clickedBook.volumeInfo.description,
//     rating: clickedBook.volumeInfo.averageRating,
//   };
//   console.log(clickedBook);
//   res.render('book-details', { bookDetails: clickedBookDetails });
// });

// app.get('/viewLibrary', (req, res) => {
//   res.render('view-library');
// });

const express = require('express');
// const cors = require('cors')
const bodyParser = require('body-parser');

const booksApi = require('./helpers/booksApi'); //======

const app = express();

app.set('view engine', 'ejs');

app.listen(5000);

// app.use(cors())
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/chooseLog', (req, res) => {
  res.render('choose-log');
});

app.get('/bookLog', (req, res) => {
  res.render('fullLog');
});

app.get('/chapterLog', (req, res) => {
  res.render('chapterLog');
});

app.get('/findBook', async (req, res) => {

    bestSellers = await booksApi.getBestSellers()
//   console.log(bestSellers)
    // const bestSellers = booksApi.googleIsbnResults
  res.render('findBook', { bestSellers: bestSellers })
  // const bestSellersSecond = await booksApi.fetchGoogleBooksByIsbn()
  // setTimeout(async function()  {
  // },5000)
});

// app.post('/renderBestSellers',(req,res) => {
//     console.log(req.body)
//     console.log(req.body.bestSellers[1].volumeInfo)
//     // res.send({response: 'done'})
//     // res.redirect('/findBook')
//     res.render('findBook', {bestSellers: req.body.bestSellers})
// })

// app.get('/showBestSellers', (req,res) => {
//     res.render('findBook')
// })

app.post('/bookDetails', (req, res) => {
  // res.redirect(`/showBookDetails:${JSON.stringify(req.body)}`)
  // console.log(req.body)

  // const {title,author,rating,cover,description} = req.body

  // res.render('book-details', {title:title, author:author, rating:rating, cover:cover, description:description})

  res.send({ redirectTo: `showBookDetails/${JSON.stringify(req.body)}` });
});

app.get('/processBookDetails/:body', async (req, res) => {
  // console.log(req.params.details.title)
  // let params = JSON.stringify(req.params.details)
  // console.log(req.params)

  console.log('in get req');
  res.send({ redirectTo: `showBookDetails/${JSON.stringify(req.params)}` });
  // res.render('book-details')
});

app.get('/showBookDetails/:body', (req, res) => {
  res.render('book-details');
});

const fetch = require('node-fetch');

let searchByIsbn = 'https://www.googleapis.com/books/v1/volumes?q=isbn:';
let searchResults = [];
let googleIsbnResults = [];
let bestSellerIsbn = [];
let runBestSellers = true

//fetch best sellers isbns in ny times book api, fetch book info using isbn results, return book info
const getBestSellers = async () => {
  //needed to reset array on for every call so it doesnt stack up
  if (googleIsbnResults.length > 0) {
    bestSellerIsbn = [];
    googleIsbnResults = [];
  }

  const response = await fetch('https://api.nytimes.com/svc/books/v3/lists.json?list-name=hardcover-fiction&&api-key=fdXgMoy5fKdWsnKYYNWbUpbrQ99O9xJe');
  const data = await response.json();

  for (let i = 0; i < data.results.length; i++) {
    bestSellerIsbn.push(data.results[i].isbns[0]);
  }

  for (const result of bestSellerIsbn) {
    const response = await fetch(searchByIsbn + result.isbn10 + '&maxResults=20');
    const data = await response.json();
    googleIsbnResults.push(data.items[0]);
  }

  return googleIsbnResults;
};

const getSelectedBestSellerDetails = (i) => {
  console.log(googleIsbnResults[i]);
  return googleIsbnResults[i];
};

const getSearchedBook = async (query) => {
  console.log('second');
  if(searchResults.length != 0) searchResults = []
  let googleBooksUrl = `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=20`;

  let response = await fetch(googleBooksUrl);
  let data = await response.json();

  for (let i = 0; i < data.items.length; i++) {
    if (
      data.items[i].volumeInfo.imageLinks &&
      !data.items[i].volumeInfo.title.toLowerCase().includes('summary') &&
      !data.items[i].volumeInfo.title.toLowerCase().includes('ebook') &&
      !data.items[i].volumeInfo.title.toLowerCase().includes('collection')
    )
      searchResults.push(data.items[i]);
  }


  return searchResults;
};

const getSelectedBookDetails = (i) => {
    console.log(searchResults[i]);
    return searchResults[i];
  };

module.exports = {
  getBestSellers,
  getSearchedBook,
  getSelectedBestSellerDetails,
  getSelectedBookDetails,
};

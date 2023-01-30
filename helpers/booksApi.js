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


  if(searchResults.length > 0)  runBestSellers = false

const getSelectedBookDetails = (i) => {
    console.log(searchResults[i]);
    return searchResults[i];
  };

//fetch isbns from ny best sellers list in google api

// const fetchGoogleBooksByIsbn = async () => {
//     for (const result of bestSellerIsbn) {
//         const response = await fetch(searchByIsbn + result.isbn10 + '&maxResults=20');
//         const data = await response.json();
//         googleIsbnResults.push(data.items[0]);
//         // setTimeout(function(){
//             // console.log(googleIsbnResults)
// }
// return googleIsbnResults;

// }

// async function fetchGoogleBooksByIsbn() {
//   //   for (let i =  0; i < bestSellerIsbn.length; i++) {
//   //     const response = await fetch(searchByIsbn + bestSellerIsbn[i].isbn10 + '&maxResults=20');
//   //     const data = await response.json();
//   //     googleIsbnResults.push(data.items[0]);

//   //     console.log('done');
//   //   }

//   for (const result of bestSellerIsbn) {
//     const response = await fetch(searchByIsbn + result.isbn10 + '&maxResults=20');
//     const data = await response.json();
//     googleIsbnResults.push(data.items[0]);
//     // setTimeout(function(){
//         // console.log(googleIsbnResults)
//         return googleIsbnResults;
//     //   },4000)
//     console.log('done');
//   }

// }

//save new query and call function to search for new results
// function newInput() {
//   query = searchInput.value;
//   let googleBooksUrl = `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=20`;
//   //   const bookContainer = document.querySelector('.book-group');
//   //   let books = Array.from(document.querySelectorAll('.single-book'));

//   console.log(query);

//   //   for (let i = books.length - 1; i >= 0; i--) {
//   //     bookContainer.removeChild(books[i]);
//   //     searchResults = [];
//   //   }

//   fetchGoogleBooks(googleBooksUrl);
// }

// async function fetchGoogleBooks(url) {
//   let response = await fetch(url);
//   let data = await response.json();

//   for (let i = 0; i < data.items.length; i++) {
//     if (
//       data.items[i].volumeInfo.imageLinks &&
//       !data.items[i].volumeInfo.title.toLowerCase().includes('summary') &&
//       !data.items[i].volumeInfo.title.toLowerCase().includes('ebook') &&
//       !data.items[i].volumeInfo.title.toLowerCase().includes('collection')
//     )
//       searchResults.push(data.items[i]);
//   }

//   console.log(data);

//   // for (let i = 0; i < searchResults.length; i++) {
//   //   createGroup();
//   // }

//   // console.log(searchResults);

//   // applyInfo(searchResults);
//   // showBookDetails();

//   return searchResults;
// }

module.exports = {
  getBestSellers,
  getSearchedBook,
  //   newInput,
  //   fetchGoogleBooks,
  getSelectedBestSellerDetails,
  getSelectedBookDetails,
  runBestSellers
};

const searchBtn = document.querySelector('.search-book-btn');
const searchInput = document.querySelector('.search-book-input');
const firstBook = document.querySelector('.book-group').firstElementChild
// let query
// // const bestSellersUrl =
// //   "https://api.nytimes.com/svc/books/v3/lists.json?list-name=hardcover-fiction&&api-key=fdXgMoy5fKdWsnKYYNWbUpbrQ99O9xJe";
// let searchByIsbn = 'https://www.googleapis.com/books/v1/volumes?q=isbn:';
let query;
let runBestSellers = true
// let searchResults = [];
// let bestSellerIsbn = [];
// let googleIsbnResults = [];
console.log(firstBook)
if(firstBook.classList.contains('bestSeller')) showBestSellerDetails()
else showSearchedBookDetails()
// // // create necessary elements for layout
// // function createGroup() {
// //   const div = document.createElement("div");
// //   const img = document.createElement("img");
// //   const h3 = document.createElement("h3");
// //   const bookGroup = document.querySelector(".book-group");

// //   bookGroup.appendChild(div);
// //   div.appendChild(img);
// //   div.appendChild(h3);

// //   div.classList.add("single-book");
// //   img.classList.add("book-cover");
// //   h3.classList.add("book-title");
// // }

// // function applyInfo(arrName) {
// //   let bookDivs = Array.from(document.querySelectorAll(".single-book"));
// //   console.log(bookDivs);

// //   for (let i = 0; i < bookDivs.length; i++) {
// //     bookDivs[i].querySelector("img").src =
// //       arrName[i].volumeInfo.imageLinks.thumbnail;
// //     bookDivs[i].querySelector("h3").innerText = arrName[i].volumeInfo.title;
// //   }
// // }

// //fetch the NYTimes Bestseller API and add the ISBN numbers of each to an array to be searched with google books api later
// async function fetchBestSellerIsbnNy() {
//   const response = await fetch('https://api.nytimes.com/svc/books/v3/lists.json?list-name=hardcover-fiction&&api-key=fdXgMoy5fKdWsnKYYNWbUpbrQ99O9xJe');
//   const data = await response.json();

//   for (let i = 0; i < data.results.length; i++) {
//     bestSellerIsbn.push(data.results[i].isbns[0]);
//   }

//   fetchGoogleBooksByIsbn();
// }

// // //fetch books by ISBN with Google Books API so more information can be displayed
// async function fetchGoogleBooksByIsbn() {
//   for (let i = 0; i < bestSellerIsbn.length; i++) {
//     const response = await fetch(searchByIsbn + bestSellerIsbn[i].isbn10 + '&maxResults=20');
//     const data = await response.json();
//     googleIsbnResults.push(data.items[0]);
//     // createGroup();

//     console.log('done');
//   }

//   fetchBestSellersToBackend();

//   // applyInfo(googleIsbnResults);
// }
// // ================
// async function fetchBestSellersToBackend() {
//   const response = await fetch('renderBestSellers', {
//     method: 'post',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({
//       bestSellers: googleIsbnResults
//     }),
//   });

//   const data = await response.json();
//   console.log(data);

//   if (data.redirectTo) location.assign(data.redirectTo);
// }
// // ================

// // fetchBestSellerIsbnNy();

// // //on search btn click, removing previous search results, saving query as a variable and calling a funciton to display new results
searchBtn.addEventListener('click', searchBook);

async function searchBook() {
  let query = searchInput.value;
  console.log('searching')

  console.log(query);

  const response = await fetch(`/searchBook/${query}`);
  const result = await response.json();
  if (await result.redirectTo) location.href = result.redirectTo;

  showSearchedBookDetails()
}

// // //display search results, parameters on what will be displayed based on title is because google has a variety of results that are not relevent to this apps function such as summarys, collections and ebook only editions
// async function fetchGoogleBooks(url) {
//   let response = await fetch(url);
//   let data = await response.json();

//   for (let i = 0; i < data.items.length; i++) {
//     if (
//       data.items[i].volumeInfo.imageLinks &&
//       !data.items[i].volumeInfo.title.toLowerCase().includes("summary") &&
//       !data.items[i].volumeInfo.title.toLowerCase().includes("ebook") &&
//       !data.items[i].volumeInfo.title.toLowerCase().includes("collection")
//     )
//       searchResults.push(data.items[i]);
//   }

// //   console.log(data);

// //   for (let i = 0; i < searchResults.length; i++) {
// //     createGroup();
// //   }

// //   console.log(searchResults);

// //   applyInfo(searchResults);
// //   showBookDetails();
// // }

//setting a fuction for when a title is clicked on
// let useBestSellers;

// if (!searchInput.value) useBestSellers = true;
// if (runBestSellers === true) showBestSellerDetails();


  function showSearchedBookDetails() {
    let books = Array.from(document.querySelectorAll('.single-book'));
    console.log('in book details')
  
    for (let i = 0; i < books.length; i++) {
      books[i].addEventListener('click', async () => {
        console.log(i);
  
        const response = await fetch(`/loadSelectedDetails/${i}`, {
          method: 'get',
        });
        const result = await response.json();
        if (result.redirectTo) location.href = result.redirectTo;
      });
    }
  }

function showBestSellerDetails() {
  let books = Array.from(document.querySelectorAll('.single-book'));

  for (let i = 0; i < books.length; i++) {
    books[i].addEventListener('click', async () => {
      console.log(i);

      const response = await fetch(`/loadBestSellerDetails/${i}`, {
        method: 'get',
      });
      const result = await response.json();
      if (result.redirectTo) location.href = result.redirectTo;
    });
  }
}



// window.onload = showBestSellerDetails();

// }, 6000);

// books[i].addEventListener("click", async () => {
//   // for(let i = 0; i < searchResults.length; i++){
//   console.log("working");
//   console.log(searchResults[i]);
//   let data = searchResults[i];
//   let bookInfo = {
//     title: data.volumeInfo.title,
//     author: data.volumeInfo.authors[0],
//     rating: data.volumeInfo.averageRating,
//     cover: data.volumeInfo.imageLinks.thumbnail,
//   };

//   console.log(bookInfo);

// //       const response = await fetch("bookDetails", {
// //         method: "post",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(bookInfo),
// //       });
// //         const result = await response.json();

// //         if(result.redirectTo) location.assign(result.redirectTo)
//   });
// }
// }
// fetchBestSellerIsbnNy()

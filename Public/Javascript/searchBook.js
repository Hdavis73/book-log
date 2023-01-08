const searchBtn = document.querySelector(".search-book-btn");
const searchInput = document.querySelector(".search-book-input");
// const bestSellersUrl =
//   "https://api.nytimes.com/svc/books/v3/lists.json?list-name=hardcover-fiction&&api-key=fdXgMoy5fKdWsnKYYNWbUpbrQ99O9xJe";
let searchByIsbn = "https://www.googleapis.com/books/v1/volumes?q=isbn:";
let query;
let searchResults = [];
let bestSellerIsbn = [];
let googleIsbnResults = [];

// create necessary elements for layout
function createGroup() {
  const div = document.createElement("div");
  const img = document.createElement("img");
  const h3 = document.createElement("h3");
  const bookGroup = document.querySelector(".book-group");

  bookGroup.appendChild(div);
  div.appendChild(img);
  div.appendChild(h3);

  div.classList.add("single-book");
  img.classList.add("book-cover");
  h3.classList.add("book-title");
}

function applyInfo(arrName){
    let bookDivs = Array.from(document.querySelectorAll(".single-book"));
    console.log(bookDivs);

    for(let i = 0; i < bookDivs.length; i++) {
        bookDivs[i].querySelector("img").src =
        arrName[i].volumeInfo.imageLinks.thumbnail;
        bookDivs[i].querySelector("h3").innerText =
          arrName[i].volumeInfo.title;
      }
}
//fetch the NYTimes Bestseller API and add the ISBN numbers of each to an array to be searched with google books api later

async function fetchBestSellerIsbnNy(){
  const response = await fetch( "https://api.nytimes.com/svc/books/v3/lists.json?list-name=hardcover-fiction&&api-key=fdXgMoy5fKdWsnKYYNWbUpbrQ99O9xJe")
  const data = await response.json()

  for (let i = 0; i < data.results.length; i++) {
    bestSellerIsbn.push(data.results[i].isbns[0]);
  }

  fetchGoogleBooksByIsbn()

}

//fetch books by ISBN with Google Books API so more information can be displayed
async function fetchGoogleBooksByIsbn(i) {
    for (let i = 0; i < bestSellerIsbn.length; i++) {
    const response = await fetch(searchByIsbn + bestSellerIsbn[i].isbn10 + "&maxResults=20")
    const data = await response.json()
        googleIsbnResults.push(data.items[0]);
        createGroup();
        console.log('done')
    }
    
    applyInfo(googleIsbnResults)
}


fetchBestSellerIsbnNy();


//on search btn click, removing previous search results, saving query as a variable and calling a funciton to display new results
searchBtn.addEventListener("click", () => {
  query = searchInput.value;
  let googleBooksUrl = `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=20`;
  const bookContainer = document.querySelector(".book-group");
  let books = Array.from(document.querySelectorAll(".single-book"));

  console.log(query);

  for (let i = books.length - 1; i >= 0; i--) {
    bookContainer.removeChild(books[i]);
    searchResults = [];
  }

  fetchGoogleBooks(googleBooksUrl);
});

async function fetchGoogleBooks(url){
    let response = await fetch(url)
    let data = await response.json()

    for (let i = 0; i < data.items.length; i++) {

        if (
          data.items[i].volumeInfo.imageLinks &&
          !data.items[i].volumeInfo.title.toLowerCase().includes("summary") &&
          !data.items[i].volumeInfo.title.toLowerCase().includes("ebook") &&
          !data.items[i].volumeInfo.title.toLowerCase().includes("collection")
        )
          searchResults.push(data.items[i]);
        }

          console.log(data);

          for (let i = 0; i < searchResults.length; i++) {
            createGroup();
          }
    
          console.log(searchResults);
    
        applyInfo(searchResults)
}

//display search results, parameters on what will be displayed based on title is because google has a variety of results that are not relevent to this apps function such as summarys, collections and ebook only editions
// function fetchGoogleBooks(url) {
//   fetch(url)
//     .then((res) => res.json())
//     .then((data) => {
//       for (let i = 0; i < data.items.length; i++) {
//         // console.log(data.items[i].volumeInfo.title)

//         if (
//           data.items[i].volumeInfo.imageLinks &&
//           !data.items[i].volumeInfo.title.toLowerCase().includes("summary") &&
//           !data.items[i].volumeInfo.title.toLowerCase().includes("ebook") &&
//           !data.items[i].volumeInfo.title.toLowerCase().includes("collection")
//         )
//           searchResults.push(data.items[i]);
//       }

//       console.log(data);

//       for (let i = 0; i < searchResults.length; i++) {
//         createGroup();
//       }

//       console.log(searchResults);

//     applyInfo(searchResults)
//     });
// }


const searchBtn = document.querySelector('.search-book-btn');
const searchInput = document.querySelector('.search-book-input');
const firstBook = document.querySelector('.book-group').firstElementChild
let query;

if(firstBook.classList.contains('bestSeller')) showBestSellerDetails()
else showSearchedBookDetails()

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

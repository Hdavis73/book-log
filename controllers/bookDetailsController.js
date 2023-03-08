const booksApi = require('../helpers/booksApi')

module.exports = {
    loadBestSellerDetails: async (req, res) => {
        console.log('in get req');
      
        res.send({ redirectTo: `bookDetails/bestSellerDetails/${req.params.body}` });
      },

    showBestSellerDetails:  async (req, res) => {
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
      },

      loadSearchedBookDetails: async (req, res) => {
        console.log('in get req');
        res.send({ redirectTo: `/bookDetails/selectedDetails/${req.params.body}`, runBestSellers: false });
      },

      showSearchedBookDetails: async (req, res) => {
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
      },
}
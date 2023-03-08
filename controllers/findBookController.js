const booksApi = require('../helpers/booksApi'); //=====

module.exports = {
  loadFindBook: async (req, res) => {
    bestSellers = await booksApi.getBestSellers();
    res.render('findBook', { items: bestSellers, bestSellers: true });
  },

  searchTitle: async (req, res) => {
    console.log('first');

    res.send({ redirectTo: `/findBook/searchDisplay/${req.params.searchQuery}` });
  },

  displaySearchedTitle: async (req, res) => {
    let searchItems;
    searchItems = await booksApi.getSearchedBook(req.params.searchQuery);
    console.log('third');
    res.render('findBook', { items: searchItems, bestSellers: false });
  }
};

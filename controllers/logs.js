module.exports = {
    getChooseLog:  (req, res) => {
        res.render('choose-log');
      },
    getBookLog: (req, res) => {
        res.render('fullLog');
      },
    getChapterLog: (req, res) => {
        res.render('chapterLog');
      }
}
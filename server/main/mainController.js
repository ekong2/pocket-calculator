module.exports = {
  homepage: function (req, res, next) {
    //can check header options on req if necessary
    //for crossbrowser issues
    res.send('index');
  }
};

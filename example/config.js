// Config values
var path = require("path");

module.exports = function () {
   return {
      app: path.resolve(__dirname, 'app', 'app.js'),
      root: path.resolve(__dirname, '..'),
      database: {
         sync: true,
         dialect: 'sqlite',
         logging: false,
         storage: "data.db"
      }
      //ssr: true
   }
}

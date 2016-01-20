var powr = require("powr/server");

var config = require('./config.js')();
var app = powr.createApp(config);

app.launch();

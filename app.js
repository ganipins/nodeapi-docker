var express = require('express');
var app = express();

const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || 'localhost'
 
app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get("/api/numbers", (req, res) => {
  res.send([1,2,3]);
})
 
app.listen(PORT, () => {
  console.log(`app is running. and access url: http://${HOST}:${PORT}`)
})
const fs = require("fs");
const http = require("http");
const url = require("url");

const server = http.createServer((req, res) => {
  console.log(req.url);
  res.end("HELLO FROM THE SERVER");
   const pathName = req.url;

  if  (pathName === "/" || pathName ==='/overview'){
    res
  }
});




server.listen(8000, () => {
  console.log(" listening on port 8000");
});

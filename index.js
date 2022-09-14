const fs = require("fs");
const http = require("http");
const url = require("url");
const slugify = require("slugify");
const replaceTemplate = require('./modules/replaceTemplate')
// replace Template here



const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const slugs = dataObj.map(el => slugify(el.productName, {lower: true}))
console.log(slugs);


const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  //   OVERVIEW
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "content-type": "text/html" });

    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join("");
    // console.log(cardsHtml);

    output = tempOverview.replace(/{%PRODUCT_CARDS%}/g, cardsHtml);

    res.end(output);
  } else if (pathname === "/product") {

    const product = dataObj[query.id];
    res.writeHead(200, { "content-type": "text/html" });
    const output = replaceTemplate(tempProduct, product);
    res.end(output);

    // console.log(query, pathname)
    // res.end('This is product page')


  } else if (pathname === "/api") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(data);
  } else {
    res.writeHead(404);
    res.end("page not found");
  }
});

server.listen(8003, () => {
  console.log(" listening on port 8003");
});

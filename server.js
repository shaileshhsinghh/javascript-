const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;
const PUBLIC_DIR = path.join(__dirname, "public");

const server = http.createServer((req, res) => {

  console.log(req.method, req.url);

  // API ROUTE
  if (req.url === "/api/hello") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Hello from server" }));
    return;
  }

  // STATIC FILE SERVING
  let filePath = path.join(PUBLIC_DIR, req.url === "/" ? "index.html" : req.url);

  fs.readFile(filePath, (err, content) => {

    if (err) {

      if (err.code === "ENOENT") {
        res.writeHead(404);
        res.end("404 Not Found");
      } else {
        res.writeHead(500);
        res.end("Server Error");
      }

    } else {

      const ext = path.extname(filePath);

      const mimeTypes = {
        ".html": "text/html",
        ".css": "text/css",
        ".js": "text/javascript",
        ".json": "application/json",
        ".png": "image/png",
        ".jpg": "image/jpeg"
      };

      const contentType = mimeTypes[ext] || "text/plain";

      res.writeHead(200, { "Content-Type": contentType });
      res.end(content);
    }

  });

});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
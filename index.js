const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');

const server = http.createServer((req, res) => {

    //Get file path
    let filepath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);
    let extname = path.extname(filepath);

    let contentType = 'text/html';

    //Get correct content type
    switch(extname) {
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'text/javascript';
            break;
    }

    //Send data to website
    fs.readFile(filepath, (err, content) => {
        if(err) {
            if(err.code = 'ENOENT') {

            }
        } else {
            res.writeHead(200, { 'content-type': contentType });
            res.end(content);
        }
    })

    
    //console.log(`Loaded file ${filepath}`);
})

server.listen(process.env.PORT || 3000);
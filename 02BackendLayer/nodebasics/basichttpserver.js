const http = require('http')
const fs = require('fs');
var contentType = '';
var data = fs.readFileSync('./config.json')
const config = JSON.parse(data);
console.log(config.port)

var server = http.createServer((req, res)=> {
    console.log(req.method)
    console.log(req.url);

    if (req.url == "/sample.json") {
        contentType = 'application/json'
    } else {
        contentType = 'text/html'
    }


    fs.readFile('files'+ req.url, (err, data)=>{
        console.log('Contents: ' + data);
        if(data == undefined){
            res.writeHead(404); 
            res.end("No content available")
        }
        else{
            console.log('******test*****')
            res.writeHead(200,{'Content-type': contentType});
            // res.writeHead()
            res.write(''+ data);
            res.end();
        }
       
    })
    
})

server.listen(config.port, ()=> { console.log ('listening on port: ', config.port)});
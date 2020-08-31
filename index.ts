import * as http from "http";
import {IncomingMessage, ServerResponse} from "http";
import * as url from "url";
import * as path from "path";
import * as fs from "fs";

const server = http.createServer();
const staticPath = path.resolve(__dirname, 'public')

server.on('request',(request:IncomingMessage, response:ServerResponse) => {
  const { pathname, query } = url.parse(request.url)
  const filePath = path.resolve(staticPath, pathname.substr(1) || 'index.html')
  const reqArr = []
  request.on('data', chunk => {
    reqArr.push(chunk)
  })
  request.on('end', () => {
    const reqBody = Buffer.concat(reqArr).toString()
    fs.readFile(filePath, (err, data) => {
      if(err) return handleErr(err, response)
      response.write(data)
      response.end()
    })

  })
})

server.listen(8888,'localhost')

const handleErr = (err, response) => {
  if(err.errno === -4058) {
    response.statusCode = 404;
    response.write();
  }
  response.end();
}

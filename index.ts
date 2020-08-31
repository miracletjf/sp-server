import * as http from "http";
import {IncomingMessage, ServerResponse} from "http";

const server = http.createServer();

server.on('request',(request:IncomingMessage, response:ServerResponse) => {
  response.write('request success!\n');
  response.end();
})

server.listen(8888,'localhost')

/**
 *
 *  name: TYPER BOT
 *  author: zenkarsha
 *  version: 0.0.1
 *
 */


//==========================================
// init requires
//==========================================
require('ansicolor').nice;



//==========================================
// server
//==========================================
const Server = require('./server')
const server = new Server();
server.start();

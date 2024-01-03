//==========================================
// init requires
//==========================================
const express = require('express');
const Typer = require('./typer');
const Filename = require('./filename');
const Savefile = require('./savefile');
const Datetime = require('./datetime');
const log = require('log-with-statusbar')();
const typer = new Typer();
const filename = new Filename();
const savefile = new Savefile();
const datetime = new Datetime();



//==========================================
// class
//==========================================
class Server {
  constructor(port) {
    this.app = express();
    this.port = port || 4444;

    this.routes();
  }

  routes() {
    // GET http://127.0.0.1:4444/api/click
    this.app.get('/api/click', (req, res) => {
      let type = req.query.type;
      let x = req.query.x;
      let y = req.query.y;

      typer.click(x, y);

      let json = `{"type":"${type}","response":"success"}`;
      res.send(`jsonCallback(${json})`);
    });

    // GET http://127.0.0.1:4444/api/typer
    this.app.get('/api/typer', (req, res) => {
      let type = req.query.type;
      let x = req.query.x;
      let y = req.query.y;
      let text = req.query.text;

      typer.type(x, y, text);

      let json = `{"type":"${type}","response":"success"}`;
      res.send(`jsonCallback(${json})`);
    });

    // GET http://127.0.0.1:4444/api/drag
    this.app.get('/api/drag', (req, res) => {
      let type = req.query.type;
      let start_x = req.query.start_x;
      let start_y = req.query.start_y;
      let end_x = req.query.end_x;
      let end_y = req.query.end_y;

      typer.drag(start_x, start_y, end_x, end_y);

      let json = `{"type":"${type}","response":"success"}`;
      res.send(`jsonCallback(${json})`);
    });

    // GET http://127.0.0.1:4444/api/press
    this.app.get('/api/press', (req, res) => {
      let type = req.query.type;
      let key = req.query.key;

      typer.press(key);

      let json = `{"type":"${type}","response":"success"}`;
      res.send(`jsonCallback(${json})`);
    });

    // GET http://127.0.0.1:4444/api/refresh
    this.app.get('/api/refresh', (req, res) => {
      log.warn('👉👉👉 Receive refresh request...');

      let file = filename.create(req);
      let content = req.query.result;

      savefile.save('log', file, content);

      log.warn(`Current time: ${datetime.currentDatetime()}`);
      log.warn(content);

      let x = req.query.x;
      let y = req.query.y;

      typer.click(x, y, true);
      typer.standby();

      let json = `{"type":"refresh","response":"success","file":"${file}","content":"${content}"}`;
      res.send(`jsonCallback(${json})`);
    });

    // GET http://127.0.0.1:4444/api/stuck-refresh
    this.app.get('/api/stuck-refresh', (req, res) => {
      log.warn('⚠️⚠️⚠️ Receive stuck refresh request...');

      let x = req.query.x;
      let y = req.query.y;

      typer.click(x, y, true);
      typer.standby();

      let json = `{"type":"stuck_refresh","response":"success"}`;
      res.send(`jsonCallback(${json})`);
    });
  }

  start() {
    this.app.listen(this.port, () => {
      console.clear();

      log.info("-----------------------------------------------".white);
      log.info("🤘 TYPER BOT (port:4444)");
      log.info("-----------------------------------------------".white);
      log.setStatusBarText(["", "API is ready, wating to typing...".white]);
    });
  }
}

module.exports = Server;

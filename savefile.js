//==========================================
// init requires
//==========================================
const fs = require('fs');
const log = require('log-with-statusbar')();



//==========================================
// class
//==========================================
class Savefile {
  save(folder, filename, content) {
    fs.writeFile(`${__dirname}/${folder}/${filename}.txt`, content, (error, data) => {
      if (error)
        log.error(error);
    });
  }
}

module.exports = Savefile;

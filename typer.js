//==========================================
// init requires
//==========================================
const robot = require('robotjs');
const log = require('log-with-statusbar')();



//==========================================
// class
//==========================================
class Typer {
  constructor() {
    this.standby_x = 860;
    this.standby_y = 540;
  }

  click(x, y, speed_up = false) {
    robot.setMouseDelay(1);
    if (speed_up) robot.moveMouse(x, y);
    else robot.moveMouseSmooth(x, y);
    robot.mouseClick();

    log.warn(`Click x: ${x}, click y: ${y}`);
  }

  type(x, y, speed_up = false) {
    robot.setMouseDelay(1);
    if (speed_up) robot.moveMouse(x, y);
    else robot.moveMouseSmooth(x, y);
    robot.mouseClick();

    robot.typeString(text);

    log.warn(`Type x: ${x}, y: ${y}, text: ${text}`);
  }

  drag(start_x, start_y, end_x, end_y) {
    robot.moveMouse(start_x, start_y);
    robot.mouseToggle("down");
    robot.dragMouse(end_x, end_y);
    robot.mouseToggle("up");

    log.warn(`Drag from x: ${start_x}, y: ${start_y} to x: ${end_x}, y: ${end_y}`);
  }

  press(key) {
    robot.keyTap(key);

    log.warn(`Press ${key}`);
  }

  standby() {
    robot.setMouseDelay(1);
    robot.moveMouseSmooth(this.standby_x, this.standby_y);
    robot.mouseClick();

    log.info(`Standby x: ${this.standby_x}, y: ${this.standby_y}`);
  }
}

module.exports = Typer;

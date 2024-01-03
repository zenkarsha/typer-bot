//==========================================
// init requires
//==========================================
const Datetime = require('./datetime')
const datetime = new Datetime();



//==========================================
// class
//==========================================
class Filename {
  create(req) {
    let mode_name = req.query.mode_name;
    let huge_lose = req.query.huge_lose;
    let round_profit = req.query.round_profit;
    let round_fund = req.query.round_fund;
    let round_bets = req.query.round_bets;
    let round_first_win_keep_lose = req.query.round_first_win_keep_lose;
    let max_lose_rounds = req.query.max_lose_rounds;

    let filename = datetime.currentDatetime(true);

    if (mode_name == 'change_seed') filename += ` [${mode_name}]`;
    else {
      filename += ` [${mode_name}][profit ${round_profit}][fund ${round_fund}][bets ${round_bets}][${round_first_win_keep_lose}]`;

      if (huge_lose == 1) filename += `⚠️[${max_lose_rounds}]⚠️`;
      else filename += `[${max_lose_rounds}]`;
    }

    return filename;
  }
}

module.exports = Filename;

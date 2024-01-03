//==========================================
// init requires
//==========================================



//==========================================
// class
//==========================================
class Datetime {
  currentDatetime(for_filename = false) {
    let date_object = new Date();
    let year = date_object.getFullYear();
    let month = ('0' + (date_object.getMonth() + 1)).slice(-2);
    let date = ('0' + date_object.getDate()).slice(-2);
    let hours = ('0' + date_object.getHours()).slice(-2);
    let minutes = ('0' + date_object.getMinutes()).slice(-2);
    let seconds = ('0' + date_object.getSeconds()).slice(-2);

    if (for_filename)
      return `${year}-${month}-${date} ${hours}${minutes}${seconds}`;
    else
      return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
  }
}

module.exports = Datetime;

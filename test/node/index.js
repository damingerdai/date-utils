var dateUitls = require('./date-utils.js');
var date = new Date();
var dateStr1 = dateUitls.format(date);
var dateStr2 = date.getFullYear() + '-' + (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1) + '-' + (date.getDate() < 10 ? '0' : '') + date.getDate();
if (dateStr1 !== dateStr2) {
    throw new Error(
        'format error'
    )
}
var date2 = dateUitls.addDay(new Date(), 1);
console.log(dateUitls.format(date2));
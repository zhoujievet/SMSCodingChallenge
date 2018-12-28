var Item = require('../models/item.model');
var importFile = require('./data.json');

/**
 * 
 * @param {*} s input string format "8/28/2011" "mm/dd/yyyy"
 * return javascript Date Object with UTC time
 */
function stringToDate(s) {
    let res = s.split("/");
    //the argument monthIndex based on 0. 0 = Januar and 11 = Dezember
    return new Date(Date.UTC(res[2], parseInt(res[0])-1, res[1]));
}

function importData() {
    importFile.forEach( (importItem) => {
        importItem.start_date = stringToDate(importItem.start_date);
        importItem.end_date = stringToDate(importItem.end_date);
      });

    Item.count().exec((err, count) => {
        if (count > 0) {
            return;
        }
        Item.create(importFile, (error) => {
            if(!error) {
                console.log('database import succeed, ready to go...');
            }
        });
    });
}

module.exports = {
    importData
}
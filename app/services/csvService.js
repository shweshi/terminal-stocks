const fs = require('fs')
const jsonexport = require('jsonexport');

module.exports = {
    csvExport: csvExport,
};

function csvExport(data) {
    jsonexport(data, function (err, csv) {
        if (err) return console.error(err);
        fs.writeFileSync('terminal-stocks_' + Date.now() + '_.csv', csv);
    })
}
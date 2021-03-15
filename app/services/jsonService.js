const fs = require('fs')

module.exports = {
    jsonExport: jsonExport,
};

function jsonExport(data) {
    fs.writeFileSync('terminal-stocks_' + Date.now() + '_.json', JSON.stringify(data));
}
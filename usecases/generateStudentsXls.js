const json2xls = require('json2xls');
const fs = require('fs');

const generateStudentsXls = (students) => {
    return new Promise((resolve, reject) => {
        try {
            const xls = json2xls(students);
            const filename = "relatorio";
            const path = `tmp/xls/${filename}.xlsx`
            fs.writeFileSync(path, xls, 'binary');
            resolve(filename);
        } catch (err) {
            reject(err);
        }
    });
};

module.exports = generateStudentsXls;
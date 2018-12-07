const json2xls = require('json2xls');
const fs = require('fs');

const generateStudentsCsv = (students) => {
    return new Promise((resolve, reject) => {
        try {
            const xls = json2xls(students);
            const filename = Date.now();
            const path = `tmp/${filename}.xlsx`
            // fs.writeFileSync(path, xls, 'binary');
            resolve(xls);
        } catch (err) {
            reject(err);
        }
    });
};

module.exports = generateStudentsCsv;
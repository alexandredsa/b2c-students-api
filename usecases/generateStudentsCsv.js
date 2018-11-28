const json2csv = require('json2csv').parse;
const fields = ['Nome', 'E-mail', 'Telefone', 'Próximo de:'];
const opts = { fields };


const generateStudentsCsv = (students) => {
    return new Promise((resolve, reject) => {
        try {
            const csv = json2csv(students, opts);
            resolve(csv);
        } catch (err) {
            reject(err);
        }
    });
};

module.exports = generateStudentsCsv;
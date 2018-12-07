const json2xls = require('json2xls');
const fs = require('fs');

const json2csv = require('json2csv').parse;

const fields = ['Nome', 'E-mail', 'Telefone', 'Próximo de:', 'Cadastrado Por:'];
const opts = { fields, excelStrings: true };
const renameKeys = require('rename-keys');

const headers = {
    "name": "Nome",
    "email": "E-mail",
    "phone": "Telefone",
    "registeredBy": "Cadastrado Por:",
    "liveNear": "Próximo de:"
}

const generateStudentsCsv = (students) => {
    return new Promise((resolve, reject) => {
        try {
            const xls = json2xls(students);
            resolve(new Buffer(xls));
        } catch (err) {
            reject(err);
        }
    });
};

module.exports = generateStudentsCsv;
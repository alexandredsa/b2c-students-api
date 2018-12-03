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
    const renamedStudents = students.map(student => renameKeys(student, (k, v) => {
        return headers[k];
    }));

    return new Promise((resolve, reject) => {
        try {
            const csv = json2csv(renamedStudents, opts);
            resolve(new Buffer(csv));
        } catch (err) {
            reject(err);
        }
    });
};

module.exports = generateStudentsCsv;
const json2xls = require('json2xls');
const fs = require('fs');
const renameKeys = require('rename-keys');

const headers = {
    "name": "Nome",
    "email": "E-mail",
    "phone": "Telefone",
    "registeredBy": "Cadastrado Por:",
    "liveNear": "Próximo de:"
}

const generateStudentsXls = (students) => {
    const renamedStudents = students.map(student => renameKeys(student, (k, v) => {
        return headers[k];
    }));
    return new Promise((resolve, reject) => {
        try {
            const xls = json2xls(renamedStudents, {
                fields: ["Nome", "E-mail", "Telefone", "Cadastrado Por:", "Próximo de:"]
            });
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
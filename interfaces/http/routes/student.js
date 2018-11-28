const registerStudent = require('../../../usecases/registerStudent');
const listStudents = require('../../../usecases/listStudents');
const generateStudentsCsv = require('../../../usecases/generateStudentsCsv');

module.exports = {
    save: (req, res, next) => {
        const student = req.body;
        const user = req.params.user;
        registerStudent(student, user.id)
            .then(result => res.json(201, result))
            .catch(err => {
                console.error(err);
                res.json(err.status, err.msg);
            })
    },
    list: (req, res, next) => {
        listStudents()
            .then(students => res.json(200, students))
            .catch(err => {
                console.error(err);
                res.json(err.status, err.message);
            })
    },
    generateListCsv: (req, res, next) => {
        listStudents()
            .then(students => generateStudentsCsv(students))
            .then(csv => res.json(200, csv))
            .catch(err => {
                console.error(err);
                res.json(err.status, err.message);
            })
    }
}
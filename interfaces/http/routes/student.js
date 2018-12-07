const registerStudent = require('../../../usecases/registerStudent');
const listStudents = require('../../../usecases/listStudents');
const listUser = require('../../../usecases/listUser');
const generateStudentsCsv = require('../../../usecases/generateStudentsCsv');
const Account = require('../../../domains/account');

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
        const { registeredBy } = req.params;

        if (registeredBy) {
            Account.find({ login: registeredBy }).sort('login').select("-password")
                .then(users => {
                    listStudents(users.map(u => u._id))
                        .then(students => res.json(200, students))
                        .catch(err => {
                            console.error(err);
                            res.json(err.status, err.message);
                        })
                })
        } else {
            listStudents()
                .then(students => res.json(200, students))
                .catch(err => {
                    console.error(err);
                    res.json(err.status, err.message);
                })
        }
    },

    generateListCsv: (req, res, next) => {
        const { registeredBy } = req.params;

        if (registeredBy) {
            Account.find({ login: registeredBy }).sort('login').select("-password")
                .then(users => {
                    listStudents(users.map(u => u._id))
                        .then(data => res.xls('data.xlsx', data))
                        .catch(err => {
                            console.error(err);
                            res.json(err.status, err.message);
                        })
                })
        } else {
            listStudents()
                .then(students => generateStudentsCsv(students))
                .then(csv => {
                    res.setHeader('Content-disposition', 'attachment; filename=data.csv');
                    res.set('Content-Type', 'text/csv');
                    res.send(200, csv);
                }).catch(err => {
                    console.error(err);
                    res.json(err.status, err.message);
                })
        }
    }
}
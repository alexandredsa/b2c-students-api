const registerStudent = require('../../../usecases/registerStudent');
const listStudents = require('../../../usecases/listStudents');
const listUser = require('../../../usecases/listUser');
const generateStudentsXls = require('../../../usecases/generateStudentsXls');
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

    generateListXls: (req, res, next) => {
        const { registeredBy } = req.params;

        if (registeredBy) {
            Account.find({ login: registeredBy }).sort('login').select("-password")
                .then(users => listStudents(users.map(u => u._id)))
                .then(students => generateStudentsXls(students))
                .then(filename => {
                    req.params["xls-filename"] = filename;
                    next()
                }).catch(err => {
                    console.error(err);
                    res.json(err.status, err.message);
                })
        } else {
            listStudents()
                .then(students => generateStudentsXls(students))
                .then(filename => {
                    req.params["xls-filename"] = filename;
                    next()
                }).catch(err => {
                    console.error(err);
                    res.json(err.status, err.message);
                })
        }
    }
}
const Student = require('../domains/student');

const listStudents = (accountIds) => {
    return new Promise((resolve, reject) => {
        let filter = {};

        if (accountIds && accountIds.length > 0) {
            filter = {
                'registeredBy': {
                    $in: accountIds
                }
            };
        }

        Student.find(filter).populate('registeredBy', 'login')
            .then(students => {
                return students.map(s => {
                    const student = s.toObject();
                    student.registeredBy = student.registeredBy.login;
                    return student;
                })
            })
            .then(students => resolve(students))
            .catch(err => reject(err))
    })
}

module.exports = listStudents;
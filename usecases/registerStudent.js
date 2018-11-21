const Student = require('../domains/student');
const Account = require('../domains/account');

const registerStudent = (student, user) => {
    student.registeredBy = user;
    return new Student(student).save()
}

module.exports = registerStudent
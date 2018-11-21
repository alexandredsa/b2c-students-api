const Student = require('../domains/student');
const Account = require('../domains/account');

const registerStudent = (student, user) => {
    return new Student(student, user._id).save()
}

module.exports = registerStudent
const Student = require('../domains/student');
const Account = require('../domains/account');

const registerStudent = (studentObj, user) => {
    let promises = [];

    if (Array.isArray(studentObj)) {
        students = studentObj.map(student => { 
            student.registeredBy = user; 
            return student;
        });
        promises = students.map(student => new Student(student).save());
        return Promise.all(promises);
    } else {
        const student = studentObj;
        student.registeredBy = user;
        return new Student(student).save();
    }

}

module.exports = registerStudent
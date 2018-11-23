const Student = require('../domains/student');
const Account = require('../domains/account');

const registerStudent = (studentObj, user) => {
    let promises = [];
    if(Array.isArray(studentObj)) {
        students = studentObj.map(student => student.registeredBy = user);
        promises = students.map(student => new Student(student).save());
    } else {
        student.registeredBy = user;
        promises.push(new Student(student).save());
    }
    
    return Promise.all(promises);
}

module.exports = registerStudent
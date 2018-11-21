const Student = require('../domains/student');

const listStudents = () => {
    return Student.find().select("-registeredBy");   
}

module.exports = listStudents;
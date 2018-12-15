const Student = require('../domains/student');
const Account = require('../domains/account');

const registerStudent = (studentObj, user) => {
    let promises = [];
    return new Promise((resolve, reject) => {
        if (Array.isArray(studentObj)) {
            students = studentObj.map(student => {
                student.registeredBy = user;
                return student;
            });
            promises = students.map(student => Student.findOne({
                "liveNear": student.liveNear,
                "name": student.name,
                "email": student.email,
                "phone": student.phone
            }));

            Promise.all(promises)
                .then(foundStudents => {
                    console.log(foundStudents)
                    studentsToPersist = students.filter(s => !foundStudents.find(fs => fs && fs.email == s.email));
                    promises = studentsToPersist.map(student => new Student(student).save());
                    return Promise.all(promises)
                })
                .then(() => resolve(students))
                .catch(err => reject(err))
        } else {
            const student = studentObj;
            student.registeredBy = user;
            Student.findOne({
                "liveNear": student.liveNear,
                "name": student.name,
                "email": student.email,
                "phone": student.phone
            })
                .then(foundStudent => {
                    console.log(foundStudent)
                    if (!foundStudent) {
                        resolve(new Student(student).save())
                    } else {
                        resolve(foundStudent)
                    }
                })
                .catch(err => reject(err))
        }

    })

}

module.exports = registerStudent
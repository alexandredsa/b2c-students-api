const express = require('express');
const app = express();
const { buildSchema } = require('graphql');
const graphqlHTTP = require('express-graphql');
const { importSchema } = require('graphql-import');
const schemaContent = importSchema('./domains/schema.graphql');

const graphqlSchema = buildSchema(schemaContent);


const students = [  // Dummy data
    {
        id: 1,
        name: 'Brian',
        email: 'brian@gmail.com',
        liveNear: 'LIBERDADE'
    },
    {
        id: 2,
        name: 'Cassio',
        email: 'cassio@gmail.com',
        liveNear: 'CONSOLACAO'
    },
    {
        id: 20,
        name: 'Leandro',
        email: 'leandro@gmail.com',
        liveNear: 'SANTO_AMARO'
    }
];

const getStudent = (args) => { 
    return students.filter(student => student.id == args.id)[0];
}

const retrieveStudents = (args) => { // Return a list of users. Takes an optional gender parameter
    if (args.liveNear) {
        const liveNear = args.liveNear;
        return students.filter(student => student.liveNear === liveNear);
    }
    
    return users;
}

const root = {
    student: getStudent,
    students: retrieveStudents
};


class Http {
    init() {
        app.use('/graphql', graphqlHTTP({
            schema: graphqlSchema,
            rootValue: root,
            graphiql: true
        }));

        app.listen(process.env.PORT, () => console.log(`Express GraphQL Server Now Running On Port ${process.env.PORT}`));
    }
}

module.exports = Http;


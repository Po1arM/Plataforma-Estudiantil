const {MongoClient} = require('mongodb');
const uri = 'mongodb+srv://fguzman:CroIEqnhT4yZcsrF@cluster0.8fcma.mongodb.net/plataforma?retryWrites=true&w=majority'

connect();
async function connect() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db('plataforma');
        console.log(`Connected to DB ${db.databaseName}`);

        const student = await db.collection('estudiante');

        const cursorStudent = await student.find();
        cursorStudent.forEach(element => console.log(element));

    } catch (error) {
        console.log(`Something bad happend ${error}`)
    }finally{
        client.close();
    }

}

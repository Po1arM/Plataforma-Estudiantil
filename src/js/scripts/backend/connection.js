const {MongoClient} = require('mongodb');
const uri = 'mongodb+srv://admin:Fj028929@plataformaestudiantil.uzjq1.mongodb.net/plataforma?retryWrites=true&w=majority'

connect();
async function connect() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db('plataforma');
        console.log(`Connected to DB ${db.databaseName}`);

        const student = await db.collection('users');

        const cursorStudent = await student.find();
        cursorStudent.forEach(element => console.log(element));

    } catch (error) {
        console.log(`Something bad happend ${error}`)
    }finally{
        client.close();
    }

}
const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb+srv://system:fj0289@plataformaestudiantil.uzjq1.mongodb.net?retryWrites=true&w=majority"

async function connect(){
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db("plataforma");
        console.log(`Connected to database ${db.databaseName}`);
       
    }catch (ex) {
        console.error(`Somenthing bad happend ${ex}`)
    }
    finally {
        client.close();
    }

}

connect();
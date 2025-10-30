import {Db, MongoClient} from "mongodb";


let client: MongoClient;
let db: Db;


export const connectToMongoDB = async (): Promise<void>=>{
    try {
        console.log("funcion ejecutandose")
        const urlMongo = "mongodb+srv://kirk:patataEspacial@mongomake.3ta2r.mongodb.net/?appName=MongoMake"
        client = new MongoClient(urlMongo);
        await client.connect();
        db = client.db("Vicio")
        console.log("veeeenga chaval, estas conectado a mongo");
        
    } catch (error) {
        console.error("no te conectas a mongo capitan");
        process.exit(1);
    }
};


export const getDB = (): Db => db;


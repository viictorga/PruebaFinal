import {Db, MongoClient} from "mongodb";


let client: MongoClient;
let db: Db;


export const connectToMongoDB = async (): Promise<void>=>{
    try {
        console.log("funcion ejecutandose")
        const urlMongoProfe = "mongodb+srv://kirk:patataEspacial@mongomake.3ta2r.mongodb.net/?appName=MongoMake"
        const urlMongoMio = "mongodb+srv://1234:1234@cluster1.l0zqfnc.mongodb.net/?appName=Cluster1"
        client = new MongoClient(urlMongoMio);
        await client.connect();
        // Vicio
        db = client.db("sample_supplies")
        console.log("veeeenga chaval, estas conectado a mongo");
        
    } catch (error) {
        console.error("no te conectas a mongo capitan");
        process.exit(1);
    }
};


export const getDB = (): Db => db;


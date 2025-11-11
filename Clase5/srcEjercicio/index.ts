import { connectToMongoDB } from "./mongo";
import express from "express";
import rutillas from "./routes"
import rutillas2 from "./routes2"
import {Db, MongoClient} from "mongodb";


let client: MongoClient;
let db: Db;



connectToMongoDB();
const app = express();
app.use(express.json())



app.use("/api/albums", rutillas);
app.use("/api/alumbs/total", rutillas2)


app.listen(3000, ()=>{console.log("esto funciona y esta en el puerto 3000")})



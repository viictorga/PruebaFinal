import { connectToMongoDB } from "./mongo";
import express from "express";
import rutillas from "./routes/albums"
import auth from "./routes/auth"
import {Db, MongoClient} from "mongodb";


let client: MongoClient;
let db: Db;



connectToMongoDB();
const app = express();
app.use(express.json())



app.use("/api/albums", rutillas);
app.use("/auth", rutillas)


app.listen(3000, ()=>{console.log("esto funciona y esta en el puerto 3000")})



import { connectToMongoDB } from "./mongo";
import express from "express";
import rutillasProducts from "./routes/products"

import rutasAuth from "./routes/auth"
import {Db, MongoClient} from "mongodb";


let client: MongoClient;
let db: Db;



connectToMongoDB();
const app = express();
app.use(express.json())



app.use("/api/products", rutillasProducts);
app.use("/api/auth", rutasAuth);
app.use((req, res)=>{
    res.status(404).json({message: "la url no es correcta"})
})


app.listen(3000, ()=>{console.log("esto funciona y esta en el puerto 3000")})



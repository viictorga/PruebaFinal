import axios from "axios"
import express from "express"
import cors from "cors"

const app = express()
const port = 3000;

app.use(express.json())
app.use()

console.log(await(axios.get(`http://localhost:3000/personas`)))
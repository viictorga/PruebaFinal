import {Router} from "express"
import {getDB} from "./mongo"

const router = Router()
const coleccion = () => getDB().collection("Prueba1");

router.get("/", async (req, res) =>{
    try {
        const albums = await coleccion().find().toArray()
        res.json(albums)
        
    } catch (error) {
        res.status(404).json({error: "la has liado mucho"})
    }
})


export default router;
import {Router} from "express"
import {getDB} from "./mongo"
import { ObjectId } from "mongodb";

const router = Router()
//const coleccion = () => getDB().collection("sales");
const coleccion = () => getDB().collection("miCO1");

router.get("/", async (req, res) =>{
    try {
        const albums = await coleccion().find().toArray()
        res.json(albums)
        
    } catch (error) {
        res.status(404).json({error: "entrastes por el catch del get, la has liado jefe"})
    }
});

router.post("/", async (req,res)=>{
    try {

        const resultado = await coleccion().insertOne(req.body);
        const idCreado = resultado.insertedId
        const resultadoObjeto = await coleccion().findOne({_id : idCreado})
        res.status(201).json({
            mongoAck: resultado, 
            mongoObject: resultadoObjeto}
        );
    } catch (error) {
        res.status(404).json({error: "entrastes por el catch del post, la has liado jefe"})
    }
})
router.get("/:id", async (req, res) =>{
    try {

        const album = await coleccion().findOne({_id: new ObjectId(req.params.id)})
        album ? res.status(200).json(album) : res.status(404).json({error: "no se encontro el id"})
        
    } catch (error) {
        res.status(404).json({error: "la has liado"})
    }
});
router.put("/:id", async (req,res)=>{
    try {

        const resultado = await coleccion().updateOne(
            {_id: new ObjectId(req.params.id)}, 
            {$set: req.body}
        )
        resultado ? res.status(202).json(resultado) : res.status(404).json({error: "no se ha encontrado el id"})
    } catch (error) {
        res.status(404).json({error: "entrastes por el catch del put, lno se actualizo nah"})
    }
})
router.delete("/:id", async (req,res)=>{

    try {
        const resultado = await coleccion().deleteOne({
            _id: new ObjectId(req.params.id)
        })
        resultado ? res.status(203).json({message: "eliminado, no me tengo que ir a magisterio, por ahora"}) : res.status(404).json({error: "no se encontro el id para borrarlo"})

    
    } catch (error) {
        res.status(404).json({error: "no se ha borrado nah, la has liado"})

    }
    
})


export default router;
import {Router} from "express"
import {getDB} from "./mongo"
import { ObjectId } from "mongodb";

const router = Router()
//const coleccion = () => getDB().collection("sales");
const coleccion = () => getDB().collection("miCO1");



router.post("/", async (req,res)=>{
    try {

        const resultado = await coleccion().insertOne(req.body);
        const idCreado = resultado.insertedId
        const resultadoObjeto = await coleccion().findOne({_id : idCreado}) // esto devuelve un decuento, el cual es el objeto 
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
router.post("/many", async(req,res)=>{
    try {
        const resultado = await coleccion().insertMany(req.body.albums);
        res.status(201).json({resultado});
    } catch (error) {
        res.status(404).json({error: "no se han insertado todos, la has liado"})
        
    }

})
router.get("/", async(req,res)=>{
    try { // $ todo delante, eq == , neq !=, gT >, gTe >=, lt <, lte <=, in (dentro de), nin 
        const queryYear = req.query?.year;
        const newer = req.query.newer ? Number(req.query?.newer) : null;
        const publicationCountry = req?.query?.country
            const resultado = await coleccion().find(queryYear ? {pages: {$gt : newer}}: {}).toArray();
            const resultado2 = await coleccion().find(newer ? {pages: {$gt : newer}}: {}).toArray();
            const resultado3 = await coleccion().find(publicationCountry ? {publicationCountry : {$in : [publicationCountry]}}: {})
            res.status(201).json({resultado});
        

       
    } catch (error) {
        res.status(404).json({error: "no te las puedo devolver todas, la has liado"})

    }

})
router.get("/", async(req,res)=>{
    try { // $ todo delante, eq == , neq !=, gT >, gTe >=, lt <, lte <=, in (dentro de), nin 
        const page = Number(req.query?.page)|| 1;
        const limite = Number(req.query?.limit ) || 25;
        const skip = (page-1) * limite;
        const albumes = coleccion().find().sort({pages: 1}).skip(skip).limit(limite).toArray()
        res.json({info: {limite : limite, pagina: page}, resultado: albumes})

       
    } catch (error) {
        res.status(404).json({error: "no te las puedo devolver todas, la has liado"})

    }

})





export default router;
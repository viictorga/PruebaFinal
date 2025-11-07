import {Router} from "express"
import {getDB} from "./mongo"
import { ObjectId, WithId } from "mongodb";

const router = Router()
//const coleccion = () => getDB().collection("sales");
const coleccion = () => getDB().collection("miCO1");

type Resultado = {
    buenos: Objeto[],
    malos: ObjectId[]
}
type Objeto = {
    _id: ObjectId,
    title: string,
    author: string,
    pages: number
}
// type Document = {
//     title: string,
//     author: string,
//     pages: number
// }
const resultado1 : Resultado = {
    buenos: [],
    malos: []
}


const comprobarObjBD = (miObjeto: any) => {

    if ((miObjeto.title && miObjeto?.author && miObjeto.pages) && miObjeto.pages > 0) {
        return true;
    }
    return false;
    
}
router.get("/", async(req,res)=>{
    try { // $ todo delante, eq == , neq !=, gT >, gTe >=, lt <, lte <=, in (dentro de), nin 
        const queryPages = req.query?.pages;
            
        const page = Number(req.query?.page)|| 1;
        const limite = Number(req.query?.limit ) || 25;
        const skip = (page-1) * limite;
        

            const resultado  = await coleccion().find(queryPages ? {pages: {$gt : queryPages}}: {}).sort({pages: 1}).skip(skip).limit(limite).toArray();
            const comprobados : Resultado = resultado.reduce<Resultado>((acc, n) => {
                const comprobacion = comprobarObjBD(n);
                if(comprobacion){
                    const nuevoLibro : Objeto = {
                        _id: n._id,
                        author: n.author,
                        title: n.title,
                        pages: n.pages
                    }
                    acc.buenos.push(nuevoLibro);
                }
               else{
                    acc.malos.push(n._id);
               }
               return acc;

            },resultado1)

            res.status(201).json({info: {limite: limite, page: page}, resultado: comprobados.buenos});
    } catch (error) {
        res.status(404).json({error: "no te las puedo devolver todas, la has liado"})

    }

});
router.get("/:id", async (req, res) =>{
    try {

        const album = await coleccion().findOne({_id: new ObjectId(req.params.id)})
        album ? res.status(200).json(album) : res.status(404).json({error: "no se encontro el id"})
        
    } catch (error) {
        res.status(404).json({error: "la has liado"})
    }
});


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






export default router;
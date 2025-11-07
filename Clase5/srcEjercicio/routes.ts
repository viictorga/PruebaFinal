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
    _id?: ObjectId,
    titulo: string,
    autor: string,
    paginas: number
}
// type Document = {
//     title: string,
//     author: string,
//     pages: number
// }



const comprobarObjBD = (miObjeto: any): boolean => {

    if ((miObjeto.title && miObjeto?.author && miObjeto.pages) && miObjeto.pages > 0) {
        return true;
    }
    return false;
    
}
router.get("/", async(req,res)=>{
    try { // $ todo delante, eq == , neq !=, gT >, gTe >=, lt <, lte <=, in (dentro de), nin 
        const resultado1 : Resultado = {
            buenos: [],
            malos: []
        }   
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
                        autor: n.author,
                        titulo: n.title,
                        paginas: n.pages
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
        const comprobar = comprobarObjBD(req.body);
        if(comprobar){
            const resultado = await coleccion().insertOne(req.body);
            const idCreado = resultado.insertedId
            const resultadoObjeto = await coleccion().findOne({_id : idCreado}) // esto devuelve un decuento, el cual es el objeto 
            res.status(201).json({
                mongoAck: resultado, 
                mongoObject: resultadoObjeto}
            );
        }            
        

        res.status(404).json({error: "el body no es exactamente un libro, algun dato falla"})

       
    } catch (error) {
        res.status(404).json({error: "entrastes por el catch del post, la has liado jefe"})
    }
})
router.post("/many" , async(req,res)=>{
  try{
    let resultado2: Resultado ={ buenos:[], malos:[] };
    const miArray : any [] = req.body.libros;
    const comprobados: Resultado = miArray.reduce<Resultado>((acc, elem) => {
       let comprobacion = comprobarObjBD(elem)
       if (comprobacion){
        console.log("conseguimos entrar")
          const nuevoLibro : Objeto = {
            
            titulo: elem.titulo,
            autor: elem.autor,
            paginas: elem.paginas
          }
          acc.buenos.push(nuevoLibro);
       }
       else{
        
       }
      
      return acc;

    }, resultado2 );
      resultado2 = {buenos:[],malos:[]}
      console.log(comprobados)
     const result = await coleccion().insertMany(comprobados.buenos)
     res.status(201).json({resultado:result});

  }catch(err){
        res.status(404).json({error: "No se han insertado todas"})
  }
})

router.put("/:id", async (req,res)=>{
    try {
        const comprobar = comprobarObjBD(req.body);
        if(comprobar){

        }

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
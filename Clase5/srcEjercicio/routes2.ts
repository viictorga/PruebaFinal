import {Router} from "express"
import {getDB} from "./mongo"
import { ObjectId, WithId } from "mongodb";

const router2 = Router()
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

const comprobarObjBD = (miObjeto: any): boolean => {

    if ((miObjeto.title && miObjeto?.author && miObjeto.pages) && miObjeto.pages > 0) {
        return true;
    }
    return false;
    
}

router2.get("/totalPaginas", async(req, res)=>{

    try {
        const misCosas = await(coleccion().find().toArray())
        
        const totalPaginas: number = misCosas.reduce((acc: number,n)=>{
            if(comprobarObjBD(n)){
                acc = acc + n?.paginas;
                return acc;
            }
            return acc;
        },0)

        res.status(200).json({status: "funcionó, cojonudo", result: totalPaginas})
        
    } catch (error) {
        res.status(404).json({status: "no funcionó, cagastes"})

    }
    

})
router2.get("/nombresAutores", async(req,res)=>{
    try {
       const queryPages = req.query?.paginas;
            
        const page = Number(req.query?.page)|| 1;
        const limite = Number(req.query?.limit ) || 25;
        const skip = (page-1) * limite;

       


        const misCosas = await(coleccion().find((queryPages ? {paginas: {$eq: queryPages}}: {})).sort({pages: 1}).skip(skip).limit(limite).toArray())
        const misAutores : string[] = [];
        const autoresFinales: string[] = misCosas.reduce((acc: string[],n)=>{
            if(comprobarObjBD(n)){
                const autor = n.autor;
                return {
                    ...acc, autor
                };
            }
            return acc;
        },misAutores)
        res.status(200).json({status: "funcionó, cojonudo", result: autoresFinales})
        
    } catch (error) {
        res.status(404).json({status: "no funcionó, cagastes"})

    }
    
    
})
router2.get("/nombresLibros", async(req,res)=>{
    try {
        const queryPages = req.query?.paginas;
            
        const page = Number(req.query?.page)|| 1;
        const limite = Number(req.query?.limit ) || 25;
        const skip = (page-1) * limite;




        const misCosas = await(coleccion().find(queryPages ? {paginas: {$eq: queryPages}}: {}).sort({pages: 1}).skip(skip).limit(limite).toArray())
        const misAutores : string[] = [];
        const titulosFinales: string[] = misCosas.reduce((acc: string[],n)=>{
            if(comprobarObjBD(n)){
                const titulo = n.titulo;
                return {
                    ...acc, titulo
                };
            }
            return acc;
        },misAutores)
        res.status(200).json({status: "funcionó, cojonudo", result: titulosFinales})
        
    } catch (error) {
        res.status(404).json({status: "no funcionó, cagastes"})

    }
    
    
})



export default router2;
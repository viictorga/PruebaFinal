import {Router} from "express";
import dotenv from "dotenv";
import {getDB} from "../mongo"
import { Collection, ObjectId, WithId } from "mongodb";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import {JwtPayload, Producto, User } from "./types"
import {AuthRequest, verifyToken} from "../middleware/verifyToken"
dotenv.config();

const router = Router();

const coleccion = () => getDB().collection<User>("users"); 
const coleccion1 = () => getDB().collection<Producto>("products"); 


type UserJWT= {
    id : string,
    email: string
}



router.get("/",async(req, res)=>{
    try {
        const queryName = (req.query?.name) ;
        const queryDescription = (req.query?.description) ;
        const queryIdCreator = new ObjectId(req.query?.idCreator?.toString()) ;
        const queryBuyer = new ObjectId(req.query?.idBuyer?.toString()) ;

        const productos = await coleccion1().find().toArray()
        let productos2 : WithId<Producto>[] = productos;
        if(queryName){
            productos2 = productos2?.filter((n)=>n.name === queryName)
        }
        if(queryDescription){
            productos2 = productos2?.filter((n)=>n.description === queryDescription)
        }
        if(queryIdCreator){
            productos2 = productos2?.filter((n)=>n.idCreatorUser === queryIdCreator)
        }
        if(queryBuyer){
            productos2 = productos2?.filter((n)=>n.idsBuyers.includes(queryBuyer))
        }

        if(productos2.length === 0){
            res.status(200).json({message : "No se encontro ningun producto"})
        }

        res.status(200).json({message: "Filtro aplicado", result:productos2})
    } catch (err) {
        console.error("POST /api/products error:", err);
        res.status(500).json({message: "Error interno"});
    }
})

router.post("/add", verifyToken, async (req: AuthRequest, res) => {
    try{

        const usuario = req.user as UserJWT
        const userId = new ObjectId(usuario.id)
        const { name, description } = req.body as Producto;

        if(!name || typeof name !== "string" || name.trim().length === 0){
            return res.status(400).json({message: "Campo 'name' es obligatorio"});
        }

        const productToInsert: Producto = {
            idCreatorUser: userId,
            idsBuyers: [],
            name,
            description: description && typeof description === "string" ? description.trim() : "",
        };

        const result = await coleccion1().insertOne(productToInsert);
        const created = await coleccion1().findOne({_id: result.insertedId});
        res.status(201).json(created);
    }catch(err){
        console.error("POST /api/products error:", err);
        res.status(500).json({message: "Error interno"});
    }
});
router.put("/update/:name2", verifyToken, async(req: AuthRequest, res) =>{
    try {
    const name1 = req.params.name2;
    const queryDescription = (req.query?.description) || "no hay descripcion";
    const resultado = await coleccion1().updateOne({name: name1},{$set: {description : queryDescription.toString()}})
    res.status(201).json(resultado);
    } catch (error) {
        console.error("PUT /api/products error:", error);
        res.status(500).json({message: "Error interno"});
    }
    
})
router.delete("/delete/:name2", verifyToken, async(req: AuthRequest, res) =>{
    try {
    const name1 = req.params.name2;
    const resultado = await coleccion1().deleteOne({name: name1})
    res.status(201).json(resultado);

    } catch (error) {
        console.error("DELETE /api/products error:", error);
        res.status(500).json({message: "Error interno"});
    }
    
})
router.put("/buy/:name2", verifyToken, async(req: AuthRequest, res) =>{
    try {
        const name1 = req.params.name2;
        const usuario = req.user as UserJWT;
      
        const usuId = new ObjectId(usuario?.id)
        
        
        const producto = await coleccion1().findOne({name: name1});
        console.log(usuId)
        console.log(producto)
        const existe = producto?.idsBuyers.some((n)=> n.equals(usuId))

        if(existe){
            return res.status(200).json({messge: "lo has comprado varias veces, te ha molado "})
        }
         if(producto?.idCreatorUser.equals(usuId)){
            return res.status(404).json({message: "eres el creador y has intentado comprar tu producto"})
         }   
       
        const miArray = producto?.idsBuyers;
        miArray?.push(usuId);
        const productoActualizado = await coleccion1().updateOne({name: name1},{$set: {idsBuyers: miArray}});
        return res.status(200).json({message: "Cojonudo, has comprado algo", result: productoActualizado})
           
        
        
    } catch (error) {
        console.error("PUT /api/products error:", error);
        res.status(500).json({message: "Error interno"});
    }
    
})



export default router;
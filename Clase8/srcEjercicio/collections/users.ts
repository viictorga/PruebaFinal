import { ObjectId } from "mongodb";
import { getDB } from "../db/mongo"
import bcrypt from "bcryptjs";



const coleccion = "users";



export const createUser = async(email: string, password: string) =>{
    const db = getDB();
    const passEncriptada = await bcrypt.hash(password,10);

    const result = await db.collection(coleccion).insertOne({
        email,
        password: passEncriptada
    })

    return result.insertedId.toString();
}

export const validateUser = async(email:string, password: string) =>{
    const db = getDB();
    const user = await db.collection(coleccion).findOne({email});

    if(!user) {
        return null;
    }
    const contraseñaCorrecta = await bcrypt.compare(password, user.password)
    if(!contraseñaCorrecta) return null;

    return user;
}


export const findUserById = async(id: string) =>{
    const db = getDB();
    return await db.collection(coleccion).findOne({_id: new ObjectId(id)})
}

import {ObjectId, WithId} from "mongodb"

export type Producto = {
_id?: ObjectId,
idCreatorUser: ObjectId,
idsBuyers: ObjectId[],
name: string, 
description: string
}
export type User = {
    _id?: ObjectId ,//(auto‑generado)
username: string, //único, requerido
email: string, //único, requerido, formato email válido
passwordHash: string, //(hash bcrypt)
}
export type JwtPayload = {
    id: string;
    email: string;
}

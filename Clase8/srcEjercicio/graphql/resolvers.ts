import { IResolvers } from "@graphql-tools/utils"
import { VideoGame } from "../types/VideoGame";
import { getDB } from "../db/mongo";
import { ObjectId } from "mongodb";
import { createUser, validateUser } from "../collections/users";
import { signToken } from "../auth";

const coleccion = "videojuegoss"

let db = getDB();

const coleccionVideojuegos = ()=> db.collection("videojuegoss");



export const resolvers : IResolvers={

    Query: {
        getVideoGames: async()=>{
            const mi_coleccion = coleccionVideojuegos();
            return mi_coleccion.find().toArray();
        },
        getVideoGame: async(_, {_id}: {_id:string})=>{
            const db = getDB();
            return db.collection(coleccion).findOne({_id: new ObjectId(_id)});
        },
        me: async(__,_,{user}) => {
            if(!user) return null;
            return {
                id: user._id.toString(),
                email: user.email
            }
        }
    },

    Mutation:{
        addVideoGame: async(_, {name,platform,releaseYear} : {name:string, platform: string, releaseYear: number})=>{
            const db = getDB();

            const juego : VideoGame ={
                name,
                platform,
                releaseYear
            } 
           const result = await db.collection(coleccion).insertOne({juego});

            return {
                _id: result.insertedId,
                name,
                platform,
                releaseYear
            }
        },
        register: async(_, {email, password}) =>{
            const userId = await createUser(email,password);
            return await signToken(userId);
        },
        login: async(_, {email, password})=>{
            const user = await validateUser(email, password);
            if(!user) throw new Error("esos credenciales te los has inventado, makina");
            return await signToken(user._id.toString())
        }
    }
}
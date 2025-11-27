import { IResolvers } from "@graphql-tools/utils"
import { VideoGame } from "../types/VideoGame";
import { getDB } from "../db/mongo";
import { ObjectId } from "mongodb";

const coleccion = "videojuegoss"


export const resolvers : IResolvers={

    Query: {
        getVideoGames: async()=>{
            const db = getDB();
            return db.collection(coleccion).find().toArray();
        },
        getVideoGame: async(_, {_id}: {_id:string})=>{
            const db = getDB();
            return db.collection(coleccion).findOne({_id: new ObjectId(_id)});
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

           const result = await db.collection(coleccion).insertOne({
                name,
                platform,
                releaseYear
            } );

            return {
                _id: result.insertedId,
                name,
                platform,
                releaseYear
            }
        }
        
    }
}
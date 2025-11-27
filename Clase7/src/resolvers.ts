import { IResolvers } from "@graphql-tools/utils"


type Album = {
    id: string,
    title: string,
    artist: string,
    releaseDate: string,
    format?: string
}


const albumes : Album[] = [
    {
        id: '1',
        title: 'titulo1',
        artist: 'artista1',
        releaseDate: 'hoy1'
        
    },
    {
        id: '2',
        title: 'titulo2',
        artist: 'artista2',
        releaseDate: 'hoy2',
        format: 'DHP'
    }
]


export const resolvers : IResolvers={

    Query: {
        getAlbums: ()=> albumes,
        getAlbum:(_, {id}) => albumes.find( x => x.id === id)
    },

    Mutation:{
        addAlbum : (_, {title, artist, releaseDate, format}) =>{
            const miAlbum : Album = {
                id: String(albumes.length+1),
                title,
                artist,
                releaseDate,
                format
            }
            albumes.push(miAlbum);
            return miAlbum;
        }
    }
}
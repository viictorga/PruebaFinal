// npm install apollo-server graphql @graphql-tools/utils

import {gql} from "apollo-server"


export const typeDefs = gql`


    type Album {
        id: ID!,
        title: String,
        artist: String,
        releaseDate: String,
        format: String
    }
    type Query { 
        getAlbums: [Album]!,
        getAlbum(id: ID!): Album
    }
    type Mutation {
        addAlbum(title: String!, artist: String!, releaseDate: String!, format: String): Album!
    }




`;

import {gql} from "apollo-server"


export const typeDefs = gql`

    type User {
        id: ID,
        email: String!,
        password: String!
    }

    type VideoGame {
        _id: ID,
        name: String!,
        platform: String!,
        releaseYear: Int
    }
    type Query { 
        me: User
        getVideoGames: [VideoGame!]!,
        getVideoGame(_id: ID!): VideoGame
    }
    type Mutation {
        addVideoGame(name: String!, platform: String!, releaseYear: Int!): VideoGame!,
        register(email: String!, password: String!): String!
        login(email:String!, password:String!): String!
    }




`;
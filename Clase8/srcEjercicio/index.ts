import { ApolloServer } from "apollo-server";
import { connectToMongoDB } from "./db/mongo"
import { typeDefs } from "./graphql/schema";
import { resolvers } from "./graphql/resolvers";
import { getUserFromToken } from "./auth";

const start = async () =>{
    await connectToMongoDB();
    const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      const authHeader = req.headers.authorization;
      const user = authHeader ? await getUserFromToken(authHeader!) : null
      return {user};
    },
  });

  await server.listen({ port: 4000 });
  console.log("GraphQL funcionando baby, con auth");
};



start().catch(err=>console.error(err));
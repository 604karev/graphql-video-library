import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";

export interface IAuthUser {
  email: string;
  password: string;
  username: string;
}

const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
      id: { type: new GraphQLNonNull(GraphQLString) },
      username: { type: new GraphQLNonNull(GraphQLString) },
      email: { type: new GraphQLNonNull(GraphQLString) },
      token: { type: GraphQLString },
    }),
  });

  export default UserType
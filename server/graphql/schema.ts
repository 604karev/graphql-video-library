import { GraphQLObjectType, GraphQLSchema } from "graphql";
import * as userMutations from "./mutations/userMutations";
import * as directorMutations from "./mutations/directorMutations";
import * as movieMutations from "./mutations/movieMutations";
import * as userQuery from "./queries/userQueries";
import * as directorQuery from "./queries/directorQueries";
import * as moviesQuery from "./queries/movieQueries";

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    ...movieMutations,
    ...directorMutations,
    ...userMutations,
  },
});

const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    ...moviesQuery,
    ...directorQuery,
    ...userQuery,
  },
});

const schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});
export default schema;

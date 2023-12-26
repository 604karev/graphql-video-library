import {
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import MovieType from "./movieType";
import Movies from "../../models/movie";

export interface IDirector {
    id: String;
    name: String;
    age: Number;
  }
  

const DirectorType = new GraphQLObjectType({
  name: "Director",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    movies: {
      type: new GraphQLList(MovieType),
      resolve({ id }, args) {
        return Movies.find({ directorId: id });
      },
    },
  }),
});
export default DirectorType;

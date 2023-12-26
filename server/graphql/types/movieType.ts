import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import DirectorType from "./directorType";
import Directors from "../../models/director";

export interface IMovie {
  id: String;
  name: String;
  genre: String;
  directorId: String;
  rate: Number;
  watched: Boolean;
}

const MovieType: any = new GraphQLObjectType({
  name: "Movie",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    directorId: { type: GraphQLString },
    rate: { type: GraphQLInt },
    watched: { type: GraphQLBoolean },
    director: {
      type: DirectorType,
      resolve({ directorId }, args) {
        return Directors.findById(directorId);
      },
    },
  }),
});

export default MovieType;

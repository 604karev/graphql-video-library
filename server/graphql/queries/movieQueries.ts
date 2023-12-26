import { GraphQLID, GraphQLList, GraphQLString } from "graphql";
import Movies from "../../models/movie";
import MovieType from "../types/movieType";
import { IMovie } from "../types/movieType";

export const movie = {
  type: MovieType,
  args: { id: { type: GraphQLID } },
  resolve(parent: any, { id }: IMovie) {
    return Movies.findById(id);
  },
};

export const movies = {
  type: new GraphQLList(MovieType),
  args: { name: { type: GraphQLString } },
  resolve(parent: any, { name }: IMovie) {
    return Movies.find({ name: { $regex: name, $options: "i" } });
  },
};

import { GraphQLID, GraphQLList, GraphQLString } from "graphql";
import Movies from "../../models/movie";
import MovieType from "../types/movieType";
import { IMovie } from "../types/movieType";

export const movie = {
  type: MovieType,
  args: { id: { type: GraphQLID } },
  resolve(parent: any, { id }: IMovie, context: any) {
    if (!context.userId) {
      throw new Error("Not authenticated");
    }
    return Movies.findOne({ _id: id, userId: context.userId });
  },
};

export const movies = {
  type: new GraphQLList(MovieType),
  args: { name: { type: GraphQLString } },
  resolve(parent: any, { name }: IMovie, context: any) {
    if (!context.userId) {
      throw new Error("Not authenticated");
    }
    const query = name
      ? { name: { $regex: name, $options: "i" }, userId: context.userId }
      : { userId: context.userId };
    return Movies.find(query);
  },
};

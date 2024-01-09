import { GraphQLBoolean, GraphQLID, GraphQLInt, GraphQLString } from "graphql";
import MovieType from "../types/movieType";
import Movies from "../../models/movie";
import { IMovie } from "../types/movieType";

export const addMovie = {
  type: MovieType,
  args: {
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    directorId: { type: GraphQLID },
    rate: { type: GraphQLInt },
    watched: { type: GraphQLBoolean },
  },
  resolve(parent: any, args: IMovie, context: any) {
    if (!context.userId) {
      throw new Error("Authentication required");
    }
    const movie = new Movies({
      ...args,
      userId: context.userId,
    });
    return movie.save();
  },
};

export const deleteMovie = {
  type: MovieType,
  args: { id: { type: GraphQLID } },
  resolve(parent: any, { id }: IMovie, context: any) {
    if (!context.userId) {
      throw new Error("Authentication required");
    }
    return Movies.findOneAndDelete({ _id: id, userId: context.userId });
  },
};

export const updateMovie = {
  type: MovieType,
  args: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    directorId: { type: GraphQLID },
    rate: { type: GraphQLInt },
    watched: { type: GraphQLBoolean },
  },
  resolve(parent: any, { id, ...movieProps }: IMovie, context: any) {
    if (!context.userId) {
      throw new Error("Authentication required");
    }
    return Movies.findOneAndUpdate(
      { _id: id, userId: context.userId },
      { $set: { ...movieProps } },
      { new: true }
    );
  },
};

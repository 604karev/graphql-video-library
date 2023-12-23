import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLBoolean,
  GraphQLNonNull,
} from "graphql";

import Movies from "../models/movie";
import Directors from "../models/director";
import User from "../models/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { ApolloError } from "apollo-server-express";

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    username: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    token: { type: GraphQLString },
  }),
});

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
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addDirector: {
      type: DirectorType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
      },
      resolve(parent, { name, age }) {
        const director = new Directors({ name, age });
        return director.save();
      },
    },
    addMovie: {
      type: MovieType,
      args: {
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        directorId: { type: GraphQLID },
        rate: { type: GraphQLInt },
        watched: { type: GraphQLBoolean },
      },
      resolve(parent, { ...args }) {
        const movie = new Movies({
          ...args,
        });
        return movie.save();
      },
    },
    deleteDirector: {
      type: DirectorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, { id }) {
        return Directors.findOneAndDelete({ _id: id });
      },
    },
    deleteMovie: {
      type: MovieType,
      args: { id: { type: GraphQLID } },
      resolve(parent, { id }) {
        return Movies.findOneAndDelete({ _id: id });
      },
    },
    updateDirector: {
      type: DirectorType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
      },
      resolve(parent, { id, name, age }) {
        return Directors.findOneAndUpdate(
          { _id: id },
          { $set: { name, age } },
          { new: true, useFindAndModify: false }
        );
      },
    },
    updateMovie: {
      type: MovieType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        directorId: { type: GraphQLID },
        rate: { type: GraphQLInt },
        watched: { type: GraphQLBoolean },
      },
      resolve(parent, { id, ...movieProps }) {
        return Movies.findOneAndUpdate(
          { _id: id },
          { $set: { ...movieProps } },
          { new: true, useFindAndModify: false }
        );
      },
    },
    register: {
      type: UserType,
      args: {
        username: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(_, { username, email, password }) {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          throw new ApolloError("User already exists");
        }

        // Hash password and create user
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();

        // Generate JWT token
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
          expiresIn: "1h",
        });

        return { ...user.toObject(), id: user._id, token };
      },
    },
    login: {
      type: UserType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(_, { email, password }) {
        const user = await User.findOne({ email });
        if (!user) {
          throw new ApolloError("User does not exist");
        }

        const isValid = await bcrypt.compare(password, user.password!);
        if (!isValid) {
          throw new ApolloError("Invalid password");
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
          expiresIn: "1h",
        });

        return { ...user.toObject(), id: user._id, token };
      },
    },
  },
});

const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    movie: {
      type: MovieType,
      args: { id: { type: GraphQLID } },
      resolve(parent, { id }) {
        return Movies.findById(id);
      },
    },
    director: {
      type: DirectorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, { id }) {
        return Directors.findById(id);
      },
    },
    movies: {
      type: new GraphQLList(MovieType),
      args: { name: { type: GraphQLString } },
      resolve(parent, { name }) {
        return Movies.find({ name: { $regex: name, $options: "i" } });
      },
    },
    directors: {
      type: new GraphQLList(DirectorType),
      args: { name: { type: GraphQLString } },
      resolve(parent, { name }) {
        return Directors.find({ name: { $regex: name, $options: "i" } });
      },
    },
    me: {
      type: UserType,
      resolve(parent, args, context) {
        // Assuming the context will have the user information if authenticated
        if (!context.user) {
          throw new ApolloError('Not Authenticated');
        }
        return context.user;
      }
    },
  },
});
const schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});
export default schema;

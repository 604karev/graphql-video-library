import { GraphQLNonNull, GraphQLString } from "graphql";
import UserType from "../types/userType";
import User from "../../models/user";
import { ApolloError } from "apollo-server-express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { IAuthUser } from "../types/userType";



export const register = {
  type: UserType,
  args: {
    username: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(parent: any, { username, email, password }: IAuthUser) {
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
};

export const login = {
  type: UserType,
  args: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(parent: any, { email, password }: IAuthUser) {
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
};

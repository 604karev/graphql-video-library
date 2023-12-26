import { ApolloError } from "apollo-server-express";
import UserType from "../types/userType";
import { IAuthUser } from "../types/userType";

export const me = {
  type: UserType,
  resolve(parent: any, args: IAuthUser, context: { user: IAuthUser }) {
    // Assuming the context will have the user information if authenticated
    if (!context.user) {
      throw new ApolloError("Not Authenticated");
    }
    return context.user;
  },
};

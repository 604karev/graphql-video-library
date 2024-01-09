import { GraphQLID, GraphQLInt, GraphQLString } from "graphql";
import DirectorType from "../types/directorType";
import Directors from "../../models/director";
import { IDirector } from "../types/directorType";

export const addDirector = {
  type: DirectorType,
  args: {
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
  },
  resolve(parent: any, args: IDirector, context: any) {
    if (!context.userId) {
      throw new Error("Authentication required");
    }
    const director = new Directors({
      ...args,
      userId: context.userId,
    });
    return director.save();
  },
};
export const deleteDirector = {
  type: DirectorType,
  args: { id: { type: GraphQLID } },
  resolve(parent: any, { id }: IDirector, context: any) {
    if (!context.userId) {
      throw new Error("Authentication required");
    }
    return Directors.findOneAndDelete({ _id: id, userId: context.userId });
  },
};
export const updateDirector = {
  type: DirectorType,
  args: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
  },
  resolve(parent: any, { id, name, age }: IDirector, context: any) {
    if (!context.userId) {
      throw new Error("Authentication required");
    }
    return Directors.findOneAndUpdate(
      { _id: id, userId: context.userId },
      { $set: { name, age } },
      { new: true, useFindAndModify: false }
    );
  },
};

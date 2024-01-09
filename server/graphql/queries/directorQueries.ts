import DirectorType from "../types/directorType";
import Directors from "../../models/director";
import { GraphQLID, GraphQLList, GraphQLString } from "graphql";
import { IDirector } from "../types/directorType";

export const director = {
  type: DirectorType,
  args: { id: { type: GraphQLID } },
  resolve(parent: any, { id }: IDirector, context: any) {
    if (!context.userId) {
      throw new Error("Not authenticated");
    }
    return Directors.findOne({ _id: id, userId: context.userId });
  },
};

export const directors = {
  type: new GraphQLList(DirectorType),
  args: { name: { type: GraphQLString } },
  resolve(parent: any, { name }: IDirector, context: any) {
    const query = name
      ? { name: { $regex: name, $options: "i" }, userId: context.userId }
      : { userId: context.userId };
    return Directors.find(query);
  },
};

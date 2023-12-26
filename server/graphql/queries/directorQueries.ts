import DirectorType from "../types/directorType";
import Directors from "../../models/director";
import { GraphQLID, GraphQLList, GraphQLString } from "graphql";
import { IDirector } from "../types/directorType";

export const director = {
  type: DirectorType,
  args: { id: { type: GraphQLID } },
  resolve(parent: any, { id }: IDirector) {
    return Directors.findById(id);
  },
};
export const directors = {
  type: new GraphQLList(DirectorType),
  args: { name: { type: GraphQLString } },
  resolve(parent: any, { name }: IDirector) {
    return Directors.find({ name: { $regex: name, $options: "i" } });
  },
};

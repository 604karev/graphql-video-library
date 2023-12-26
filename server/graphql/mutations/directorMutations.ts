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
  resolve(parent: any, { name, age }: IDirector) {
    const director = new Directors({ name, age });
    return director.save();
  },
};
export const deleteDirector = {
  type: DirectorType,
  args: { id: { type: GraphQLID } },
  resolve(parent: any, { id }: IDirector) {
    return Directors.findOneAndDelete({ _id: id });
  },
};
export const updateDirector = {
  type: DirectorType,
  args: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
  },
  resolve(parent: any, { id, name, age }: IDirector) {
    return Directors.findOneAndUpdate(
      { _id: id },
      { $set: { name, age } },
      { new: true, useFindAndModify: false }
    );
  },
};
